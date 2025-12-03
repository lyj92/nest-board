import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create.board.dto";
import { BoardStatus } from "./board-status-enum";

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  /**
   * 게시판 생성
   * Repository 단에서 데이터베이스 로직 처리
   */
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
