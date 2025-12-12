import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import type { BoardStatus } from "./board-status-enum";
import { CreateBoardDto } from "./dto/create.board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

/**
 * private 같은 접근 제한자를 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 프로퍼티로 선언됩니다.
 * @UseGuards(AuthGuard()) 토큰 유효 검증으로 접근 권한 체크
 */

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  // /**
  //  * 게시판 전체조회
  //  * @returns
  //  */
  // @Get("/")
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  /**
   * 사전 목록 전체 조회
   * @returns
   */
  @Get()
  GetAllTask(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number): Promise<Board> {
    return this.boardsService.getBoardById(Number(id));
  }

  /**
   * 게시판 생성
   * @param createBoardDto
   * @returns
   */
  @Post("")
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // /**
  //  * NestJS에서는 @Body body를 이용해서 가져옵니다.
  //  * 이렇게 하면 모든 request에서 보내온 값을 가져올 수 있으며, 하나식 가져오려면
  //  * @body('title') title 혹은  @body('description') description 이런식으로 가져오시면 됩니다.
  //  * @param body
  //  * @param UsePipes 핸들러 레벨에서 파이프 설정
  //  */

  // @Post("")
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // /**
  //  * 특정 게시판 데이터 조회
  //  * @param id 게시판 아이디
  //  * @returns
  //  */
  // @Get("/:id")
  // getBoardById(@Param("id") id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  /**
   *
   * @param id
   * @param ParseIntPipe 숫자형인지 유효성검증
   */
  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  /**
   * 게시판 상태 업데이트
   * @param id 게시판 아이디
   * @param status 게시판 상태
   * @returns
   */

  @Patch("/:id/status")
  updateBoardStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // /**
  //  * 게시판 삭제
  //  * @param id 게시판 아이디
  //  */
  // @Delete("/:id")
  // deleteBoard(@Param("id") id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // /**
  //  * 게시판 상태 수정
  //  * @param id 게시판 아이디
  //  * @param status 변경할 게시판의 상태 값
  //  * @returns
  //  */
  // @Patch("/:id/status")
  // updateBoardStatus(
  //   @Param("id") id: string,
  //   @Body("status", BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
