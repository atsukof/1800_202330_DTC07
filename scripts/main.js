// read_items
function add_4_card() {
    const item_arr = [];
    db.collection("items").get()
        .then(
            all_items => {
                //var i = 1;  //Optional: if you want to have a unique ID for each hike
                all_items.forEach(doc => { //iterate thru each doc
                    var item_obj = {
                        ID: doc.id,
                        picture: doc.data().picture,
                        city: doc.data().city,
                        price: doc.data().price
                    };
                    item_arr.push(item_obj);
                    return item_arr
                })

                // add card into main.html
                for (let i = 0; i < item_arr.length; i++) {
                    $(`#item_card_${i}`).append(
                        `<div class="item_card">
                        <img src="../images/${item_arr[i].picture}.png" class="img-thumbnail">
                        <p class="price">$${item_arr[i].price}</p>
                        <p class="city">${item_arr[i].city}</p>
                        </div>`
                    )
                }
            })
}

// read json file and write into firestore 
function write_items() {
    fetch("../json/items.json")
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            var items = db.collection("items");
            items.add(data)
        })
};
// write_items()

// setup
function setup() {
    console.log("main.js is loaded")
    add_4_card()
}

$(document).ready(setup);
