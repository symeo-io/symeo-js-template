import { SymeoExceptionCode } from 'src/domain/exception/symeo.exception.code.enum';

export const SymeoExceptionCodeToHttpStatusMap = {
  [SymeoExceptionCode.USER_NOT_FOUND]: 404,
};
