import { getRoom } from "./check-in.js";
import { checkDataRooms, changeStateRoom } from "./common-functions.js";
import {
  findUserRoom,
  findIndexRoomLeave,
  findDataFamily,
} from "./change-room-functions.js";

function changeRoom(numroom, requiredCapacity) {
  const data = findUserRoom(numroom);
  if (!data) return `La habitacion ${numroom} no existe`;
  if (data.guest === "") return `¡¡¡¡¡La habitacion ${numroom} está vacia!!!!!`;
  const idFamily = data.guest;
  if (!requiredCapacity) requiredCapacity = data.maxCapacity;
  const finalRooms = checkDataRooms(requiredCapacity); //Llama a la funcion para obtener la capacidad de la habitacion que quieren dejar
  const searchRoom = getRoom(finalRooms);
  if (searchRoom.length === 0)
    return "No hay habitaciones de esa capacidad libres";
  const dataFamily = findDataFamily(idFamily);
  const indexRoom = findIndexRoomLeave(dataFamily, numroom, searchRoom[0]);
  changeStateRoom(searchRoom, idFamily, "full"); // Cambia el estado de la habitacion nueva para ocupada
  changeStateRoom(numroom, idFamily, "empty"); // Cambia el estado de la habitacion antigua para libre
  return `Cambio de la habitacion ${numroom} para la ${searchRoom} realizado con éxito`;
}

export { changeRoom };
