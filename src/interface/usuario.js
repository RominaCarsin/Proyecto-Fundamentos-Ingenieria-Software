// clases/Usuario.js
export class Usuario {
  constructor(idUsuario, nombreU, correo, cedula, contrasena) {
    this.idUsuario = idUsuario;
    this.nombreU = nombreU;
    this.correo = correo;
    this.cedula = cedula;
    this.contrasena = contrasena;
    this.configuracion = null;
    this.cuentas = [];
    this.alertas = [];
    this.portafolio = null;
  }

  registrarse() {
    console.log(`Usuario ${this.nombreU} registrado`);
  }

  iniciarSeccion() {
    console.log(`Inicio de sesión de ${this.nombreU}`);
  }

  editarPerfil(nuevoNombre, nuevoCorreo) {
    this.nombreU = nuevoNombre;
    this.correo = nuevoCorreo;
  }
}
