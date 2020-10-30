import { Column, Entity } from 'typeorm';
import TRCAEntity from '../trcaentity';

@Entity()
export class User extends TRCAEntity {
  /**
   * Username
   */
  @Column({ nullable: false, default: '' })
  name!: string;

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
