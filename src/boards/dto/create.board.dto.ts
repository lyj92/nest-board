import { IsNotEmpty } from "class-validator";

/**
 * 생성 Dto
 */

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
