import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Evop-Entity
 */
@Entity()
export default class TRCAEntity extends BaseEntity {
  /**
   * ID of Entity
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * Created date of Entity
   */
  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  /**
   * Update date of Entity
   */
  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt: Date;
}
