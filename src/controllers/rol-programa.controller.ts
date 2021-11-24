import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Rol,
RolPrograma,
Programa,
} from '../models';
import {RolRepository} from '../repositories';

export class RolProgramaController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/programas', {
    responses: {
      '200': {
        description: 'Array of Rol has many Programa through RolPrograma',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Programa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Programa>,
  ): Promise<Programa[]> {
    return this.rolRepository.programas(id).find(filter);
  }

  @post('/rols/{id}/programas', {
    responses: {
      '200': {
        description: 'create a Programa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Programa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {
            title: 'NewProgramaInRol',
            exclude: ['id'],
          }),
        },
      },
    }) programa: Omit<Programa, 'id'>,
  ): Promise<Programa> {
    return this.rolRepository.programas(id).create(programa);
  }

  @patch('/rols/{id}/programas', {
    responses: {
      '200': {
        description: 'Rol.Programa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {partial: true}),
        },
      },
    })
    programa: Partial<Programa>,
    @param.query.object('where', getWhereSchemaFor(Programa)) where?: Where<Programa>,
  ): Promise<Count> {
    return this.rolRepository.programas(id).patch(programa, where);
  }

  @del('/rols/{id}/programas', {
    responses: {
      '200': {
        description: 'Rol.Programa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Programa)) where?: Where<Programa>,
  ): Promise<Count> {
    return this.rolRepository.programas(id).delete(where);
  }
}
