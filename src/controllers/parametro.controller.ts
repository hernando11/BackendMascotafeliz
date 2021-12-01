import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Parametro} from '../models';
import {ParametroRepository} from '../repositories';

@authenticate("administrador")
export class ParametroController {
  constructor(
    @repository(ParametroRepository)
    public parametroRepository: ParametroRepository,
  ) { }


  @post('/parametros')
  @response(200, {
    description: 'Parametro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parametro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {
            title: 'NewParametro',
            exclude: ['id'],
          }),
        },
      },
    })
    parametro: Omit<Parametro, 'id'>,
  ): Promise<Parametro> {
    return this.parametroRepository.create(parametro);
  }

  @authenticate.skip()
  @get('/parametros/count')
  @response(200, {
    description: 'Parametro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    return this.parametroRepository.count(where);
  }

  @get('/parametros')
  @response(200, {
    description: 'Array of Parametro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parametro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parametro) filter?: Filter<Parametro>,
  ): Promise<Parametro[]> {
    return this.parametroRepository.find(filter);
  }

  @patch('/parametros')
  @response(200, {
    description: 'Parametro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    return this.parametroRepository.updateAll(parametro, where);
  }

  @get('/parametros/{id}')
  @response(200, {
    description: 'Parametro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parametro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parametro, {exclude: 'where'}) filter?: FilterExcludingWhere<Parametro>
  ): Promise<Parametro> {
    return this.parametroRepository.findById(id, filter);
  }

  @patch('/parametros/{id}')
  @response(204, {
    description: 'Parametro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.updateById(id, parametro);
  }

  @put('/parametros/{id}')
  @response(204, {
    description: 'Parametro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.replaceById(id, parametro);
  }

  @del('/parametros/{id}')
  @response(204, {
    description: 'Parametro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parametroRepository.deleteById(id);
  }
}
