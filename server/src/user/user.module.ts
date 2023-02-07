import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from 'src/ability/ability.module';
import { Tenant } from '../tenant/entities/tenant.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tenant]),
    AbilityModule,
    JwtModule.register({
      // signOptions: { expiresIn: '5m' },
      secret: 'secretKey',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserResolver, UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
