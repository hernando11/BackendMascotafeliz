import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {Producto} from './producto.model';
import {ProductoProveedor} from './producto-proveedor.model';

@model()
export class Proveedor extends Entity {
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
  nit: string;

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
  estado: string;

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Producto, {through: {model: () => ProductoProveedor}})
  productos: Producto[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
