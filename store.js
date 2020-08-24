var removeCartItemBtn = document.getElementsByClassName('btn-danger');
console.log(removeCartItemBtn);
for (var i = 0; i < removeCartItemBtn.length; i++){
    var button = removeCartItemBtn[i];
    button.addEventListener('click', function(){
        console.log('clicked');
    });
}