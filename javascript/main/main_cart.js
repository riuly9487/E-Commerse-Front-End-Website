import { isEmpty, exportCartList } from "../interface/cart.js";
import { exportPaymentDescription } from "../math/calculate.js";
import { cart } from "../storage.js";

console.log(cart.length)

if (cart.length == 0) {
    isEmpty();
} else {
    exportCartList();
    exportPaymentDescription();
}