import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  deviceId: string;

  @Column({
    nullable: false,
  })
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  social: boolean;

  @CreateDateColumn()
  created_at: Date;
}
