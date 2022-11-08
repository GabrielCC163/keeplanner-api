import { BaseEntity } from '@database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;
}
