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

import { AuthGuard, MAIN, ROLES, Roles, RolesGuard } from 'sigasac-utils';
const { SUPER_ADMIN } = ROLES;

import { MenusService } from './menus.service';
import { MenuDto, ChangeStateDto } from './dto';

@Controller('menus')
@Controller(`${MAIN.apiBasePath}/${'menus'}`)
@ApiTags(`${'menus'}`)
@ApiBearerAuth()
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async create(@Res() res: Response, @Body() menuDto: MenuDto) {
        try {
            const menu = await this.menusService.create(menuDto);

            res.status(HttpStatus.CREATED).send({
                menu
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
            const menus = await this.menusService.getAll();

            res.status(HttpStatus.OK).send({
                menus
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

    @Get(':father/submenus')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async getSubmenus(@Res() res: Response, @Param('father') father: number) {
        try {
            const submenus = await this.menusService.getSubmenusByFather(
                father
            );

            res.status(HttpStatus.OK).send({
                submenus
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

    @Put(':menuId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async update(
        @Res() res: Response,
        @Param('menuId') menuId: number,
        @Body() menuDto: MenuDto
    ) {
        try {
            await this.menusService.update(menuId, menuDto);

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

    @Patch(':menuId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(SUPER_ADMIN)
    async changeState(
        @Res() res: Response,
        @Param('menuId') menuId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.menusService.changeState(menuId, changeStateDto.state);

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
