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
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total; //updates total
}