import { Column, Entity } from 'typeorm';
import TRCAEntity from '../trcaentity';

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
}
