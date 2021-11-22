import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Plan} from './plan.model';

@model()
export class Ciudad extends Entity {
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
  idDepartamento: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Plan)
  plans: Plan[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
