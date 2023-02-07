import { Module } from '@nestjs/common';
import { OccupiedRoomService } from './occupied-room.service';
import { OccupiedRoomResolver } from './occupied-room.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupiedRoom } from './entities/occupied-room.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [TypeOrmModule.forFeature([OccupiedRoom, Room]), BookingsModule],
  providers: [OccupiedRoomResolver, OccupiedRoomService],
  exports: [OccupiedRoomService],
})
export class OccupiedRoomModule {}
