import {Entity, model, property} from '@loopback/repository';

@model()
export class RolPrograma extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  rolId?: string;

  @property({
    type: 'string',
  })
  programaId?: string;

  constructor(data?: Partial<RolPrograma>) {
    super(data);
  }
}

export interface RolProgramaRelations {
  // describe navigational properties here
}

export type RolProgramaWithRelations = RolPrograma & RolProgramaRelations;
