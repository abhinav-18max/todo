import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity({ name: 'Project' })
export class Project {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'varchar', length: 255 }) name: string;
  @Column({ type: 'int', default: 0 }) total: number;
  @Column({ type: 'int', default: 0 }) completed: number;
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) created_at: Date;
  @Column({ type: 'numeric', nullable: false }) user_id: number;
  @OneToMany(() => Task, (task) => task.project)
  task: Task[];
}
