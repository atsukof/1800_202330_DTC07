var item_ID = undefined;

async function displayItemCard() {
    // get and add seller data from collection of user


    // add item data
    item_ID = localStorage.getItem("item_ID");
    console.log(`item_ID: ${item_ID}`);
    const item_docRef = await db.collection("items").doc(item_ID).get();

    const seller_ID = item_docRef.data().seller_ID;
    console.log(`seller_ID: ${seller_ID}`);
    const seller_docRef = await db.collection("users").doc(seller_ID).get();

    let search = document.createElement('div');
    search.className = 'search';
    let image = document.createElement('img');
    image.src = item_docRef.data().image;
    let price = document.createElement('p');
    price.className = 'price';
    price.innerHTML = `$${item_docRef.data().price}`;
    let location = document.createElement('p');
    location.innerHTML = item_docRef.data().location;

    location.className = 'location';

    search.appendChild(image);
    // search.appendChild(price)
    // search.appendChild(location)

    document.getElementById('item_card').appendChild(search);

    document.getElementById('seller_name').textContent = seller_docRef.data().name;
    document.getElementById('location').textContent = item_docRef.data().location;
    document.getElementById('price').textContent = `$${item_docRef.data().price}`;



    // document.getElementById("item_card").innerHTML = "abc";
}

async function change_status() {
    // console.log(`item_ID: ${item_ID}`);
    const item_docRef = await db.collection("items").doc(item_ID).get();
    // console.log(item_docRef.data().status);

    item_status = { ["status"]: "sold" };
    await db.collection("items").doc(item_ID).update(item_status);
    window.location.href = "rating.html"
}


async function setup() {
    console.log("confirm_purchase.js is loaded.");
    await displayItemCard();
    cancel = document.getElementById("cancel");
    cancel.href = `listing.html?docID=${item_ID}`;
}

$(document).ready(setup);