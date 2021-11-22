import {Entity, model, property} from '@loopback/repository';

@model()
export class Permiso extends Entity {
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
  idRol: string;

  @property({
    type: 'string',
    required: true,
  })
  idPrograma: string;


  constructor(data?: Partial<Permiso>) {
    super(data);
  }
}

export interface PermisoRelations {
  // describe navigational properties here
}

export type PermisoWithRelations = Permiso & PermisoRelations;
