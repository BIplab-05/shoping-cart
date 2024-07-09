

// let shop = document.querySelector("#shop");
let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem(`deta`)) || [];
let generateShop = () => {
	return (shop.innerHTML = shopItemsDeta
		.map((x) => {
			let { id, name, price, img } = x;
			let search = basket.find((x) => x.id === id) || [];
			return `
                <div class="item" id="${id}">
                    <img height= "280" width="220" src="${img}" alt="">
                    <div class="details">
                        <h3>${name}</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                        <div class="priceQuantity">
                            <h2> $ ${price}</h2>
                            <div class="buttons">
                                <i onclick="decrement('${id}')" class="fa-solid fa-minus"></i>
                                <div id="quantity_${id}" class="quantity">
									${search.item === undefined ? 0 : search.item}
								</div>
                                <i onclick="increment('${id}')" class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>`;
		})
		.join(""));
};



generateShop();

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

	localStorage.setItem("deta", JSON.stringify(basket));
};


const update = (id) => {
	let search = basket.find((x) => x.id === id);
	document.getElementById(`quantity_${id}`).textContent = search.item;

	claculation();
};

let claculation = () => {
	let cartIcon = document.querySelector("#cartAmount");
	cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
	console.log();
};

claculation();
