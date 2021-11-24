import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, Plan, Producto, ProductoCiudad, Solicitud} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {PlanRepository} from './plan.repository';
import {ProductoCiudadRepository} from './producto-ciudad.repository';
import {ProductoRepository} from './producto.repository';
import {SolicitudRepository} from './solicitud.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Ciudad.prototype.id>;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          ProductoCiudad,
          typeof Ciudad.prototype.id
        >;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ProductoCiudadRepository') protected productoCiudadRepositoryGetter: Getter<ProductoCiudadRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Ciudad, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, productoCiudadRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
