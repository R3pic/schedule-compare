export class InvalidPngFileException extends Error {
  static readonly message = '해석할 수 없는 PNG 파일입니다. 스케줄 정보가 존재하지 않습니다.';

  constructor() {
    super(InvalidPngFileException.message);
  }
}