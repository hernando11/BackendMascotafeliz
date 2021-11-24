import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoCiudad, ProductoCiudadRelations} from '../models';

export class ProductoCiudadRepository extends DefaultCrudRepository<
  ProductoCiudad,
  typeof ProductoCiudad.prototype.id,
  ProductoCiudadRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductoCiudad, dataSource);
  }
}
