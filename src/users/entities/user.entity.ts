import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  constructor(payload: Partial<User>) {
    super();
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  lastname: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/[^A-Za-z0-9]*/)
  login: string;

  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @Contains('male' || 'female')
  gender: string;

  @Column({ nullable: true })
  @IsOptional()
  birthday: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
