import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Session {
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
   * Device-IP
   */
  @Column({ type: 'text' })
  ip: string;
}
