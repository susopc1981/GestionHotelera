import { store } from "./scripts.js";

function findUserRoom(numroom) {
  const data = store.rooms.find((value) => value.idRoom === numroom);
  return data;
}

function findIndexRoomLeave(family, room, newroom) {
  const data = family.numRooms;
  const indexroom = data.indexOf(room);
  data.splice(indexroom, 1, newroom);
  return data;
}

function findDataFamily(id) {
  const data = store.clients.find((value) => value.idFamily === id);
  return data;
}

export { findUserRoom, findIndexRoomLeave, findDataFamily };
