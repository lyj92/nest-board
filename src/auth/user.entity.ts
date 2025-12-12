import { Board } from "src/boards/board.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  /**
   * 일대다
   * eager란? user정보를 가져올때 board 정보도 같이 가져온다는 설정 값
   */
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
