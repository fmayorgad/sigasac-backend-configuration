import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { MenusModule } from './menus/menus.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
    imports: [AuthModule, MenusModule, ProfilesModule],
    controllers: [],
    providers: []
})
export class AppModule {}
