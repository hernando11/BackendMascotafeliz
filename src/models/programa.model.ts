import {Entity, model, property} from '@loopback/repository';

@model()
export class Programa extends Entity {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Programa>) {
    super(data);
  }
}

export interface ProgramaRelations {
  // describe navigational properties here
}

export type ProgramaWithRelations = Programa & ProgramaRelations;
