import { Injectable } from '@nestjs/common';
import { DatabaseProvider, DBEntity } from 'sigasac-db';

@Injectable()
export class AuditService {
    async getEntities() {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(DBEntity).find({
                order: { id: 'ASC' }
            });
        } catch (error) {
            throw error;
        }
    }

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(DBEntity)
                .set({ state })
                .where('id = :id', { id })
                .execute();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
