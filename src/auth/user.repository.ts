import { DataSource, Repository } from "typeorm";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

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

    const user = this.create({
      username,
      password,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("이미 존재하는 아이디 입니다.");
      } else {
        throw new InternalServerErrorException();
      }

      console.log(error, "error");
    }
  }
}
