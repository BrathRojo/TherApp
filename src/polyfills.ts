/***************************************************************************************************
 * POLYFILLS PARA SOPORTE DE COMPATIBILIDAD
 */

// Requerido para Angular
import 'zone.js'; 

// Fix para SockJS si es necesario
(window as any).global = window;
