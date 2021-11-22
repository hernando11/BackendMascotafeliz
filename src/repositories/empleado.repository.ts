import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Usuario, Plan} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PlanRepository} from './plan.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Empleado.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Empleado, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
