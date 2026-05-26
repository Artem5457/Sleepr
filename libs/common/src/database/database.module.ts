import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const user = config.getOrThrow<string>('MONGO_USER');
        const password = config.getOrThrow<string>('MONGO_PASSWORD');
        const host = config.get<string>('MONGO_HOST', 'localhost');
        const port = config.getOrThrow<string>('MONGO_PORT');
        const database = config.getOrThrow<string>('MONGO_DATABASE');

        const uri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`;

        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
