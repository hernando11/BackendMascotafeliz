import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {RolPrograma} from './rol-programa.model';

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

  @hasMany(() => Rol, {through: {model: () => RolPrograma}})
  rols: Rol[];

  constructor(data?: Partial<Programa>) {
    super(data);
  }
}

export interface ProgramaRelations {
  // describe navigational properties here
}

export type ProgramaWithRelations = Programa & ProgramaRelations;
