import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('BOM_SERVICE') private readonly client: ClientProxy) { }

  async onModuleInit() {
    await this.client.connect();
  }

  @Post('rabbitMq')
      async create(@Body() payload: any) {
      console.log(payload);
      return this.client.send({
        cmd:'new Data'
      },payload)
  }

  @Get()
  getHello() {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    return 'Hello World printed';
  }
}
