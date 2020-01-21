import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { MenusModule } from './menus/menus.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuditModule } from './audit/audit.module';

@Module({
    imports: [
        AuthModule,
        MenusModule,
        ProfilesModule,
        PermissionsModule,
        AuditModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
