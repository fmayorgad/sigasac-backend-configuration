import { Injectable } from '@nestjs/common';

import { DatabaseProvider, Profile } from 'sigasac-db';
import { ProfileDto } from './dto';

@Injectable()
export class ProfilesService {
    async create(profileDto: ProfileDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Profile).save(profileDto);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Profile).find({
                order: {
                    id: 'ASC'
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, profileDto: ProfileDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Profile)
                .set(profileDto)
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
                .update(Profile)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
