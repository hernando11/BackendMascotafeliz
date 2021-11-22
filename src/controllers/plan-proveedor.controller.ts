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
  Proveedor,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanProveedorController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Proveedor> {
    return this.planRepository.proveedor(id);
  }
}
