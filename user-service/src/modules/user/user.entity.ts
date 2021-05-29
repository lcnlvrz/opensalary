import { AbstractEntity } from 'src/common/abstract-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { LocalRegisterEntity } from '../local-register/local-register.entity';
import { SocialMediaRegisterEntity } from '../social-media-register/social-media-register.entity';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToOne(() => SocialMediaRegisterEntity)
  @JoinColumn()
  socialMediaRegister: SocialMediaRegisterEntity;

  @OneToOne(() => LocalRegisterEntity)
  @JoinColumn()
  localRegister: LocalRegisterEntity;
}
