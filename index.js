//This if...else statement checks to see if the page is done loading.
if (document.readyState == 'loading') {
    // If the still loading then it will load the code in this line of code below.
    document.addEventListener('DOMContentLoaded', ready)
} else {
    // Call the 'ready' function if the code is already done loading.
    ready()
}

//This function will enable the buttons on the web page, even if the page has not already loaded yet.
//It will wait for the 'DOMContentLoaded' to be loaded before it is ready to be called.
function ready() {
    // This for code targets the remove buttons.
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
    }
    //This for code updates the total quantity price of each item.
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //This for code adds ietms to the cart list.
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

//This function will enable the remove buttons to delete the items from the cart.
function removeCartItem(event) {
    let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        // Call the updateCartTotal function
        updateCartTotal()
}

//This code updates the total quantity price of each item.
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//This function adds itemss to the cart list.
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(title, price)
    addItemToCart(title, price)
    //Call the updateCartTotal function.
    updateCartTotal()
}

// This function adds the item to the cart.
function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('You have already added this item to the cart')
            return
        }
    }
    let cartRowContents = `
    <div class="cart-item cart-column">
    <!-- <img class="cart-item-image" src="Images/Shirt.png" width="100" height="100"> -->
    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <!-- This line of code allows the user to place a class with a quantity number input -->
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">Remove</button>
    </div>
`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// This function will update the total cost of the cart everytime an item is removed and added
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

