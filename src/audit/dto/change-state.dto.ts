import { ApiProperty } from '@nestjs/swagger';

export class ChangeStateDto {
    @ApiProperty()
    state: number;
}
