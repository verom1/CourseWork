import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { LocalStrategy } from 'src/security/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMapper } from 'src/user/user.mapper';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, UserMapper],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
