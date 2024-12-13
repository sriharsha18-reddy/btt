import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // Replace with your MongoDB URI
    UserModule,
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
