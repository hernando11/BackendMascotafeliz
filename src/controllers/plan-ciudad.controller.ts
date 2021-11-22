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
  Ciudad,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanCiudadController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Ciudad> {
    return this.planRepository.ciudad(id);
  }
}
