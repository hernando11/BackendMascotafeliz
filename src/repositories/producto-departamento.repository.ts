import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoDepartamento, ProductoDepartamentoRelations} from '../models';

export class ProductoDepartamentoRepository extends DefaultCrudRepository<
  ProductoDepartamento,
  typeof ProductoDepartamento.prototype.id,
  ProductoDepartamentoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductoDepartamento, dataSource);
  }
}
