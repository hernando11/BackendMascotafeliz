import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');
//import {fetch} from '../node-fetch';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  // NUEVO MEtodo IDENTIFICAR USUARIO
  // Sera un metodo POST que va a apuntar
  @post("/identificarPersona", {
    responses: {
      '200': {
        description: "Identificacion de usuarios"
      }
    }
  })
  // Será recibida por esta funcion Asincrona llamada"identificarPersona"
  // y debemos recibir un "requestbody" con un Usuario y Clave
  // como el Modelo "Credenciales" aun no existe, lo creamos con "lb4 model" de tipo "model"
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ) {
    // Ahora debo identificar el usuario que quiere accesar el sistema.
    let u = await this.servicioAutenticacion.IdentificarUsuario(credenciales.usuario, credenciales.clave)
    if (u) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(u);
      return {
        datos: {
          nombre: u.nombres,
          correo: u.correo,
          id: u.id

        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Los Datos son invalidos")
    }
  }


  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {

    // Utilizaremos el servicio de Autenticacion para generar una clave
    let clave = this.servicioAutenticacion.GenerarClave();
    // Ahora Ciframos la clave generada
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    // Al registro del Usuario que nos llega le debemos asignar esa ClaveCifrada,
    // para que sea almacenada en la Base de Datos.
    usuario.clave = claveCifrada;
    let u = await this.usuarioRepository.create(usuario);

    // NOTIFICAR al Usuario
    // La invocamos con la URL del Servicio de Phyton de Spider
    // que es "/envio-correo" con sus 3 paramtros
    let destino = usuario.correo;
    let asunto = 'Registro en la plataforma MascotaFeliz';
    let contenido = `Hola ${usuario.nombres}, su nombre de usaurios es: ${usuario.correo} y su contraseña es: ${clave}`;
    // PAra obtener la respuesta del "fetch" coloque el ".then"
    // y recibo un "data" de tipo "any" (de cualquier tipo), y
    // ejecuto un "consol.log" para darme cuenta si fue enviado o NO.
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return u;

  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
