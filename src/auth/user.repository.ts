import { DataSource, Repository } from "typeorm";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from "node_modules/bcryptjs";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * 회원생성
   * @param authCredentialDto
   */
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error as { code: string }).code === "23505"
      ) {
        throw new ConflictException("이미 존재하는 아이디 입니다.");
      }
      throw new InternalServerErrorException();
    }
  }
}
