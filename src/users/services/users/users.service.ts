import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../../entity/users.entity';
import dayjs from 'dayjs';
import { FreeTrialEndDto } from '../../dto/freeTrialEnd.dto';
import { UserRegisterDto } from '../../controllers/users/user-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}
  async createUser(createUserDto: UserRegisterDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log(hashedPassword);
    const newUser = this.userRepository.create({
      deviceId: createUserDto.deviceId,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async isFreeTrialEnded(deviceId: string): Promise<FreeTrialEndDto> {
    const user = await this.userRepository.findOneBy({ deviceId: deviceId });
    if (user != null) {
      const isFreeTrialEnded = dayjs(user.created_at)
        .add(2, 'day')
        .isBefore(new Date());
      return { isFreeTrialEnded: isFreeTrialEnded };
    }
    return null;
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }
}
