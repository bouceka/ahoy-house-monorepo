import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from '../user/guard/roles.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      signOptions: { expiresIn: '5m' },
      secret: 'secretKey',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    // global guard
    //  { provide: APP_GUARD, useClass: RolesGuard },
    RolesGuard,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
