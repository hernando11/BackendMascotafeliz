import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Empleado,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioEmpleadoController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Empleado> {
    return this.usuarioRepository.empleado(id);
  }
}
