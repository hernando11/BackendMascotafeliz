import {Entity, model, property} from '@loopback/repository';

@model()
export class Formulario extends Entity {
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
  descripcion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;


  constructor(data?: Partial<Formulario>) {
    super(data);
  }
}

export interface FormularioRelations {
  // describe navigational properties here
}

export type FormularioWithRelations = Formulario & FormularioRelations;
