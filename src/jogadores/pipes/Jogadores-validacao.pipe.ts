import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoPipes implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `O valor do parametro ${metadata.data} deve ser informado`,
      );
    }
    return value;
  }
}
