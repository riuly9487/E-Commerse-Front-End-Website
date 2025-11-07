import { product } from "./product.js";
import { cart, resetCart } from "../storage.js";
import { toDecimal, toTotal, isDiscounted, isDiscountedPrice, finalPrice } from "../math/calculate.js";

export function exportReceiptList () {
    let receiptDate = dayjs().format('YYYY-MM-DD-HH-mm-ss-a');

    let html = `<div class="receipt-company-name">
                    Frezy Cafe
                </div>
                <div class="receipt-company-owner">
                    Quah_Wei_Xiang_298464 Sdn Bhd
                </div>
                <div class="receipt-company-location">
                    
                </div>
                <div class="receipt-order-time">
                    <div>
                        Order Time:
                    </div>
                    <div>
                        ${receiptDate}
                    </div>
                </div>
                <div class="receipt-reference-number">
                    <div>
                        Receipt Number:
                    </div>
                    <div>
                        FC0${cart.length}
                    </div>
                </div>
                <div style="margin-bottom: 8px;">
                    Product detail
                </div>`;

    let htmlProductDetail = `
                    <div class="receipt-product-name">
                        Name
                    </div>
                    <div class="receipt-product-price">
                        Price
                    </div>
                    <div class="receipt-product-quantity">
                        Quantity
                    </div>
                    <div class="receipt-product-total">
                        Total
                    </div>`;

    cart.forEach((cart) => {

        let displayCart = product.at(cart.productId - 1);

        let displayPrice = displayCart.price;

        let todayDate = dayjs().format('dddd');
            
        if (todayDate == "Friday") {
            displayPrice = 350;
        }

        const getHTML = `
                    <div class="receipt-product-name">
                        ${displayCart.name}
                    </div>
                    <div class="receipt-product-price">
                        RM${toDecimal(displayPrice)}
                    </div>
                    <div class="receipt-product-quantity">
                        ${cart.quantity}
                    </div>
                    <div class="receipt-product-total">
                        RM${toTotal(displayPrice, cart.quantity)}
                    </div>
        `;
        htmlProductDetail += getHTML;
    })

    let productHTML = `<div class="receipt-product-detail">` + htmlProductDetail + `</div>`;

    html += productHTML;

    let totalPrice = 0;

    cart.forEach((cart) => {

        let item = product.at(cart.productId - 1);

        let displayPrice = item.price;

        let todayDate = dayjs().format('dddd');
            
        if (todayDate == "Friday") {
            displayPrice = 350;
        }
        
        totalPrice += displayPrice * cart.quantity;
    })

    const htmlPaymentDetail = `
            <div class="receipt-total-price">
                <div>
                    Total Price:
                </div>
                <div>
                    RM${toDecimal(totalPrice)}
                </div>
            </div>
            <div class="receipt-discounted-price">
                <div>
                    Discount Percentage:
                </div>
                <div>
                    ${isDiscounted(totalPrice)}
                </div>
            </div>
            <div class="receipt-total-discounted-price">
                <div>
                    Total Discounted Price:
                </div>
                <div>
                    RM${isDiscountedPrice(totalPrice)}
                </div>
            </div>
            <div class="receipt-final-price">
                <div>
                    Final Price:
                </div>
                <div>
                        RM${finalPrice(totalPrice)}
                </div>
            </div>
        `;

    html += htmlPaymentDetail;

    const htmlFooter = `<div class="receipt-terima-kasih">
                            <span>Please rate our services to improve our quality.</span>
                            <span>Your Opinion truly matters to us</span>
                        </div>
                        <div class="receipt-qr-code-section">
                            <div>
                                <img class="receipt-qr-code" src="images/qrcode.png">
                            </div>
                            <div class="receipt-disclaimer">
                                <span>(The QR Code is for placeholder purposes.)</span>
                                <span>(Please do not scan it, it won't lead anywhere.)</span>
                            </div>
                        </div>
                        <div class="assignment-declaration">
                            <span>A251 Group A SCCVK3013</span> 
                            <span>WWW PROGRAMMING Individual Assignment 1</span>
                        </div>`;

    html += htmlFooter

    document.querySelector('.website-receipt-interface').innerHTML = html;
    resetCart();
};