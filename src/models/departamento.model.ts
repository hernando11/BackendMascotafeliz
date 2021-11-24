import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Plan} from './plan.model';
import {Producto} from './producto.model';
import {ProductoDepartamento} from './producto-departamento.model';

@model()
export class Departamento extends Entity {
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

  @hasMany(() => Ciudad)
  ciudads: Ciudad[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Producto, {through: {model: () => ProductoDepartamento}})
  productos: Producto[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
