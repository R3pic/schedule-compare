export class InvalidFileExtensionException extends Error {
  static readonly message = '올바르지 않은 확장자 입니다.';

  constructor() {
    super(InvalidFileExtensionException.message)
  }
}