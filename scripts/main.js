// read_items
async function add_4_card() {
    const item_arr = [];
    await db.collection("items").get()
        .then(
            all_items => {
                //var i = 1;  //Optional: if you want to have a unique ID for each hike
                all_items.forEach(doc => { //iterate thru each doc
                    var item_obj = {
                        ID: doc.id,
                        city: doc.data().city,
                        price: doc.data().price,
                        image: doc.data().image,
                        // pictures: []
                    };

                    console.log(item_obj)
                    item_arr.push(item_obj);
                    return item_arr
                })
                // add card into main.html
                for (let i = 0; i < item_arr.length; i++) {
                    $(`#item_card_${i}`).append(
                        `<div class="item_card">
                        <a href="listing.html?docID=${item_arr[i].ID}"><span><img src=${item_arr[i].image} class="img-thumbnail"></span></a>
                        <p class="price">$${item_arr[i].price}</p>
                        <p class="city">${item_arr[i].city}</p>
                        </div>`
                    )
                }
            })
}

// setup
function setup() {
    console.log("main.js is loaded")
    add_4_card()
}

$(document).ready(setup);
