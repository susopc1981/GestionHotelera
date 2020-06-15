import { store } from "./scripts.js";
import { changeStateRoom } from "./common-functions.js";
import { showInvoice } from "./invoice.js";

function checkOut(idFamily) {
  const data = getDataFamily(idFamily); // Llama a la funcion que te devuelve todos los datos de la familia
  if (data === undefined) return "No hay ninguna familia con esa id";
  const dataindex = store.clients.indexOf(data); // Busca el indice de la familia en la base de datos
  const invoice = showInvoice(data);
  changeStateRoom(data.numRooms, data.idFamily, 2); // Cambia el estado de las habitaciones de ocupadas a libres
  store.clients.splice(dataindex, 1);
  return `Check out completado. ${invoice}`;
}

function getDataFamily(id) {
  const data = store.clients.find((value) => value.idFamily === id);
  return data;
}

export { checkOut };
