import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Programa} from '../models';
import {ProgramaRepository} from '../repositories';

export class ProgramaController {
  constructor(
    @repository(ProgramaRepository)
    public programaRepository : ProgramaRepository,
  ) {}

  @post('/programas')
  @response(200, {
    description: 'Programa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Programa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {
            title: 'NewPrograma',
            exclude: ['id'],
          }),
        },
      },
    })
    programa: Omit<Programa, 'id'>,
  ): Promise<Programa> {
    return this.programaRepository.create(programa);
  }

  @get('/programas/count')
  @response(200, {
    description: 'Programa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Programa) where?: Where<Programa>,
  ): Promise<Count> {
    return this.programaRepository.count(where);
  }

  @get('/programas')
  @response(200, {
    description: 'Array of Programa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Programa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Programa) filter?: Filter<Programa>,
  ): Promise<Programa[]> {
    return this.programaRepository.find(filter);
  }

  @patch('/programas')
  @response(200, {
    description: 'Programa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {partial: true}),
        },
      },
    })
    programa: Programa,
    @param.where(Programa) where?: Where<Programa>,
  ): Promise<Count> {
    return this.programaRepository.updateAll(programa, where);
  }

  @get('/programas/{id}')
  @response(200, {
    description: 'Programa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Programa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Programa, {exclude: 'where'}) filter?: FilterExcludingWhere<Programa>
  ): Promise<Programa> {
    return this.programaRepository.findById(id, filter);
  }

  @patch('/programas/{id}')
  @response(204, {
    description: 'Programa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Programa, {partial: true}),
        },
      },
    })
    programa: Programa,
  ): Promise<void> {
    await this.programaRepository.updateById(id, programa);
  }

  @put('/programas/{id}')
  @response(204, {
    description: 'Programa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() programa: Programa,
  ): Promise<void> {
    await this.programaRepository.replaceById(id, programa);
  }

  @del('/programas/{id}')
  @response(204, {
    description: 'Programa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.programaRepository.deleteById(id);
  }
}
