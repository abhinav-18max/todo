import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/projects.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createTask(task: CreateTaskDto): Promise<Project> {
    try {
      const task_ = new Task();
      task_.name = task.name;
      const newtask = await this.taskRepository.save(task_);
      const project = await this.projectRepository.findOne({
        where: {
          id: task.project_id,
          user_id: task.user_id,
        },
        relations: {
          task: true,
        },
      });
      console.log(project);
      project.task.push(newtask);
      return await this.projectRepository.save(project);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async update(updateTaskdto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: updateTaskdto.id,
        },
      });
      task.name = updateTaskdto.name;
      task.description = updateTaskdto.description;
      task.status = updateTaskdto.status;
      return await this.taskRepository.save(task);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async delete(task_id: number) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });
      return await this.taskRepository.remove(task);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
