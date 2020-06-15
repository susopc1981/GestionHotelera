import { store } from "./scripts.js";
import {
  changeStateRoom,
  totalEmptyRooms,
  checkDataRooms,
} from "./common-functions.js";
import { newDataFamily } from "./check-in-functions.js";

function checkIn(nrooms) {
  const newUser = newDataFamily(); //Obtiene los datos de la familia
  const correctData = checkDataRooms(nrooms);
  if (!correctData) return "El dato introducido en habitaciones no es correcto";
  const emptyRooms = getRoom(correctData); //Busca una o varias habitaciones libres
  if (emptyRooms.length === 0 || emptyRooms.length !== correctData.length) {
    console.log(totalEmptyRooms());
    return "No hay posibilidades con esa combinacion de habitaciones y capacidad";
  }
  const dataFamilyFinal = { ...newUser, numRooms: emptyRooms };
  changeStateRoom(emptyRooms, newUser.idFamily, "full");
  store.clients.push(dataFamilyFinal);
  return dataFamilyFinal;
}

//Busca habitaciones libres segun la capacidad maxima que le envíes
function getRoom(arr) {
  const emptyRooms = [];
  arr.forEach((arrvalue) => {
    const data = store.rooms.find((datavalue2) => {
      const checkRoom = emptyRooms.indexOf(datavalue2.idRoom);
      if (
        datavalue2.guest === "" &&
        datavalue2.maxCapacity === arrvalue &&
        checkRoom === -1 &&
        arr.length > emptyRooms.length
      ) {
        return datavalue2.idRoom;
      }
    });
    if (data) emptyRooms.push(data.idRoom);
  });
  return emptyRooms;
}

export { getRoom, checkIn };
