import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

/**
 * 커스텀 파이프 (상태 유효성 검증)
 */
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus?.PRIVATE, BoardStatus?.PUBLIC];
  transform(value: string) {
    value = value.toUpperCase();
    /**
     * isStatusValid 검증 함수
     * 없으면 400 반환
     */
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  /**
   *
   * @param status 상태 값
   * @param StatusOptions 배열안에 요청들어온 status 값이 존재하는지, 않는지 판단 후 데이터 처리
   * @returns
   */
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
