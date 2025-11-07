import { exportCartList } from "./interface/cart.js";

export let cart; 

loadFromStorage();

function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'))

  if (!cart) {
    cart = [{
        cartId: 1,
        productId: 1,
        quantity: 1,
    }];
  }
  
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateToList(value) {
  const newList = [];
  
  let i = 1;
  cart.forEach((cart, index) => {
    if (index + 1 !== Number(value)) {
      newList.push({
        cartId: i,
        productId: cart.productId,
        quantity: cart.quantity,
      });
      i++
    }
  })

  cart.length = 0;
  newList.forEach((item) => 
    cart.push(item));
  
  saveToStorage();
  exportCartList();
}

export function resetCart() {
  cart = [];
  saveToStorage();
}

