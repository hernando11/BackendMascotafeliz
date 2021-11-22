import {Entity, model, property} from '@loopback/repository';

@model()
export class Parametro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;


  constructor(data?: Partial<Parametro>) {
    super(data);
  }
}

export interface ParametroRelations {
  // describe navigational properties here
}

export type ParametroWithRelations = Parametro & ParametroRelations;
