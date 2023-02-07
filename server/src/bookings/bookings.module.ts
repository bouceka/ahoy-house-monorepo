import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { OccupiedRoomModule } from 'src/occupied-room/occupied-room.module';
import { OccupiedRoom } from 'src/occupied-room/entities/occupied-room.entity';
import { AbilityModule } from 'src/ability/ability.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, OccupiedRoom]),
    forwardRef(() => OccupiedRoomModule),
    AbilityModule,
    UserModule,
  ],
  providers: [BookingsResolver, BookingsService, RolesGuard],
  exports: [BookingsService],
})
export class BookingsModule {}
