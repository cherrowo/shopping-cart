if (document.readyState == 'loading'){ // if body isn't loaded before JS, script won't run
    document.addEventListener('DOMContentLoaded', ready); //fires as soon as page is done loading
} else {
    ready(); //if already loaded, same function runs
}

function ready() {
    var removeCartItemBtn = document.getElementsByClassName('btn-danger'); // red button is remove
    console.log(removeCartItemBtn);

    for (var i = 0; i < removeCartItemBtn.length; i++){ // iterates through each button
        var button = removeCartItemBtn[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)//waits for value to change
    }

    var addBtns = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addBtns.length; i++){
        var btn = addBtns[i];
        btn.addEventListener('click', addToCartClicked)
    }

    var purchasebtn = document.getElementsByClassName('btn-purchase')[0];
    purchasebtn.addEventListener('click', purchaseComplete)

}

function purchaseComplete() {
    alert('Thank you for purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }//empties cart
    updateTotal();
}

function addToCartClicked(event){//gets information from the element
    var btn = event.target;
    var shopItem = btn.parentElement.parentElement;
    var itemName = shopItem.getElementsByClassName('shop-item-title')[0].innerText; //only want one variable
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(itemName, price, imagesrc);
    addItemToCart(itemName, price, imagesrc); //creates new item in cart
    updateTotal();
}

function addItemToCart(itemName, price, imagesrc){
    var cartRow = document.createElement('div'); //creates div element, not added to HTML yet
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var existingCartItems = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < existingCartItems.length; i++){
        if (existingCartItems[i].innerText == itemName){
            alert('Item already in cart');
            return; //exits from function, meaning remaining code doesn/t execute;
        }
    }
    var cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
            <span class="cart-item-title">${itemName}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow); // adds empty div to cart
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);//because this button did not yet exist when HTML was loaded, need to add event listener
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);//same for quantity
}

function quantityChanged(event){
    var input = event.target; //input element
    if (isNaN(input.value) || input.value <= 0){// is not a number (isNaN) checks input value and makes sure at least 1 item is ordered
        input.value = 1;
    }
    updateTotal(); //updates each time quantity changed
}

function removeCartItem(event) {
    var clickedBtn = event.target;
    clickedBtn.parentElement.parentElement.remove();  // first parent is quantity column, second parent is the entire item row
    updateTotal(); //each time something is removed, updates total
}

function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //getElementsByClassName returns an array, and in this situation we only need one element
    var cartRows = cartItemContainer.getElementsByClassName('cart-row'); //using method on object only gets elemts in object
    var total = 0;
    for (var i =0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var elementPrice = cartRow.getElementsByClassName('cart-price')[0]; //here we only need one item again
        var elementQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]; //here too
        var price = parseFloat(elementPrice.innerText.replace('$','')); //returns text inside element, .replace takes out $, and parseFloat converts into float
        var quantity = elementQuantity.value; //inputs don't have inner text, so we need value property
        total += (price * quantity); // adds to total
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2); //updates total, .toFixed keeps the numbers from getting too funky
}