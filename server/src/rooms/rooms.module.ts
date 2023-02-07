import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Property } from 'src/properties/property.entity';
import { AbilityModule } from 'src/ability/ability.module';
import { UserModule } from 'src/user/user.module';
import { OccupiedRoomModule } from 'src/occupied-room/occupied-room.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Property]),
    UserModule,
    AbilityModule,
    OccupiedRoomModule,
    ImageModule,
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
