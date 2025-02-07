/***************************************************************************************************
 * POLYFILLS PARA SOPORTE DE COMPATIBILIDAD
 */

// Requerido para Angular
import 'zone.js'; 

// Fix para SockJS si es necesario
(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
(global as any).process = require('process/browser');
