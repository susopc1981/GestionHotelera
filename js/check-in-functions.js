import { store } from "./scripts.js";

function newId() {
  const totalusers = store.clients.length - 1;
  const id = store.clients[totalusers].idFamily + 1;
  return id;
}

function newDataFamily() {
  const data = {
    idFamily: "",
    parent1: { idCard: "12345678A", name: "Juan Perez", age: 33 },
    parent2: { idCard: "12345678B", name: "Bibiana Fernandez", age: 34 },
    children: [
      { idCard: "", name: "Lionel Messi", age: "3" },
      { idCard: "", name: "Luis Suarez", age: "12" },
    ],
    tlf: "676767676",
    numRooms: [],
    checkInDate: "",
  };
  const id = newId();
  data.idFamily = id;
  data.checkInDate = formatDate(new Date());
  return data;
}

function formatDate(date) {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  const newDate = `${year}/${month}/${day}`;
  return newDate;
}

export { newDataFamily };
