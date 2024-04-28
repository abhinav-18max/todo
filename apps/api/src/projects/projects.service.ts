// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as fs from 'node:fs';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async createProject(project: CreateProjectDto, user: User): Promise<Project> {
    try {
      const newProject = new Project();
      newProject.name = project.name;
      newProject.user_id = user.id;
      const proj = await this.projectRepository.save(newProject);
      return proj;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updateProject(project: UpdateProjectDto, user: User): Promise<Project> {
    try {
      const proj = await this.projectRepository.findOne({
        where: {
          id: project.id,
          user_id: user.id,
        },
      });
      proj.name = project.name;
      await this.projectRepository.save(proj);
      return proj;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findProjectById(project_id: number, user_id: number): Promise<Project> {
    try {
      const proj = await this.projectRepository.findOne({
        where: {
          id: project_id,
          user_id: user_id,
        },
        relations: {
          task: true,
        },
      });
      return proj;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async allprojects(user_id: number): Promise<Project[]> {
    try {
      const proj = await this.projectRepository.find({
        where: {
          user_id: user_id,
        },
      });
      return proj;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async download(project_id: number, path: string) {
    try {
      const proj = await this.projectRepository.findOne({
        where: {
          id: project_id,
        },
        relations: {
          task: true,
        },
      });
      let markdownContent = `# ${proj.name}\n`;
      markdownContent += `Summary: ${proj.completed}/${proj.total} todos completed \n`;
      markdownContent += `Pending \n`;
      proj.task.map((e) => {
        if (e.status === false) {
          markdownContent += `- ${e.name} \n`;
        }
      });
      markdownContent += `Completed \n`;
      proj.task.map((e) => {
        if (e.status === true) {
          markdownContent += `- ${e.name} \n`;
        }
      });

      const filepath = `../../${path}/${proj.name}.md`;
      fs.writeFileSync(filepath, markdownContent);

      return markdownContent;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
