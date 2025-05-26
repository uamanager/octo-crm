import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (_authConfig: ConfigType<typeof authConfig>) => {
        return {
          global: true,
          publicKey: _authConfig.publicKey,
          privateKey: _authConfig.privateKey,
          signOptions: {
            algorithm: _authConfig.algorithm,
            expiresIn: _authConfig.ttl,
            audience: _authConfig.audience,
            issuer: _authConfig.issuer,
          },
          verifyOptions: {
            algorithm: _authConfig.algorithm,
            audience: _authConfig.audience,
            issuer: _authConfig.issuer,
          },
        };
      },
      inject: [authConfig.KEY],
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
