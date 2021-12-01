import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
// importamos el archivo "llaves" creado en "src/config"
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  //constructor(/* Add @inject to inject parameters */) {}
  constructor(
    @repository(UsuarioRepository)
    public UsuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */
  // Actualizado 28 Nov 2021
  // Lo que hace es invocar al generador es invocar al generador
  // definido en la parte superior, para que nos cree una
  // Contraseña ALEATORIA.
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  // Ahora vamos a Cifrar la clave que acabamos de generar.
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  // Recibe el "usuario" (que es el correo) y "clave" la contraseña del usuario
  // este será el metodo de identificacion.
  IdentificarUsuario(usuario: string, clave: string) {
    try {
      let u = this.UsuarioRepository.findOne({where: {correo: usuario, clave: clave}});
      if (u) {
        return u;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Esta es la Creacion de un TOKEN cuando el contrlador identifique
  // que los datos suministrados por la persona corresponden a un
  //  usuario VALIDO de la BD, deberá generar un TOKEN especifico
  // para este usuario.
  GenerarTokenJWT(usuario: Usuario) {
    //puede tener un Expiration Date, es un tiempo dado en segundos.
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombres + " " + usuario.apellidos
        // Si autilizaramos ROLES aqui deberiamos pasarlos
        // role: usuario.rol
      }
      // Luego debe hacerse la Firma de un TOKEN y debe hacerse desde
      // el Backend.
    },
      Llaves.claveJWT)
    return token;
  }
  // Para validar el TOKEN, se recibe el token y se valida con la "llave"
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      console.log("En ValidarTokenJWT datos : ", datos);
      return datos;

    } catch {
      return false;
    }

  }
}
