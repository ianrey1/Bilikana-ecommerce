// open and close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

// start when document is ready
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start()
}






// start
function start() {
    addEvents();
}

// update and rerender
function update() {
    addEvents();
    updateTotal();
}

// add events
function addEvents() {
    // remove items
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // buy order 
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

// handle events functions
let itemsAdded = []
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price= product.querySelector(".product-price").innerHTML;
    let imgSrc= product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already use
    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This Item is Already Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    // add product to cart

    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart. querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
       (el) => 
        el.title != 
        this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);// keep integer

    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0){
        alert("There is No Order to Place Yet! \n Please Make an Order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("You Order is Placed Successfully ");
    itemsAdded = [];

    update();
}




// update and rerender functions 

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    //keep 2 digits after the decimal point

    tota = total.toFixed(2);
    //or you can use also
    // total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;
}





// html components
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- remove cart -->
        <i class='bx bxs-trash-alt cart-remove' ></i>
    </div>`
}







function validateSignUp() {
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var checkbox = document.getElementById('checkbox');

    if (username.trim() === '' || name.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!checkbox.checked) {
        alert('Please agree to the Terms & Conditions.');
        return;
    }

    // If all validations pass, you can submit the form or perform other actions.
    alert('Sign Up Successful!');
    // Uncomment the line below to submit the form
    // document.getElementById('signupForm').submit();
}








// signin

function switchForm(className, e) {
	e.preventDefault();
	const allForm = document.querySelectorAll('form');
	const form = document.querySelector(`form.${className}`);

	allForm.forEach(item=> {
		item.classList.remove('active');
	})
	form.classList.add('active');
}


const registerPassword = document.querySelector('form.register #password');
const registerConfirmPassword = document.querySelector('form.register #confirm-pass');

registerPassword.addEventListener('input', function () {
	registerConfirmPassword.pattern = `${this.value}`;
})




