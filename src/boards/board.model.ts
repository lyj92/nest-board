/**
 * interface 변수의 타입만을 체크
 *
 * classes 변수의 타입도 체크하고 인스턴스 또한 생성할 수 가 있습니다.
 */

/**
 * 게시판 상태
 */

/**
 * 타입을 정의해주면 좋은이유?
 * 타입을 정의해주는 것은 선택사항입니다.
 *
 * 하지만 이렇게 타입을 정의하면 원하는 타입과 다른코드를 사용 할 시 에러가 발생합니다.
 
 * 그리고 코드를 읽는 입장에서 더 코드를 쉽게 이해하며 읽을 수 있습니다.
 *
 */

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
