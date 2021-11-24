import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Rol,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoRolController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Rol> {
    return this.empleadoRepository.rol(id);
  }
}
