import { AbstractEntity } from 'src/common/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SocialMediaRegisterEntity extends AbstractEntity {
  @Column({ unique: true })
  externalId: string;
}
