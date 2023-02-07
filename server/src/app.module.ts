import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './properties/properties.module';
import { typeOrmConfig } from './config/typeorm.config';
import { join } from 'path';
import { RoomsModule } from './rooms/rooms.module';
import { TenantModule } from './tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';
import { AbilityModule } from './ability/ability.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { BookingsModule } from './bookings/bookings.module';
import { OccupiedRoomModule } from './occupied-room/occupied-room.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    JwtModule.register({
      // signOptions: { expiresIn: '7d' },
      secret: 'secretKey',
    }),
    PropertiesModule,
    UserModule,
    RoomsModule,
    BookingsModule,
    TenantModule,
    AbilityModule,
    AmenitiesModule,
    OccupiedRoomModule,
    ImageModule,
  ],
})
export class AppModule {}
