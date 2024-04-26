import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entities/projects.entity';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'boolean' }) status: boolean;
  @Column({ type: 'numeric', nullable: false }) user_id: number;
  @ManyToOne(() => Project, (project: Project) => project.task)
  project: Project;
}
