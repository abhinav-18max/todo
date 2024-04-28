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

  async createTask(task: CreateTaskDto, user_id: number): Promise<Project> {
    try {
      const task_ = new Task();
      task_.name = task.name;
      task_.description = task.description;
      task_.status = task.status;
      const newtask = await this.taskRepository.save(task_);
      const project = await this.projectRepository.findOne({
        where: {
          id: task.project_id,
          user_id: user_id,
        },
        relations: {
          task: true,
        },
      });
      console.log(project);
      project.task.push(newtask);
      if (newtask.status) {
        project.completed += 1;
        project.total += 1;
      } else {
        project.total += 1;
      }
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
      const oldtask = await this.taskRepository.findOne({
        where: {
          id: updateTaskdto.id,
        },
      });
      const newtask = await this.taskRepository.save(task);
      const project = await this.projectRepository.findOne({
        where: {
          id: updateTaskdto.project_id,
        },
        relations: {
          task: true,
        },
      });
      project.task.push(newtask);
      if (newtask.status === true && oldtask.status === false) {
        project.completed += 1;
      } else if (oldtask.status === true && newtask.status === false) {
        project.completed -= 1;
      }
      await this.projectRepository.save(project);
      return newtask;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async delete(task_id: number, project_id: number) {
    try {
      const newtask = await this.taskRepository.findOne({
        where: {
          id: task_id,
        },
      });
      const project = await this.projectRepository.findOne({
        where: {
          id: project_id,
        },
        relations: {
          task: true,
        },
      });
      if (newtask.status) {
        project.completed -= 1;
        project.total -= 1;
      } else {
        project.total -= 1;
      }
      await this.projectRepository.save(project);
      return await this.taskRepository.remove(newtask);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
