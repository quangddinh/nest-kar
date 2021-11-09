import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// connect entity
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // connect entity to App Module entities: [Entity]
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    {
        // global interceptor
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UserModule {}
