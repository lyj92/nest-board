import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

/**
 * TypeORM 0.3.x 버전부터 @EntityRepository() 데코레이터가 deprecated 되면서:
 * 구 방식: Repository에 @EntityRepository() 데코레이터를 붙이고 forFeature에 바로 넣음
 * 신 방식: Entity를 forFeature에 넣고, Custom Repository는 providers에 추가
 */

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
