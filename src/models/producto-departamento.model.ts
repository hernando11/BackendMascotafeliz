import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoDepartamento extends Entity {
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
  departamentoId?: string;

  constructor(data?: Partial<ProductoDepartamento>) {
    super(data);
  }
}

export interface ProductoDepartamentoRelations {
  // describe navigational properties here
}

export type ProductoDepartamentoWithRelations = ProductoDepartamento & ProductoDepartamentoRelations;
