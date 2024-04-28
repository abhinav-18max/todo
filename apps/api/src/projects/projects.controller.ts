import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/projects.entity';
import { AuthUser } from '../utils/decorators/AuthUser.decorator';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DownloadDto } from './dto/download.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post('/create')
  async createProject(
    @AuthUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    console.log('createProject');
    console.log(user);
    console.log(createProjectDto);
    return this.projectsService.createProject(createProjectDto, user);
  }

  @Post('/update')
  async updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @AuthUser() user: User,
  ): Promise<Project> {
    return this.projectsService.updateProject(updateProjectDto, user);
  }

  @Get('/projects')
  async findProjectById(
    @Query('id') id: number,
    @AuthUser() user: User,
  ): Promise<Project> {
    return this.projectsService.findProjectById(id, user.id);
  }

  @Get('/allprojects')
  async allprojects(@AuthUser() user: User): Promise<Project[]> {
    console.log('hiii');
    return this.projectsService.allprojects(user.id);
  }

  @Post('/download')
  async download(@Body() download: DownloadDto) {
    console.log(download);
    return this.projectsService.download(download.id, download.path);
  }
}
