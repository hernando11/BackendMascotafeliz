import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoProveedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  constructor(data?: Partial<ProductoProveedor>) {
    super(data);
  }
}

export interface ProductoProveedorRelations {
  // describe navigational properties here
}

export type ProductoProveedorWithRelations = ProductoProveedor & ProductoProveedorRelations;
