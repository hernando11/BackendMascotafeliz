import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Empleado, Programa, RolPrograma} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {RolProgramaRepository} from './rol-programa.repository';
import {ProgramaRepository} from './programa.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Rol.prototype.id>;

  public readonly programas: HasManyThroughRepositoryFactory<Programa, typeof Programa.prototype.id,
          RolPrograma,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('RolProgramaRepository') protected rolProgramaRepositoryGetter: Getter<RolProgramaRepository>, @repository.getter('ProgramaRepository') protected programaRepositoryGetter: Getter<ProgramaRepository>,
  ) {
    super(Rol, dataSource);
    this.programas = this.createHasManyThroughRepositoryFactoryFor('programas', programaRepositoryGetter, rolProgramaRepositoryGetter,);
    this.registerInclusionResolver('programas', this.programas.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
