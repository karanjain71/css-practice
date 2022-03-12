'use strict'

// Declaring the variables
var currentItems = 0;
var cartTotal = 0;
var imageNumber = 0;
var modalOpened = 0;
var cartModalOpened = 0;

// Selecting using the query selector
const plusIcon = document.querySelector('.icon-plus')
const minusIcon = document.querySelector('.icon-minus')
const items = document.querySelector('.current-items')
const addToCart = document.querySelector('.add-to-cart')
const description = document.querySelector('.description')
const header = document.querySelector('.header')
const zoomed = document.querySelector('.zoomed')
const wholeBody = document.querySelector('body')
const closeIcon = document.querySelector('.close-icon')
const nextIcon = document.querySelector('.next-icon')
const previousIcon = document.querySelector('.previous-icon')
const zoomedImage = document.querySelector('.zoomed-main-image')
const thumbnailImages = document.querySelectorAll('.thumbnail-image')
const zoomedThumbnailImages = document.querySelectorAll('.zoomed-thumbnail-image')
const profileImage = document.querySelector('.profile-image')
const cart = document.querySelector('.cart')
const cartPrice = document.querySelector('.cart-price')
const cartItems = document.querySelector('.cart-items')
const cartButton = document.querySelector('.cart-button')
const cartSize = document.querySelector('.cart-size')
// Writing the addEventListener functions

console.log(cart)
console.log(cartTotal,'This is the cart total')
const increaseCount = () => {
    currentItems++;
    items.textContent = currentItems
}
const decreaseCount = () => {
    if(currentItems>0)
        currentItems--;
    items.textContent = currentItems
}

const nextImage = () => {
    imageNumber++;
    if(imageNumber>3){
        imageNumber=0
    }

    zoomedImage.src = `images/image-product-${imageNumber+1}.jpg`
    changeImageClass()
}
const previousImage = () => {
    imageNumber--;
    if(imageNumber<0){
        imageNumber=3
    }
    zoomedImage.src = `images/image-product-${imageNumber+1}.jpg`
    changeImageClass()
}
   
const closeModal = () => {
    zoomed.classList.add('hidden')
    header.classList.remove('blurred')
    description.classList.remove('blurred')
    for(var item=0; item<thumbnailImages.length;item++){
        thumbnailImages[item].classList.remove('active')
        zoomedThumbnailImages[item].classList.remove('active')
    }
    modalOpened = 0
}

const changeImageClass = () => {
    for(var item=0; item<zoomedThumbnailImages.length;item++){
        zoomedThumbnailImages[item].classList.remove('active')
    }
    for(var item=0; item<thumbnailImages.length;item++){
        thumbnailImages[item].classList.remove('active')
    }
    thumbnailImages[imageNumber].classList.add('active')
    zoomedThumbnailImages[imageNumber].classList.add('active')
}
const openModal = () => {
    zoomed.classList.remove('hidden')
    header.classList.add('blurred')
    description.classList.add('blurred')
    modalOpened=1
}
const changeCartContent = () => {
    if(!cartTotal){
        cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`
        cartButton.classList.add('hidden')
    }
    else{
        if(cartButton.classList.contains('hidden')){
            cartButton.classList.remove('hidden')
        }  
        cartItems.innerHTML = `
                <img src="images/image-product-1-thumbnail.jpg" class="cart-item item-image"></img>
                <div class="cart-item item-desc">
                    <p class="item-name">
                    Fall Limited Edition Sneakers
                    </p>
                    <p class="cart-price">
                    $125.00 x ${cartTotal} <span> $${cartTotal*125}.00
                    </p>
                </div>
                <img src="images/icon-delete.svg" alt="" class="cart-item-remove">`
    }
}
const updateCartValue = () => {
    if(cartTotal){
        cartSize.classList.remove('hidden')
    }
    cartSize.innerHTML = cartTotal
}

const toggleCartModal = () => {
    cartModalOpened=!cartModalOpened;
    console.log('This is the cartModal',cartModalOpened)
    console.log(cart.classList)
    if(cartModalOpened){
        cart.classList.remove('hidden')
        profileImage.classList.add('cart-active')
        
    }
    else {
        cart.classList.add('hidden')
        profileImage.classList.remove('cart-active')
    }
    changeCartContent()

}

const closeCartModal = () => {
    cartModalOpened=0;
}
const addToCartFunction = () => {
    cartTotal+=currentItems;
    console.log(cartTotal)
    currentItems=0; 
    items.textContent = currentItems
    console.log(cartPrice)
    changeCartContent()   
    updateCartValue() 
    // cartItems.innerHTML = `
    //             <img src="images/image-product-1-thumbnail.jpg" class="cart-item item-image"></img>
    //             <div class="cart-item item-desc">
    //                 <p class="item-name">
    //                 Fall Limited Edition Sneakers
    //                 </p>
    //                 <p class="cart-price">
    //                 $125.00 x ${cartTotal} <span> $${cartTotal*125}.00
    //                 </p>
    //             </div>
    //             <img src="images/icon-delete.svg" alt="" class="cart-item-remove">`
    

}

const openImage = (image,index) => {

    zoomedImage.src = `images/image-product-${index+1}.jpg`
    imageNumber = index
    openModal()
    console.log(index, 'This is the event')
    changeImageClass()
}

const changeImageOnModal = (image,index) => {
    zoomedImage.src = `images/image-product-${index+1}.jpg`
    imageNumber = index
    changeImageClass()
}

// Miscellaneous
console.log(addToCart)
plusIcon.addEventListener('click',increaseCount)
minusIcon.addEventListener('click',decreaseCount)
addToCart.addEventListener('click',addToCartFunction)
closeIcon.addEventListener('click',closeModal)
nextIcon.addEventListener('click',nextImage)
previousIcon.addEventListener('click',previousImage)
profileImage.addEventListener('click',toggleCartModal)


document.addEventListener('keydown',(e) => {
    if(e.key=="Escape"){
        closeModal()
    }
    if(e.keyCode=="37"){
        if(modalOpened){
            previousImage()
        }
    }
    if(e.keyCode=="39"){
        if(modalOpened){
            nextImage()
        }
    }
})

console.log('The thumbnail images', zoomedThumbnailImages)

thumbnailImages.forEach((image,index) => image.addEventListener('click', () => {
    openImage(image,index)
}));

zoomedThumbnailImages.forEach((image,index) => image.addEventListener('click', () => {
    changeImageOnModal(image,index)
}));

// header.classList.add('blurred')
// description.classList.add('blurred')
// wholeBody.classList.add('blurred')   
// zoomed.classList.add('blurred')
// Changing texts
