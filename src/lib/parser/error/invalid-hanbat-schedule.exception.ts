export class InvalidHanbatScheduleException extends Error {
  static readonly message = '해석할 수 없는 형식의 XLS파일입니다. 올바른 구조를 가지고 있나요?';

  constructor() {
    super(InvalidHanbatScheduleException.message);
  }
}