import {Column, Entity} from 'typeorm';

@Entity({name: 'user_state'})
export class UserStateEntity {
  constructor(id: number, state: string, stateParams?: string) {
    this.id = id;
    this.state = state;
    this.stateParams = stateParams;
  }

    @Column({name: 'user_id', type: 'bigint', unique: true, primary: true})
      id: number;

    @Column({name: 'user_state', type: 'smallint'})
      state: string;

    @Column({name: 'user_state_params', type: 'json', nullable: true})
      stateParams?: string;
}
