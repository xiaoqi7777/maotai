import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import {FamilyWork} from './home.service'
// import { AppService } from './app.service';
// import { TasksService } from './task.service';
// import { LoginService } from './login.service';
// import { ProductService } from './product.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  // controllers: [AppController],
  providers: [FamilyWork],
  // providers: [AppService, TasksService, LoginService, ProductService],
})
export class AppModule {}
