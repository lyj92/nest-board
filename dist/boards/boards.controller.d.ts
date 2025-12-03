import { BoardsService } from "./boards.service";
import { Board } from "./board.entity";
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getBoardById(id: number): Promise<Board>;
}
