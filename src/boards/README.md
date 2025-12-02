# Boards Module

## 개요
게시판(Board) 기능을 담당하는 모듈입니다.

## 파일 구조
- `boards.module.ts` - Board 모듈 정의
- `boards.controller.ts` - Board API 엔드포인트
- `boards.service.ts` - Board 비즈니스 로직
- `board.entity.ts` - Board 엔티티 정의
- `board.repository.ts` - Board 데이터베이스 Repository

## TypeORM 버전 관련 변경사항

### 문제
기존 강의에서 사용한 `@EntityRepository` 데코레이터는 TypeORM 0.3 버전부터 제거되었습니다.

### 해결 방법

**이전 방식 (TypeORM 0.2.x)**
```typescript
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
```

**현재 방식 (TypeORM 0.3.x+)**
```typescript
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}
```

### 주요 변경점
1. `@EntityRepository` → `@Injectable()` 데코레이터로 변경
2. `DataSource`를 constructor로 주입받아 사용
3. `super()`를 통해 Entity와 EntityManager를 전달
4. `boards.module.ts`에서 `TypeOrmModule.forFeature([Board])` import 필요
5. Repository를 providers 배열에 명시적으로 추가

## 모듈 설정

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
```

## 참고사항
- TypeORM 0.3 이상 버전 사용 시 위 방식을 따라야 합니다
- 구버전 강의 자료와 다를 수 있으니 주의하세요
