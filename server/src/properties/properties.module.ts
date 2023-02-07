import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesResolver } from './properties.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { AbilityModule } from 'src/ability/ability.module';
import { UserModule } from 'src/user/user.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  // to inject repository in the service
  imports: [
    TypeOrmModule.forFeature([Property]),
    RoomsModule,
    AbilityModule,
    UserModule,
    ImageModule,
  ],
  providers: [PropertiesService, PropertiesResolver],
  exports: [PropertiesService],
})
export class PropertiesModule {}
