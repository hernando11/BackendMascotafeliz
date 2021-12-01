import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';

@model()
export class Usuario extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: false,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  telefono: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
    required: false,
  })
  estado: string;

  @property({
    type: 'string',
    required: false,
  })
  tipo: string;

  @property({
    type: 'string',
  })
  idEmpleado?: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
