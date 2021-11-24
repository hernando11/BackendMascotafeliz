import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RolPrograma, RolProgramaRelations} from '../models';

export class RolProgramaRepository extends DefaultCrudRepository<
  RolPrograma,
  typeof RolPrograma.prototype.id,
  RolProgramaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(RolPrograma, dataSource);
  }
}
