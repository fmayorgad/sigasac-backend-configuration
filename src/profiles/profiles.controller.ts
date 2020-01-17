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
import { ProfilesService } from './profiles.service';
import { ProfileDto, ChangeStateDto } from './dto';
const { SUPER_ADMIN } = ROLES;

@Controller(`${CONFIGURATION.apiBasePath}/${CONFIGURATION.subRoutes.profiles}`)
@ApiTags(`${CONFIGURATION.subRoutes.profiles}`)
@ApiBearerAuth()
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async create(@Res() res: Response, @Body() profileDto: ProfileDto) {
        try {
            const profile = await this.profilesService.create(profileDto);

            res.status(HttpStatus.CREATED).send({
                profile
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

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async getAll(@Res() res: Response) {
        try {
            const profiles = await this.profilesService.getAll();

            res.status(HttpStatus.OK).send({
                profiles
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

    @Put(':profileId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async update(
        @Res() res: Response,
        @Param('profileId') profileId: number,
        @Body() profileDto: ProfileDto
    ) {
        try {
            await this.profilesService.update(profileId, profileDto);

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Actualización exitosa!'
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

    @Patch(':profileId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async changeState(
        @Res() res: Response,
        @Param('profileId') profileId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.profilesService.changeState(
                profileId,
                changeStateDto.state
            );

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
