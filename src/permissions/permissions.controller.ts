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
    UseGuards
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import {
    AuthGuard,
    CONFIGURATION,
    ROLES,
    Roles,
    RolesGuard
} from 'sigasac-utils';
import { PermissionsService } from './permissions.service';

const { SUPER_ADMIN } = ROLES;

@Controller(`${CONFIGURATION.apiBasePath}/${CONFIGURATION.subRoutes.permissions}`)
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
    async getMenusAndPermissionByProfile(@Res() res: Response, @Param('profileId')profileId: number ) {
        try {
            const data = await this.permissionsService.getMenusAndPermissionByProfile(profileId);

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
}
