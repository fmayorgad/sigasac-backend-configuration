import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MenuPermissionProfileDto {
    @ApiProperty({ required: true })
    proflileId: number;

    @ApiProperty({ required: true })
    menuId: number;

    @ApiProperty({ required: true })
    permissionId: number;

    @ApiProperty({ required: true })
    state: number;
}

export class MenusPermissionsProfileDto {
    @ApiProperty({
        required: true,
        type: MenuPermissionProfileDto,
        isArray: true,
        example: [
            {
                profileId: 1,
                menuId: 1,
                permissionId: 1
            },
            {
                profileId: 1,
                menuId: 1,
                permissionId: 2
            }
        ]
    })
    @Type(() => MenuPermissionProfileDto)
    data: MenuPermissionProfileDto[];
}
