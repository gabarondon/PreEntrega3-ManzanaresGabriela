let userName='';
let userContact='';
let choiceCart='';
let choiceCartArray =[];
let userArray = [];
let suplement;

class User {
    constructor(name,contact){
        this.name = name;
        this.contact = contact; 
    }
}
class Supplement {
    constructor(name, price, stock){
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    sell(mount) {
        if (mount <= this.stock) {
        this.stock = this.stock - mount;
        return this.price * mount;
        } else {
        return "Sin stock";
        }
    }
}

/*Events */


// Strawberry
window.addEventListener('load', createStock);
let buttonCollagenStrawLem = document.getElementById('Strawberry🍓-Lemonade🍋');
buttonCollagenStrawLem.addEventListener('click', updateStock);
// CaramelMacchiato
let buttonCollagenCaraMacc = document.getElementById('CaramelMacchiato🍮');
buttonCollagenCaraMacc.addEventListener('click', updateStock);
// Chocolate
let buttonCollagenChoc = document.getElementById('Chocolate🍫');
buttonCollagenChoc.addEventListener('click', updateStock);
// Cart
let aShowCart = document.getElementById('aShowCart');
aShowCart.addEventListener('click',showCart);
// Plus Button
let btnPlus = document.getElementsByClassName('plus-btn');
for(let i = 0; i < btnPlus.length; i++){
    btnPlus[i].addEventListener('click', plusSuplement);
}
//Minus Button
let btnMinus = document.getElementsByClassName('minus-btn');
for(let i = 0; i < btnMinus.length; i++){
    btnMinus[i].addEventListener('click', minusSuplement);
}

//Functions
function showCart(){
    const navShoppingCard = document.getElementById('navShoppingCard');
    navShoppingCard.classList.toggle('hide');
    const cart = getCart();
    const navTotalItems = document.getElementById('navTotalItems');
    const navTotalPrice = document.getElementById('navTotalPrice');
    const ulShoppingCard = document.getElementById('ulShoppingCard');
    const totalCart = cart.reduce((acumulator, currentValue)=> acumulator + currentValue.total, 0)??0;
    const totalItems = cart.reduce((acumulator, currentValue)=> acumulator + currentValue.quantity, 0)??0;
    let liShoppingCart = '';

    for(cartItem in cart){
        let liItem = `<li class="clearfix">
        <span class="item-name">${cart[cartItem].name}</span>
        <span class="item-price">$ ${cart[cartItem].total}</span>
        <span class="item-quantity">Quantity: ${cart[cartItem].quantity}</span>
      </li>`;

      liShoppingCart = liShoppingCart + liItem;
    }

    navTotalPrice.innerHTML = '$' + totalCart;
    navTotalItems.innerHTML = totalItems;
    ulShoppingCard.innerHTML = liShoppingCart;
}

function nameContact (userName, userContact) {
    let user= userArray.find(element=>element.name==userName||element.contact==userContact); 
    if (!user){
    userArray.push (new User(userName, userContact));
    }
    alert ('Gracias por tu compra '+ '' + userName + ' te contactaremos al '+ '' + userContact + '' + 'cuando tu pedido esté en camino.'); 
}

function payment () {
    alert ('Esta es la cantidad a pagar ' + totalCart);

    userName=prompt ('Para finalizar la compra ingresa tu nombre:');

    userContact=prompt ('También ingresa tu número de whatsapp para contactarte:');

    nameContact (userName, userContact);

}

function createStock(){
    let stock = getStock();
    if(stock) return;

    const proteins = generateStock(['Cookies and cream🍪.', 'Fresa🍓', 'Chocolate🍫'],50, 5);
    const pills = generateStock(['Fit9', 'Restore'],58, 4);
    const collagens = generateStock(['Strawberry🍓-Lemonade🍋', 'CaramelMacchiato🍮', 'Chocolate🍫'],60, 10);
    stock = proteins.concat(pills, collagens);

    localStorage.setItem('stock', JSON.stringify(stock));
}

function updateStock(event){
    const id = event.currentTarget.id;
    const stock = getStock();
    const cart = getCart();
    const input = document.getElementById('inp'+id);
    let suplement = stock.findIndex(sup => sup.name == id);
    let suplementCart = cart.findIndex(sup => sup.name == id);
    let totalCart = 0;
    let totalQuantity = 0;
    let inputValue = parseInt(input.value)??0;
    if(suplementCart !=-1){
        totalCart = cart[suplementCart].total;
        totalQuantity = cart[suplementCart].quantity;
    }

    if(stock[suplement].sell(1) == 'Sin stock'){
        alert('Sin stock');
    }
    else{
        //alert(suplement.name + ' $'+suplement.price + ' , agregado al carrito ✅');


        totalCart= totalCart+(stock[suplement].price*inputValue);
        totalQuantity= totalQuantity+inputValue;
        if(suplementCart === -1){
            cart.push({name:stock[suplement].name,total:totalCart,quantity:totalQuantity});
        }
        else{
            cart[suplementCart] = {name:stock[suplement].name,total:totalCart,quantity:totalQuantity};
        }
        
        updateLocal(cart,stock);

        showHideToast();
        setTimeout(showHideToast, 3000);
    } 
}

function generateStock(flavors, price, stock){
    let arrayResult = [];
    for(let flavor in flavors){
        arrayResult.push(new Supplement(flavors[flavor],price,stock));
    }

    return arrayResult;
}

function getStock(){
    const stock = JSON.parse(localStorage.getItem('stock'));
    if(!stock) return stock;
    let stockResult = stock.map(function(obj){return new Supplement(obj.name,obj.price,obj.stock)});
    return stockResult;
}

function getCart(){
    const stock = JSON.parse(localStorage.getItem('cart'))??[];
    
    return stock;
}

function updateLocal(cart, stock){
    localStorage.setItem('stock', JSON.stringify(stock));
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showHideToast(){
    const toast = document.getElementById('toast');
    toast.classList.toggle('hide');
}

function plusSuplement(event){
    const currentTarget = event.currentTarget;    
    const input = currentTarget.closest(':not(button)').children[1];
    let value = parseInt(input.value)??0;

    value = value + 1;

    input.value = value;

}

function minusSuplement(event){
    const currentTarget = event.currentTarget;    
    const input = currentTarget.closest(':not(button)').children[1];
    let value = parseInt(input.value)??0;

    if(value !=0 )
        value = value - 1;

    input.value = value;

}

