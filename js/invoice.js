import { store } from "./scripts.js";

function showInvoice(dataFamily, checkOutDate) {
  const days = calculateDays(dataFamily.checkInDate, checkOutDate);
  let totalAmount = calculateAmount(dataFamily.idFamily, days);
  const getDiscount = applyDiscount(dataFamily);
  const totalWithoutIva = applyIva(totalAmount); //Llama a la funcion que aplica el iva y nos devuelve el valor del total sin iva
  if (getDiscount) {
    totalAmount = totalAmount - totalAmount * 0.1; //aplica el 10% de descuento si es cliente habitual
    return `Deben abonar la cantidad de ${totalAmount}€ equivalente a ${days} días de estancia en la(s) habitacion(es) ${dataFamily.numRooms.join(
      ", "
    )} con el descuento del 10% por ser cliente habitual ya reflejado en el total. Del total ${totalAmount}€, ${totalWithoutIva}€ corresponde al precio de la habitacion y ${
      totalAmount - totalWithoutIva
    }€ al IVA del ${store.iva.value} `;
  }
  return `Deben abonar la cantidad de ${totalAmount}€ equivalente a ${days} días de estancia en la(s) habitacion(es) ${dataFamily.numRooms.join(
    ", "
  )}. Del total ${totalAmount}€, ${totalWithoutIva}€ corresponde al precio de la habitacion y ${
    totalAmount - totalWithoutIva
  }€ al IVA del ${store.iva.value}`;
}

function applyIva(amount) {
  const data = Math.round(amount / store.iva.operator);
  return data;
}

function applyDiscount(dataFamily) {
  const data = store.historic.find(
    (value) => value.parent1.idCard === dataFamily.parent1.idCard
  );
  return data;
}

function calculateDays(checkInDate, checkOutDate) {
  let date1;
  checkOutDate ? (date1 = new Date(checkOutDate)) : (date1 = new Date());
  const date2 = new Date(checkInDate);
  const sustractDays = date1.getTime() - date2.getTime();
  const days = Math.round(sustractDays / (1000 * 60 * 60 * 24) - 1);
  if (days === 0) days = 1;
  return days;
}

function calculateAmount(idFamily, days) {
  let totalAmount = 0;
  store.rooms.forEach((value) => {
    if (idFamily === value.guest) {
      totalAmount = totalAmount + value.price * days;
    }
  });
  return totalAmount;
}

export { showInvoice };
