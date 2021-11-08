import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
// import { UserDto } from 'src/user/dtos/user.dto';

interface ClassConstructor {
    new (...args: any []): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
// wrap interceptor
// type safety!!! -> pass a Class.


export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  // implement: khi tạo serialize tất cả các props phải giống với NestInterceptor
  // intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // return plainToClass(UserDto, data) -> use only user dto
        // plainToClass: turn raw data into User DTO Instance
        // how to dynamic:
        return plainToClass(this.dto, data, {
          // this is optional object
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
