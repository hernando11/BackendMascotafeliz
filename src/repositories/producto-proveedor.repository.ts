import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoProveedor, ProductoProveedorRelations} from '../models';

export class ProductoProveedorRepository extends DefaultCrudRepository<
  ProductoProveedor,
  typeof ProductoProveedor.prototype.id,
  ProductoProveedorRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductoProveedor, dataSource);
  }
}
