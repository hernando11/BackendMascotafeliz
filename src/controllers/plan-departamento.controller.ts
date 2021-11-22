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
  Departamento,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanDepartamentoController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Departamento> {
    return this.planRepository.departamento(id);
  }
}
