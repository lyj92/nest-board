import { Injectable, NotFoundException } from "@nestjs/common";
// import { type BoardStatus } from "./board-status-enum";
import { BoardRepository } from "./board.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create.board.dto";
import { BoardStatus } from "./board-status-enum";

/**
 *  injectable 데코레이터
 *  NestJSㅇ는 이것을 이용해서 다른 컴포ㅠ넌트에서 이 서비스를 사용할(injectable) 수 있게 만들어 줍니다.
 * */

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  // private boards: Board[] = [];
  // /**
  //  * 게시판 목록 조회
  //  * @returns
  //  */
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // /**
  //  * 게시판 등록
  //  * @param title 제목
  //  * @param description 내용
  //  */
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   /**
  //    * private boards: Board[] = []; 배열에 생성한 게시판을 추가
  //    */
  //   this.boards.push(board);
  //   /**
  //    * 게시판 배열 반환
  //    */
  //   return board;
  // }
  // /**
  //  * 게시판 특정 상세 조회
  //  * @param id 게시판 아이디
  //  * @returns
  //  */

  /**
   * 게시판 생성
   * @param createBoardDto
   */

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    // constructor에서 주입받은 boardRepository를 사용해서 데이터베이스에서 데이터를 조회합니다.
    // findOne 메서드는 데이터베이스에서 데이터를 조회합니다.
    // where: { id } 조건에 맞는 데이터를 조회합니다.
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board?.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  // /**
  //  * 게시판 삭제
  //  * @param id 게시판 아이디
  //  */
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // /**
  //  * 게시판 상태 수정
  //  * @param id 게시판 아이디
  //  * @param status 변경할 게시판의 상태 값
  //  * @returns
  //  */
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   // 특정 아이디 정보 조회 후 상태값만 변경
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
