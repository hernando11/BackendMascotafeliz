import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad, Plan} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {PlanRepository} from './plan.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Departamento, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
  }
}
