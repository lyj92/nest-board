import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

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
}
