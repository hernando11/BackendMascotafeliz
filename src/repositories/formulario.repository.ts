import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Formulario, FormularioRelations} from '../models';

export class FormularioRepository extends DefaultCrudRepository<
  Formulario,
  typeof Formulario.prototype.id,
  FormularioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Formulario, dataSource);
  }
}
