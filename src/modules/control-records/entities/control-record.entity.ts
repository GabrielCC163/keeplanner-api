import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('control_records')
@Index(['month', 'year', 'userId'], { unique: true })
export class ControlRecordEntity {
  @Column({ type: 'integer' })
  month: number;

  @Column({ type: 'integer' })
  year: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
}
