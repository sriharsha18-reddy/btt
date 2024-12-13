// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface'; // You'll create this interface for JWT payload
import { LoginUserDto } from 'src/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, // Injecting JwtService
  ) {}

  // Create user function
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  // Login function
  // async login(email: string, password: string): Promise<{ accessToken: string }> {
  async login(loginUserDto:LoginUserDto): Promise<{ accessToken: string }> {
    const {email,password} = loginUserDto;
    // Check if user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Create JWT payload
    const payload: JwtPayload = { email: user.email };
    // const payload: JwtPayload = { email: user.email, sub: user._id };

    // Generate JWT token
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
