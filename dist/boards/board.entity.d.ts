import { BaseEntity } from 'typeorm';
import { BoardStatus } from './board.model';
export declare class Board extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
}
