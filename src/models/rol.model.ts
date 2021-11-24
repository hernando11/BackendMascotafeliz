import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Programa} from './programa.model';
import {RolPrograma} from './rol-programa.model';

@model()
export class Rol extends Entity {
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

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Programa, {through: {model: () => RolPrograma}})
  programas: Programa[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
