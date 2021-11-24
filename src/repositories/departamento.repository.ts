import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad, Plan, Producto, ProductoDepartamento} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {PlanRepository} from './plan.repository';
import {ProductoDepartamentoRepository} from './producto-departamento.repository';
import {ProductoRepository} from './producto.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Departamento.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          ProductoDepartamento,
          typeof Departamento.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ProductoDepartamentoRepository') protected productoDepartamentoRepositoryGetter: Getter<ProductoDepartamentoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Departamento, dataSource);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, productoDepartamentoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
  }
}
