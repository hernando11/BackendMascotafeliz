
//

import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

// Nos sirve para revisar todo lo de la Estrategia y para Validacion
// de una Solicitides
// Entonces cada una de las Estartegias tendran un Nombre
export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'administrador';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {

  }


  async authenticate(request: Request): Promise<UserProfile | undefined> {

    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        // Aqui podriamos valida el ROLE del Usuario, si en la funcion
        // "ValidarTokenJWT" se estuviera pasando como parametro en la
        // variable "data" (autenticacion.service.ts)
        //if (datos.data.role)

        // PERO como no tenemos ROLEs simplemente vamosa definir un PERFIL
        console.log("Variable datos", datos);
        console.log("\nContenido datos.date : ", datos.data);
        //console.log("\nContenido datos.data : ", datos.data);
        let perfil: UserProfile = Object.assign({
          // ombre: datos.data.nombre
          nombre: datos.data.nombre
        });
        return perfil;

      } else {
        throw new HttpErrors[401]("Hola El token incluido no es validod.")
      }

    } else {
      throw new HttpErrors[401]("Hola No se ha incluido un Token en la solicitud.")
    }
  }
}
