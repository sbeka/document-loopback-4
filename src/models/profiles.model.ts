import {Entity, model, property} from '@loopback/repository';

@model()
export class Profiles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  login: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
  })
  fio?: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  mail?: string;


  constructor(data?: Partial<Profiles>) {
    super(data);
  }
}

export interface ProfilesRelations {
  // describe navigational properties here
}

export type ProfilesWithRelations = Profiles & ProfilesRelations;
