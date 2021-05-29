import { AbstractEntity } from 'src/common/abstract-entity';
import { JobInterval } from 'src/source-of-truth/intervals';
import { Column, Entity } from 'typeorm';

@Entity()
export class SalaryEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'enum', enum: JobInterval })
  interval: JobInterval;

  @Column()
  currency: string;

  @Column()
  company: string;

  @Column()
  occupation: string;

  @Column()
  yearsOfExperience: number;

  @Column()
  location: string;

  @Column()
  userId: number;
}
