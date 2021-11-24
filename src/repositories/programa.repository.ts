import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Programa, ProgramaRelations, Rol, RolPrograma} from '../models';
import {RolProgramaRepository} from './rol-programa.repository';
import {RolRepository} from './rol.repository';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.id,
  ProgramaRelations
> {

  public readonly rols: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype.id,
          RolPrograma,
          typeof Programa.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolProgramaRepository') protected rolProgramaRepositoryGetter: Getter<RolProgramaRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Programa, dataSource);
    this.rols = this.createHasManyThroughRepositoryFactoryFor('rols', rolRepositoryGetter, rolProgramaRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
  }
}
