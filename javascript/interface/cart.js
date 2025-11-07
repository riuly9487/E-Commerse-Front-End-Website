import { product } from "./product.js";
import { cart, updateToList } from "../storage.js";
import { toDecimal, toTotal, exportPaymentDescription } from "../math/calculate.js";

export function isEmpty() {
    document.querySelector('.website-title').innerHTML = 'This is not an error. There is nothing here in the cart.';
}

export function cartNotification() {
    let totalItem = cart.length;

    if (totalItem !== 0) {
        document.querySelector('.cart-notification').classList.add("isOn");
        document.querySelector('.cart-notification').innerHTML = totalItem;
    } else {
        document.querySelector('.cart-notification').classList.remove("isOn");
        document.querySelector('.cart-notification').innerHTML = "";
    }
}

export function exportCartList () {
    let html = `<div class="website-cart-title">
                    <div id="product">
                        Product
                    </div>
                    <div id="price">
                        Price
                    </div>
                    <div id="quantity">
                        Quantity
                    </div>
                    <div id="total">
                        Total
                    </div>
                    <div id="delete">
                        <!--I intentionally left this blank - Quah Wei Xiang 2025/11/06-->
                    </div>
                </div>`;

    cart.forEach((cart) => {

        let displayCart = product.at(cart.productId - 1);

        let displayPrice = displayCart.price;

        let todayDate = dayjs().format('dddd');
            
        if (todayDate == "Friday") {
            displayPrice = 350;
        }

        const getHTML = `
                <div class="website-cart-detail">
                    <div class="website-cart-product-detail">
                        <div class="website-cart-product-image">
                            <img class="cart-product-image" src="${displayCart.image}">
                        </div>
                        <div class="cart-product-name">
                            ${displayCart.name}
                        </div>
                    </div>
                    <div class="cart-product-price">
                        RM${toDecimal(displayPrice)}
                    </div>
                    <div class="cart-product-quantity">
                        ${cart.quantity}
                    </div>
                    <div class="cart-product-total-price">
                        RM${toTotal(displayPrice, cart.quantity)}
                    </div>
                    <div class="cart-product-delete">
                        <button class="btn-delete" data-id="${cart.cartId}">
                            Delete
                        </button>
                    </div>
                </div>
        `;
        html += getHTML;
    })

    document.querySelector('.website-interface-left-side').innerHTML = html;

    cartNotification();

    document.querySelectorAll('.btn-delete')
        .forEach((button) => {
            button.addEventListener('click', () => {
            const deleteId = button.dataset.id;
            updateToList(deleteId);
            cartNotification();
            exportPaymentDescription();
        })}
    )
};