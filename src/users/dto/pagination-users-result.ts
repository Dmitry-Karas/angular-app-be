import { User } from '../entities/user.entity';

export class PaginatedProductsResultDto {
  data: User[];
  page: number;
  limit: number;
  totalCount: number;
}
