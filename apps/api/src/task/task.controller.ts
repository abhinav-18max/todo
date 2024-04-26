import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Project } from '../projects/entities/projects.entity';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post('/create')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Project> {
    return this.taskService.createTask(createTaskDto);
  }

  @Post('/update')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(updateTaskDto);
  }

  @Get('/delete')
  async deleteTask(@Query('id') id: number): Promise<Task> {
    return this.taskService.delete(id);
  }
}
