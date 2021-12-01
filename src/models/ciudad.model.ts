import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Plan} from './plan.model';
import {ProductoCiudad} from './producto-ciudad.model';
import {Producto} from './producto.model';
import {Solicitud} from './solicitud.model';

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
    required: false,
  })
  idDepartamento: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Producto, {through: {model: () => ProductoCiudad}})
  productos: Producto[];

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
