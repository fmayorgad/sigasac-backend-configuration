import { Injectable } from '@nestjs/common';
import {
    DatabaseProvider,
    Permission,
    MenuPermissionProfile
} from 'sigasac-db';

@Injectable()
export class PermissionsService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Permission).find({
                order: {
                    id: 'ASC'
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getMenusAndPermissionByProfile(profileId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(MenuPermissionProfile)
                .createQueryBuilder('mpp')
                .leftJoinAndSelect('mpp.menu', 'menu')
                .leftJoinAndSelect('mpp.permission', 'permission')
                .where('mpp.profileId = :profileId', { profileId })
                .getMany();
        } catch (error) {
            throw error;
        }
    }
}
