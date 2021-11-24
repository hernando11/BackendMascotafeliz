import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Empleado,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoEmpleadoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Empleado> {
    return this.productoRepository.empleado(id);
  }
}
