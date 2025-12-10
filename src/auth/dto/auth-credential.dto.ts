import { IsString, Matches, MaxLength, MinLength } from "class-validator";

/**
 * 회원가입 요청 데이터 DTO
 */
export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  /**
   * 숫자나 영문만 가능한 정규식
   */
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: "password only accept english and number",
  })
  password: string;
}
