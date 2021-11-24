import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {ProductoDepartamento} from './producto-departamento.model';
import {Ciudad} from './ciudad.model';
import {ProductoCiudad} from './producto-ciudad.model';
import {Proveedor} from './proveedor.model';
import {ProductoProveedor} from './producto-proveedor.model';
import {Empleado} from './empleado.model';

@model()
export class Producto extends Entity {
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
  precioVenta: number;

  @property({
    type: 'number',
    required: true,
  })
  precioCompra: number;

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

  @hasMany(() => Departamento, {through: {model: () => ProductoDepartamento}})
  departamentos: Departamento[];

  @hasMany(() => Ciudad, {through: {model: () => ProductoCiudad}})
  ciudads: Ciudad[];

  @hasMany(() => Proveedor, {through: {model: () => ProductoProveedor}})
  proveedors: Proveedor[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
