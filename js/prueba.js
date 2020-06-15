const store = {
  clients: [
    {
      idFamily: 1,
      parent1: { idCard: "32456333C", name: "Carlos Gonzalez", age: 18 },
      adults: [{ idCard: "12345678R", name: "Juan XXIII", age: 28 }],
      children: [
        { idCard: "32456333D", name: "Pablo", age: 7 },
        { idCard: "32456333E", name: "Juan XXIV", age: 12 },
      ],
      tlf: "666555444",
      numRooms: [102],
      checkInDate: "2020/06/07",
    },
    {
      idFamily: 2,
      parent1: { idCard: "32456333F", name: "Andres Montes", age: 18 },
      adults: [],
      children: [
        { idCard: "32456333H", name: "Jorge", age: 2 },
        { idCard: "32456333I", name: "Ana", age: 12 },
      ],
      tlf: "678333121",
      numRooms: [303, 304],
      checkInDate: "2020/06/01",
    },
    {
      idFamily: 3,
      parent1: { idCard: "32456333J", name: "Sofía Martinez", age: 18 },
      adults: [{ idCard: "32456333K", name: "Juana daPaña", age: 28 }],
      children: [{ idCard: "32456333L", name: "Jose", age: 12 }],
      tlf: "655723111",
      numRooms: [101, 103],
      checkInDate: "2020/05/01",
    },
    {
      idFamily: 4,
      parent1: { idCard: "32456333M", name: "Jose Antonio", age: 18 },
      adults: [{ idCard: "32456333N", name: "Pedro Duque", age: 28 }],
      children: [
        { idCard: "32456333O", name: "Javier", age: 7 },
        { idCard: "32456333P", name: "David", age: 12 },
        { idCard: "32456333Q", name: "Andreita", age: 7 },
      ],
      tlf: "981224385",
      numRooms: [201, 202],
      checkInDate: "2020/06/05",
    },
  ],
  rooms: [
    { idRoom: 101, maxCapacity: 1, price: 50, guest: 3 },
    { idRoom: 102, maxCapacity: 4, price: 150, guest: 1 },
    { idRoom: 103, maxCapacity: 2, price: 110, guest: 3 },
    { idRoom: 104, maxCapacity: 2, price: 100, guest: "" },
    { idRoom: 201, maxCapacity: 2, price: 150, guest: 4 },
    { idRoom: 202, maxCapacity: 3, price: 200, guest: 4 },
    { idRoom: 301, maxCapacity: 1, price: 50, guest: "" },
    { idRoom: 302, maxCapacity: 4, price: 150, guest: "" },
    { idRoom: 303, maxCapacity: 2, price: 110, guest: 2 },
    { idRoom: 304, maxCapacity: 2, price: 100, guest: 2 },
    { idRoom: 401, maxCapacity: 2, price: 150, guest: "" },
    { idRoom: 402, maxCapacity: 3, price: 200, guest: "" },
  ],
};

function calculateRooms(objFamily) {
  const users = calculateUsersFamily(objFamily);
  const finalRooms = [];
  let tempRoom;
  let usersWithoutRoom = users;
  for (i = 1; (i = users); i++) {
    let maxCap = 0;
    store.rooms.forEach((value) => {
      const isfree = finalRooms.indexOf(value.idRoom);
      if (usersWithoutRoom > maxCap) {
        if (value.maxCapacity > maxCap && value.guest === "" && isfree === -1) {
          maxCap = value.maxCapacity;
          tempRoom = value.idRoom;
        }
      }
      if (
        usersWithoutRoom === value.maxCapacity &&
        value.guest === "" &&
        isfree === -1
      ) {
        maxCap = value.maxCapacity;
        tempRoom = value.idRoom;
        return;
      }
    });
    finalRooms.push(tempRoom);
    usersWithoutRoom = usersWithoutRoom - maxCap;
    if (usersWithoutRoom < 1) break;
  }
  return finalRooms;
}

function calculateUsersFamily(objFamily) {
  let totalUsers;
  const adults = objFamily.adults.length;
  const totalChildren = objFamily.children.filter((value) => value.age > 3);
  const children = totalChildren.length;
  totalUsers = adults + children + 1;
  return totalUsers;
}

function checkIn(nrooms) {
  if (nrooms === undefined) nrooms = 1;
  const newUser = newDataFamily(); //Obtiene los datos de la familia
  if (typeof nrooms === "number") {
    nrooms = calculateRooms(newUser);
  }
  let correctData = checkDataRooms(nrooms);
  if (!correctData) return "El dato introducido en habitaciones no es correcto";
  let emptyRooms = getRoom(correctData); //Busca una o varias habitaciones libres
  if (emptyRooms.length === 0 || emptyRooms.length !== correctData.length) {
    correctData = calculateRooms(newUser);
    return `No hay posibilidades con esa combinacion de habitaciones y capacidad, la aternativa serían las habitaciones ${correctData.join(
      ", "
    )}`;
  }
  const finalRooms = getRoom(correctData);
  const dataFamilyFinal = { ...newUser, numRooms: finalRooms };
  changeStateRoom(finalRooms, newUser.idFamily, "full");
  store.clients.push(dataFamilyFinal);
  return dataFamilyFinal;
}

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

function newId() {
  const totalusers = store.clients.length - 1;
  const id = store.clients[totalusers].idFamily + 1;
  return id;
}

function newDataFamily() {
  const data = {
    idFamily: "",
    parent1: { idCard: "12345678A", name: "Juan Perez", age: 33 },
    adults: [
      { idCard: "12345678B", name: "Bibiana Fernandez", age: 34 },
      { idCard: "12315678B", name: "Angela Perez", age: 34 },
    ],
    children: [
      { idCard: "", name: "Lionel Messi", age: "2" },
      { idCard: "", name: "Luis Suarez", age: "12" },
      { idCard: "", name: "Lionel Messi", age: "4" },
      { idCard: "", name: "Luis Suarez", age: "12" },
      { idCard: "", name: "Lionel Messi", age: "3" },
      { idCard: "", name: "Luis Suarez", age: "12" },
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

function checkDataRooms(finalrooms) {
  let data = true;
  if (typeof finalrooms !== "object") return false;

  finalrooms.forEach((value) => {
    if (typeof value !== "number") data = false;
  });
  if (!data) return false;
  return finalrooms;
}

function changeStateRoom(finalrooms, idfamily, option) {
  // let newrooms = [];
  // if (typeof finalrooms !== "object") newrooms.push(finalrooms);
  // else
  // newrooms = finalrooms;
  finalrooms.forEach((value) => {
    const roomindex = store.rooms.findIndex(
      (value2) => value2.idRoom === value
    );
    if (option === "full") store.rooms[roomindex].guest = idfamily;
    else store.rooms[roomindex].guest = "";
  });
}
console.log(checkIn([2, 2]));
