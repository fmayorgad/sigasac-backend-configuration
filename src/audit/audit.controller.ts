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
import { AuditService } from './audit.service';
import { ChangeStateDto } from './dto';

const { SUPER_ADMIN } = ROLES;

@Controller(`${CONFIGURATION.apiBasePath}/${CONFIGURATION.subRoutes.audit}`)
@ApiTags(`${CONFIGURATION.subRoutes.audit}`)
@ApiBearerAuth()
export class AuditController {
    constructor(private readonly auditService: AuditService) {}

    @Get('entities')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async getAll(@Res() res: Response) {
        try {
            const entities = await this.auditService.getEntities();

            res.status(HttpStatus.OK).send({
                entities
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

    @Patch('entities/:entityId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async changeState(
        @Res() res: Response,
        @Param('entityId') entityId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.auditService.changeState(entityId, changeStateDto.state);

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Cambio de estado exitoso!'
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
