let label = document.querySelector(`#label`);
let shopingCart = document.querySelector(`#shopingCart`);
let basket = JSON.parse(localStorage.getItem(`deta`)) || [];


let claculation = () => {
	let cartIcon = document.querySelector("#cartAmount");
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
	console.log();
};

claculation();

let generateCartItems = () => {
	if (basket.length !== 0) {
		return (shopingCart.innerHTML = basket
			.map((carret) => {
				// console.log(carret);
				let { id, item } = carret;
				let search = shopItemsDeta.find((basket) => basket.id === id) || [];
				// console.log(typeof search.price);
				return `
            <div class = "cart-item">
                <img width = 100 src= ${search.img}>
                <div class = "details">
                <div class = "title-price-x">
                    <h4 class = "title-price">
                     <p>${search.name}</p>
                     <p class = "price" > $ ${search.price}</p>
                        <i class="fa-solid fa-xmark" onclick= "removeItem(${id})" ></i>
                    </h4>
                    </div>

                    <div class="buttons">
                                <i onclick="decrement('${id}')" class="fa-solid fa-minus"></i>
                                <div id="quantity_${id}" class="quantity">
									${item}
								</div>
                                <i onclick="increment('${id}')" class="fa-solid fa-plus"></i>
								
                            </div>
							<h3> $ ${item * search.price} </h3>
							

							
							
                </div>
                
                </div>

            </div>
            `;
			})
			.join(""));
	} else {
		shopingCart.innerHTML = ``;
		label.innerHTML = `
        <h2>cart is Empty</h2>
        <a href= "index.html">
        <button class = "homeBtn">back to home</button>
        `;
	}
};

generateCartItems();

const increment = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem);
	// console.log(selectedItem);
	if (search === undefined) {
		basket.push({
			id: selectedItem,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	generateCartItems();
	update(selectedItem);
	localStorage.setItem("deta", JSON.stringify(basket));
};
const decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	update(selectedItem);

	basket = basket.filter((item) => item.item !== 0);
	generateCartItems();
	localStorage.setItem("deta", JSON.stringify(basket));
};
const update = (id) => {
	let search = basket.find((x) => x.id === id);
	document.getElementById(`quantity_${id}`).textContent = search.item;

	claculation();
	totalAmount();
};

let removeItem = (id) => {
	let selectedItem = id;
	 
	basket = basket.filter((cartRemover) => cartRemover.id !== id.toString());
	
	generateCartItems();
	localStorage.setItem("deta", JSON.stringify(basket));
	totalAmount();
	claculation();

	
};

let totalAmount = (id) => {
	if (basket.length !== 0) {
		let amount = basket.map((totalAmt) => {
			let { id, item } = totalAmt
			let search = shopItemsDeta.find((basket) => basket.id === id) || [];
			return item * search.price
		}).reduce((previous,current)=> previous + current)
		console.log(amount)
		label.innerHTML = `<h2>Your's Total Bill is: $ ${amount} </h2>
		<button class="checkOut">Check Out</button>
		<button onclick= "removeAll()" class="removeAll">Remove All</button>
		`;
		generateCartItems();
	} else return;
}
totalAmount();

let removeAll = () => {
	basket = []

	generateCartItems();
	localStorage.setItem("deta", JSON.stringify(basket));
	totalAmount();
	claculation();
}	
