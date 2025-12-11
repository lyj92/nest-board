import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원 생성 경로
   * @param authCredentialDto
   * @param ValidationPipe Dto에 설정된 유효성 검증 동작
   * @returns
   */
  @Post("/signup")
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  /**
   * 회원 로그인
   * @param authCredentialDto
   * @returns
   */
  @Post("/signin")
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ acessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  /**
   * UseGuards안에
   * @nestjs/passport에서 가져온 AuthGuard()를 이용하여 요청안에 유저 정보를 넣어줌
   * @param req
   */

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user, "user");
  }
}
