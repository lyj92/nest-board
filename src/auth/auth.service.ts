import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from "node_modules/bcryptjs";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
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
  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return "로그인 성공";
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }
}
