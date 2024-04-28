import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Project } from '../projects/entities/projects.entity';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthUser } from '../utils/decorators/AuthUser.decorator';
import { User } from '../user/entities/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post('/create')
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @AuthUser() user: User,
  ): Promise<Project> {
    console.log(createTaskDto, user);
    return this.taskService.createTask(createTaskDto, user.id);
  }

  @Post('/update')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(updateTaskDto);
  }

  @Get('/delete')
  async deleteTask(
    @Query('task_id') task_id: number,
    @Query('project_id') project_id: number,
  ): Promise<Task> {
    console.log('deleteTask');
    return this.taskService.delete(task_id, project_id);
  }
}
