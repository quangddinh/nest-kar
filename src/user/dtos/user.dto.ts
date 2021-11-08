import { Expose } from 'class-transformer';
// exclude: do not share properties vs expose: do share

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
  // manual test -> comment
}
