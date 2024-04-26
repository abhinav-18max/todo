import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/projects.entity';
import { AuthUser } from '../utils/decorators/AuthUser.decorator';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post('/create')
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @AuthUser() user: User,
  ): Promise<Project> {
    return this.projectsService.createProject(createProjectDto, user);
  }

  @Post('/update')
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @AuthUser() user: User,
  ): Promise<Project> {
    return this.projectsService.updateProject(updateProjectDto, user);
  }
}
