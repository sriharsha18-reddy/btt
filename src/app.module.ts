import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
// import { ProfileController } from './profile/profile.controller'; // Profile controller
import { AuthGuard } from './auth/auth.guard'; // Auth guard

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nyalakondasriharsha123:IcTwmFDKHC2llKY4@cluster0.0hdbj.mongodb.net/'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Use a secure key from environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [UserController], // Add ProfileController here
  // controllers: [UserController, ProfileController], // Add ProfileController here
  providers: [UserService, AuthGuard], // Add AuthGuard in the providers array
})
export class AppModule {}
