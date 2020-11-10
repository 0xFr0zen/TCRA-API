import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  /**
   * ID of Session
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * Created date of Session
   */
  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  /**
   * Update date of Session
   */
  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt: Date;

  /**
   * Expires in given time
   */
  @Column({ type: 'date' })
  expiresAt: Date;

  /**
   * Session-Hash
   */
  @Column({ type: 'text' })
  hash: string;

  /**
   * Twitch-Access-Token
   */
  @Column({ type: 'text', nullable: false })
  code: string;

  /**
   * Twitch-Access-Token
   */
  @Column({ type: 'json', nullable: false })
  scopes: any;

  /**
   * Device-IP
   */
  @Column({ type: 'text' })
  ip: string;
}
