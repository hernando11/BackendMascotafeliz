import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Plan} from './plan.model';

@model()
export class Empleado extends Entity {
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
  sesionMax: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  enlace: string;

  @property({
    type: 'string',
    required: true,
  })
  idAdministrador: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Plan)
  plans: Plan[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
