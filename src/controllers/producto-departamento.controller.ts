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
Producto,
ProductoDepartamento,
Departamento,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDepartamentoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of Producto has many Departamento through ProductoDepartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento[]> {
    return this.productoRepository.departamentos(id).find(filter);
  }

  @post('/productos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'create a Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInProducto',
            exclude: ['id'],
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.productoRepository.departamentos(id).create(departamento);
  }

  @patch('/productos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Producto.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.productoRepository.departamentos(id).patch(departamento, where);
  }

  @del('/productos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Producto.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.productoRepository.departamentos(id).delete(where);
  }
}
