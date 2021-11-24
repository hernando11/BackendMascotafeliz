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
ProductoCiudad,
Ciudad,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCiudadController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Array of Producto has many Ciudad through ProductoCiudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.productoRepository.ciudads(id).find(filter);
  }

  @post('/productos/{id}/ciudads', {
    responses: {
      '200': {
        description: 'create a Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInProducto',
            exclude: ['id'],
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.productoRepository.ciudads(id).create(ciudad);
  }

  @patch('/productos/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Producto.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.productoRepository.ciudads(id).patch(ciudad, where);
  }

  @del('/productos/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Producto.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.productoRepository.ciudads(id).delete(where);
  }
}
