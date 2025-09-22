console.clear();


// Update badge from localStorage cart
let cart = JSON.parse(localStorage.getItem('cart') || '{}');
let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
if(document.getElementById("badge")) document.getElementById("badge").innerHTML = totalItems;


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART (with quantity)
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: ₦' + (ob.price * itemCounter));
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);
    return cartContainer;
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    let totalh4Text = document.createTextNode('Amount: ₦' + amount);
    totalh4Text.id = 'toth4';
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    console.log("clicked")
}  
//dynamicCartSection()
// console.log(dynamicCartSection());


// Fetch products from backend and render cart
fetch('http://localhost:4000/api/products')
    .then(res => res.json())
    .then(products => {
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
        if(document.getElementById("totalItem")) document.getElementById("totalItem").innerHTML = ('Total Items: ' + totalItems);
        let totalAmount = 0;
        Object.keys(cart).forEach(id => {
            let prod = products.find(p => String(p.id) === String(id));
            if(prod) {
                let qty = cart[id];
                totalAmount += Number(prod.price) * qty;
                dynamicCartSection(prod, qty);
            }
        });
        amountUpdate(totalAmount);
    })
    .catch(() => {
        // fallback: show nothing or error
    });




