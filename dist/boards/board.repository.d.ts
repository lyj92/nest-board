import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
}
