import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { MenusModule } from './menus/menus.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
    imports: [AuthModule, MenusModule, ProfilesModule, PermissionsModule],
    controllers: [],
    providers: []
})
export class AppModule {}
