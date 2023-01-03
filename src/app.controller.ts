import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VoiceModel } from './voice.model';
import {VoiceDto} from "./voice.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Body() request: VoiceModel): Promise<string> {
    return await this.appService.getHello(request);
  }
}
