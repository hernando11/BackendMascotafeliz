import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Programa, ProgramaRelations} from '../models';

export class ProgramaRepository extends DefaultCrudRepository<
  Programa,
  typeof Programa.prototype.id,
  ProgramaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Programa, dataSource);
  }
}
