import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Plan, Producto, ProductoProveedor} from '../models';
import {PlanRepository} from './plan.repository';
import {ProductoProveedorRepository} from './producto-proveedor.repository';
import {ProductoRepository} from './producto.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Proveedor.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          ProductoProveedor,
          typeof Proveedor.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ProductoProveedorRepository') protected productoProveedorRepositoryGetter: Getter<ProductoProveedorRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Proveedor, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, productoProveedorRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
