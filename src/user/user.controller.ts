import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// UseInterceptors -> nestjs common
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  //   @Get('/colors/:color')
  //   setColor(@Param('color') color: string, @Session() session: any) {
  //     session.color = color;
  //   }

  //   @Get('/colors')
  //   getColor(@Session() session: any) {
  //     return session.color;
  //   }

  //   @Get('/whoami')
  //   whoAmI(@Session() session: any) {
  //     return this.userService.findOne(session.userId);
  //   }

  // make custom decorator. this custom decorator take 2 args
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // 1. create DTO to validate Body. pass arg -> validate request
    // 2. import service
    // this.userService.create(body.email, body.password);
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    // if there're no any change -> session wont generate
    return user;
  }

  // hide password
  // default interceptor: ClassSerializerInterceptor -> use library
  // custom interceptor: SerializeInterceptor
  // @UseInterceptors(SerializeInterceptor) -> default
  // @UseInterceptors(new SerializeInterceptor(UserDto)) -> dynamic
  // if you want to use to global controller call @Serialize below @Controller
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
