import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from "node_modules/bcryptjs";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * 회원가입
   * @param authCredentialDto
   * @returns
   */
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  /**
   * 로그인
   * @param authCredentialDto
   * @returns
   */
  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ acessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { username };
      const acessToken = this.jwtService.sign(payload);
      return { acessToken };
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }
}
