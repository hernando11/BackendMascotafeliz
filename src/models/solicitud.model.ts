import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Cliente} from './cliente.model';
import {Ciudad} from './ciudad.model';
import {Empleado} from './empleado.model';
import {Mascota} from './mascota.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'string',
  })
  contrato?: string;

  @property({
    type: 'number',
  })
  pago?: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  idCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  idAsesor: string;

  @property({
    type: 'string',
    required: true,
  })
  idCiudad: string;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
