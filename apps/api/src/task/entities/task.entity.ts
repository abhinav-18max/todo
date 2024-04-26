import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entities/projects.entity';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'boolean', default: false }) status: boolean;
  @Column({ type: 'varchar', default: '', length: 2555 }) description: string;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) created_at: Date;
  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
    onUpdate: 'CURRENT_DATE',
  })
  updated_at: Date;
  @ManyToOne(() => Project, (project: Project) => project.task)
  project: Project;
}
