import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

// connect entity
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // connect entity to App Module entities: [Entity]
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
