import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import TRCAEntity from '../trcaentity';

@Entity()
export class User extends TRCAEntity {
  /**
   * First Name of the User
   */
  @Column({ nullable: false, default: '' })
  firstName!: string;

  /**
   * Last Name of the User
   */
  @Column({ nullable: false, default: '' })
  lastName!: string;

  /**
   * E-Mail of the User
   */
  @Column({ nullable: false, default: '', unique: true })
  email!: string;

  /**
   * Hashed-Version of the User-Password
   */
  @Column({ nullable: false, select: false })
  password!: string;
}
