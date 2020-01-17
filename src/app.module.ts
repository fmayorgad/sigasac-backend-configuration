import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { MenusModule } from "./menus/menus.module";

@Module({
    imports: [AuthModule, MenusModule],
    controllers: [],
    providers: []
})
export class AppModule {}
