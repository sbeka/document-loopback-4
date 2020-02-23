import { Entity, model, property } from '@loopback/repository';

@model()
export class Documents extends Entity {
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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  start: string;

  @property({
    type: 'string',
    required: true,
  })
  end: string;

  @property({
    type: 'string',
    required: true,
  })
  info: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
  })
  executor?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  docs?: object[];


  constructor(data?: Partial<Documents>) {
    super(data);
  }
}

export interface DocumentsRelations {
  // describe navigational properties here
}

export type DocumentsWithRelations = Documents & DocumentsRelations;
