export class InvalidScheduleArrayException extends Error {
  static readonly message = '잘못된 스케줄 배열입니다. 총 91개의 요소가 존재해야합니다.';

  constructor() {
    super(InvalidScheduleArrayException.message);
  }
}