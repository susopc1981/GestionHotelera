import { store } from "./scripts.js";

function checkEmptyRoom(idRoom) {
  const data = store.rooms.find((value) => value.idRoom === idRoom);
  data.guest === "" ? true : false;
}

function changeStateRoom(finalrooms, idfamily, option) {
  let newrooms = [];
  if (typeof finalrooms !== "object") newrooms.push(finalrooms);
  else newrooms = finalrooms;
  newrooms.forEach((value) => {
    const roomindex = store.rooms.findIndex(
      (value2) => value2.idRoom === value
    );
    if (option === "full") store.rooms[roomindex].guest = idfamily;
    else store.rooms[roomindex].guest = "";
  });
}

function totalEmptyRooms() {
  const data = store.rooms.filter((value) => value.guest === "");
  return data;
}

function checkDataRooms(finalrooms) {
  const newroom = [];
  let data = true;
  if (typeof finalrooms === "number") {
    newroom.push(finalrooms);
    finalrooms = newroom;
  }
  if (typeof finalrooms !== "object") return false;

  finalrooms.forEach((value) => {
    if (typeof value !== "number") data = false;
  });
  if (!data) return false;
  return finalrooms;
}

export { checkEmptyRoom, changeStateRoom, totalEmptyRooms, checkDataRooms };
