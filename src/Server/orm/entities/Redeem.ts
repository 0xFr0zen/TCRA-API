import { Column, Entity, ManyToOne } from 'typeorm';
import TRCAEntity from '../trcaentity';
import { User } from './User';

@Entity()
export class Redeem extends TRCAEntity {
  /**
   * Redeem name
   */
  @Column({ type: 'text' })
  name!: string;

  /**
   * Redeem text
   */
  @Column({ type: 'text' })
  text: string;

  /**
   * Gif link
   */
  @Column({ type: 'text' })
  gif: string;

  /**
   * Sound link
   */
  @Column({ type: 'text' })
  sound: string;

  /**
   * Duration
   */
  @Column({ type: 'int', default: 10 })
  duration: number;

  /**
   * Connection to user
   */
  @ManyToOne(() => User, (u) => u.id)
  user: number;
}
