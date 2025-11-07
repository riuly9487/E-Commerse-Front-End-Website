import { product } from "./product.js";
import { cartNotification } from "./cart.js";
import { toDecimal } from "../math/calculate.js";
import { saveToStorage } from "../storage.js";
import { cart } from "../storage.js";

export function exportMenuList () {
    let html = "";

    product.forEach((product) => {
    
    let displayPrice = product.price;

    let todayDate = dayjs().format('dddd');
        
    if (todayDate == "Friday") {
        displayPrice = 350;
    }

    const getHTML = `
            <div class="product-menu product-${product.id}">
                <img class="product-image" src="${product.image}">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        RM${toDecimal(displayPrice)}
                    </div>
                    <div class="product-add-to-cart">
                        <button class="btn-add-to-cart" data-id="${product.id}"> 
                            Add to Cart 
                        </button>
                    </div>
                </div>
    `;  
    html += getHTML;
    })

    document.querySelector(".website-menu").innerHTML = html;
    cartNotification();

    document.querySelectorAll('.btn-add-to-cart')
        .forEach((button) => {
            button.addEventListener('click', () => {
            let buttonid = button.dataset.id;
            console.log(buttonid)
            let existingItem = cart.find(
                cart => buttonid == cart.productId
            );
    
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                let newItem = {
                    cartId: cart.length + 1,
                    productId: Number(buttonid),
                    quantity: 1,
                };
                cart.push(newItem);
            }
            saveToStorage();
            cartNotification();
        })}
    )

}

