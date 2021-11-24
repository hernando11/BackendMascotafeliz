import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Ciudad,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudCiudadController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Ciudad> {
    return this.solicitudRepository.ciudad(id);
  }
}
