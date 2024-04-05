import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskListModule } from './task-list/task-list.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { BoardModule } from './board/board.module';

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:papakanban@localhost:5432/kanban',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'papakanban',
      database: process.env.DB_NAME || 'kanban',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TaskListModule,
    TasksModule,
    ActivityLogModule,
    BoardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
