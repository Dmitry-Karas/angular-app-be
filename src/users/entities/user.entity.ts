import {
  IsDefined,
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
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  constructor(payload: Partial<User>) {
    super();
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // @MinLength(4)
  // @MaxLength(100)
  // @IsOptional()
  // name: string;

  // @Column()
  // @IsDefined()
  // @MinLength(4)
  // @MaxLength(100)
  // @IsOptional()
  // lastname: string;

  @Column()
  @IsDefined()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/[^A-Za-z0-9]*/)
  login: string;

  @Column()
  password: string;

  // @Column()
  // @IsDefined()
  // @IsOptional()
  // email: string;

  // @Column()
  // @IsOptional()
  // gender: string;

  // @Column()
  // @IsOptional()
  // birthday: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
