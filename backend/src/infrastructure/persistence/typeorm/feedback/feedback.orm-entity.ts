import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'

@Entity('feedbacks')
export class FeedbackOrmEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @Column('int')
  rating: number

  @Column()
  userId: number

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity
}
