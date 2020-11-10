import { Column, Entity, ManyToOne } from 'typeorm';
import Alert from '../Alert';
import { User } from './User';

@Entity()
export class Command extends Alert {
  /**
   * Command access
   */
  @Column({ type: 'enum', enum: [0, 1, 2, 3, 4], default: 4 })
  access!: 0 | 1 | 2 | 3 | 4;
  /**
   * Connection to user
   */
  @ManyToOne(() => User, (u) => u.id)
  owner: number;
}
