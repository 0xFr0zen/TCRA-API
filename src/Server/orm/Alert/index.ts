import { Column, Entity } from 'typeorm';
import TRCAEntity from '../trcaentity';

/**
 * Evop-Entity
 */
@Entity()
export default class Alert extends TRCAEntity {
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
   * Sound volume
   */
  @Column({ type: 'float', default: 0.5 })
  volume!: number;

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
}
