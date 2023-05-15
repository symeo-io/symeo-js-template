import { SymeoExceptionCode } from 'src/domain/exception/symeo.exception.code.enum';

export class SymeoException {
  errorMessage: string;
  symeoExceptionCode: SymeoExceptionCode;

  constructor(
    errorMessage: string | Record<string, any>,
    symeoExceptionCode: SymeoExceptionCode,
  ) {
    this.symeoExceptionCode = symeoExceptionCode;
    this.errorMessage = errorMessage as string;
  }
}
