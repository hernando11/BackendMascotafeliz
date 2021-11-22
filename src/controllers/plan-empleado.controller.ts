import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Empleado,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanEmpleadoController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Empleado> {
    return this.planRepository.empleado(id);
  }
}
