import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoCiudad extends Entity {
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
  ciudadId?: string;

  constructor(data?: Partial<ProductoCiudad>) {
    super(data);
  }
}

export interface ProductoCiudadRelations {
  // describe navigational properties here
}

export type ProductoCiudadWithRelations = ProductoCiudad & ProductoCiudadRelations;
