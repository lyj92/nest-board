import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    getBoardById(id: number): Promise<Board>;
}
