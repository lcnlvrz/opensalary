import { AbstractEntity } from 'src/common/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class LocalRegisterEntity extends AbstractEntity {
  @Column()
  password: string;
}
