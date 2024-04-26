import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../projects/entities/projects.entity';
import { Task } from '../../task/entities/task.entity';

const entities = [SessionEntity, User, Project, Task];
export default entities;

export { SessionEntity, User, Project, Task };
