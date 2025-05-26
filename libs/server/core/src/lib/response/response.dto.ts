import { BaseResponseDto } from './base.response.dto';
import { IBaseResponseDto } from '@octo-crm/core';

export class ResponseDto<T> extends BaseResponseDto<T> implements IBaseResponseDto<T> {
}
