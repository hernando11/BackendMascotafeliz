import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Ciudad} from './ciudad.model';
import {Proveedor} from './proveedor.model';
import {Empleado} from './empleado.model';
import {Solicitud} from './solicitud.model';

@model()
export class Plan extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  idDepartamento: string;

  @property({
    type: 'string',
    required: true,
  })
  idCiudad: string;

  @property({
    type: 'string',
    required: true,
  })
  idProveedor: string;

  @property({
    type: 'string',
    required: true,
  })
  idAdministrador: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
