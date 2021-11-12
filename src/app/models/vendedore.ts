import { Localidad } from "./localidad";

export interface Vendedor {
  fechaNacimiento: string,
  habilitado: boolean,
  id: number,
  localidad: Localidad,
  nombre: string,
  observaciones: string,
  usuarioLogin: string,
}
