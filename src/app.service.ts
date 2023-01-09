import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { VoiceModel } from './voice.model';

@Injectable()
export class AppService {
  async getHello(model: VoiceModel): Promise<string> {
    const configuration = new Configuration({
      organization: 'org-009XO13mxI9b0OFsN7pEBc4P',
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: model.message,
      max_tokens: 2048,
      temperature: 1,
    });
    return response.data.choices[0].text;
  }
}
