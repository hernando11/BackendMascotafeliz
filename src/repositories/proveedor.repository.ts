import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Plan} from '../models';
import {PlanRepository} from './plan.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Proveedor, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
