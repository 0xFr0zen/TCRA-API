import { Column, Entity, ManyToOne } from 'typeorm';
import TRCAEntity from '../trcaentity';
import { User } from './User';

@Entity()
export class Command extends TRCAEntity {
  /**
   * Command name
   */
  @Column({ type: 'text' })
  name!: string;

  /**
   * Command text
   */
  @Column({ type: 'text' })
  text!: string;

  /**
   * Command access
   */
  @Column({ type: 'enum', enum: [0, 1, 2, 3, 4], default: 4 })
  access!: 0 | 1 | 2 | 3 | 4;

  /**
   * Gif link
   */
  @Column({ type: 'text' })
  gif!: string;

  /**
   * Sound link
   */
  @Column({ type: 'text' })
  sound!: string;

  /**
   * Duration
   */
  @Column({ type: 'int', default: 10 })
  duration!: number;

  /**
   * Cooldown
   */
  @Column({ type: 'int', default: 60 })
  cooldown!: number;

  /**
   * Connection to user
   */
  @ManyToOne(() => User, (u) => u.id)
  user: number;
}
