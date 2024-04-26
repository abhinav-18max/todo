import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
