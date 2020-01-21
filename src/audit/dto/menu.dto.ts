import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    father?: number;
}
