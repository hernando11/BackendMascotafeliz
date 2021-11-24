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
Programa,
RolPrograma,
Rol,
} from '../models';
import {ProgramaRepository} from '../repositories';

export class ProgramaRolController {
  constructor(
    @repository(ProgramaRepository) protected programaRepository: ProgramaRepository,
  ) { }

  @get('/programas/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Programa has many Rol through RolPrograma',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.programaRepository.rols(id).find(filter);
  }

  @post('/programas/{id}/rols', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Programa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInPrograma',
            exclude: ['id'],
          }),
        },
      },
    }) rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.programaRepository.rols(id).create(rol);
  }

  @patch('/programas/{id}/rols', {
    responses: {
      '200': {
        description: 'Programa.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.programaRepository.rols(id).patch(rol, where);
  }

  @del('/programas/{id}/rols', {
    responses: {
      '200': {
        description: 'Programa.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.programaRepository.rols(id).delete(where);
  }
}
