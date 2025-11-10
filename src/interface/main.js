// main.js
// ===== IMPORTACIÓN DE CLASES =====
import { Usuario } from './usuario.js';
import { Cuenta } from './cuenta.js';
import { ConfiguracionUsuario } from './configuracion.js';
import { Activo } from './activo.js';
import { Portafolio } from './portafolio.js';
import { Transaccion } from './transaccion.js';
import { Comision } from './comision.js';

;


document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Sistema TradeUy iniciado");

  const usuario = new Usuario(1, "Guzmán", "guzman@mail.com", "4.123.456-7", "1234");
  const config = new ConfiguracionUsuario("Español", "Tarjeta", true);
  usuario.configuracion = config;

  const cuenta = new Cuenta(100, "Inversión", 5000, "USD");
  usuario.cuentas.push(cuenta);

  const activo = new Activo(1, "Acción X", "Acción", 120.5);
  const portafolio = new Portafolio(1, "2025-11-10");
  portafolio.activos.push(activo);

  console.log(usuario);
  console.log(portafolio);
});
