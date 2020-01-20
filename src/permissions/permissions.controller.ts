import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards,
    Logger
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import {
    AuthGuard,
    CONFIGURATION,
    ROLES,
    Roles,
    RolesGuard
} from 'sigasac-utils';
import { PermissionsService } from './permissions.service';
import { MenuPermissionProfileDto, MenusPermissionsProfileDto } from './dto';

const { SUPER_ADMIN } = ROLES;

@Controller(
    `${CONFIGURATION.apiBasePath}/${CONFIGURATION.subRoutes.permissions}`
)
@ApiTags(`${CONFIGURATION.subRoutes.permissions}`)
@ApiBearerAuth()
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async getAll(@Res() res: Response) {
        try {
            const permissions = await this.permissionsService.getAll();

            res.status(HttpStatus.OK).send({
                permissions
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Get(':profileId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async getMenusAndPermissionByProfile(
        @Res() res: Response,
        @Param('profileId') profileId: number
    ) {
        try {
            const data = await this.permissionsService.getMenusAndPermissionByProfile(
                profileId
            );

            res.status(HttpStatus.OK).send({
                data
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Post(':profileId')
    @ApiOperation({})
    @ApiConsumes('application/json')
    @ApiBody({ type: MenusPermissionsProfileDto })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async deleteAndSave(
        @Res() res: Response,
        @Param('profileId') profileId: number,
        @Body() menusPermissionsProfile: MenusPermissionsProfileDto
    ) {
        try {
            const data = await this.permissionsService.deleteAndSave(
                profileId,
                menusPermissionsProfile.data
            );

            res.status(HttpStatus.CREATED).send({
                data
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
