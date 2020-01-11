import { Injectable } from '@nestjs/common';
import { DatabaseProvider, Menu } from 'sigasac-db';
import { MenuDto } from './dto';

@Injectable()
export class MenusService {
    async create(menuDto: MenuDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Menu).save(menuDto);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(Menu)
                .createQueryBuilder('m')
                .leftJoinAndSelect('m.submenus', 'sm')
                .where('m.father IS NULL')
                .orderBy('m.id', 'ASC')

                .getMany();
        } catch (error) {
            throw error;
        }
    }

    async getSubmenusByFather(father: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(Menu)
                .createQueryBuilder('m')
                .where('m.father = :father', { father })
                .getMany();
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, menuDto: MenuDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Menu)
                .set(menuDto)
                .where('id = :id', { id })
                .execute();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Menu)
                .set({ state })
                .where('id = :id', { id })
                .execute();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
