import { Module } from '@nestjs/common'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
@Module({
 imports: [
  ClientsModule.register([
  { 
    name: 'BOM_SERVICE', 
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/pos-host'],
      queue: 'poc-queue',
      queueOptions: {
        durable: false
            },
      },
   },
 ]),
],
controllers: [AppController],
providers: [AppService], })
export class AppModule {
}