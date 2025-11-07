import { product } from "../interface/product.js";
import { cart } from "../storage.js";

export function toDecimal(value) {
    let decimalNumber = Math.round(value, 2)
    return decimalNumber / 100
}

export function toTotal(value, quantity) {
    const productTotal = value * quantity;
    return toDecimal(productTotal)
}

export function isDiscounted(value) {
    if (value > 3000) {
        return "30%"
    } else {
        return "0%"
    }
}

export function isDiscountedPrice(value) {
    let discountedPrice = 0;

    if (value > 3000) {
        discountedPrice = (value / 100) * 30;
    }

    return toDecimal(discountedPrice)
}

export function finalPrice(value) {
    let discountedPrice = isDiscountedPrice(value);

    let requiredToPay = toDecimal(value) - discountedPrice;

    return requiredToPay
}

export function exportPaymentDescription() {
    let totalPrice = 0;

    let html = `<div id="payment-detail">
                    Payment Detail
                </div>`;

    cart.forEach((cart) => {

        let item = product.at(cart.productId - 1);

        let displayPrice = item.price;

        let todayDate = dayjs().format('dddd');
            
        if (todayDate == "Friday") {
            displayPrice = 350;
        }

        totalPrice += displayPrice * cart.quantity;
    })

    
    const getHTML = `
            <div class="cart-payment-description">
                <div class="cart-payment-total-price">
                <div>
                    Total Price:
                </div>
                <div>
                    RM${toDecimal(totalPrice)}
                </div>
                </div>
                <div class="cart-payment-discount-percentage">
                    <div>
                        Discount Percentage:
                    </div>
                    <div>
                        ${isDiscounted(totalPrice)}
                    </div>
                </div>
                <div class="cart-payment-total-discounted-price">
                <div>
                    Total Discounted Price:
                </div>
                <div>
                    RM${isDiscountedPrice(totalPrice)}
                </div>
                </div>
                <div class="cart-payment-final-price">
                    <div>
                        Final Price:
                    </div>
                    <div>
                        RM${finalPrice(totalPrice)}
                    </div>
                </div>
                <div class="cart-payment-checkout">
                    <a href="receipt.html">
                        <button class="btn-checkout">
                            Checkout
                        </button>
                    </a>
                </div>
            </div>
        `;
    html += getHTML;
        
    document.querySelector('.website-interface-right-side').innerHTML = html;
}
        