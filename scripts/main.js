// read_items
function add_4_card() {
    const item_arr = [];
    db.collection("items")
        .where('image', '!=', null)
        .get()
        .then(
            all_items => {

                all_items.forEach(doc => { //iterate thru each doc
                    var item_obj = {
                        ID: doc.id,
                        city: doc.data().city,
                        price: doc.data().price,
                        image: doc.data().image,
                        // pictures: []
                    };
                    // pictures = db.collection("items").doc(item_obj.ID).collection("pictures");
                    // pictures.get()
                    //     .then(querySnapshot => {
                    //         querySnapshot.forEach(picture => {
                    //             console.log(picture.data().name);
                    //             item_obj.pictures.push(picture.data().name)
                    //         });
                    //     })
                    console.log(item_obj)
                    item_arr.push(item_obj);
                    return item_arr
                })
                // add card into main.html
                for (let i = 0; i < item_arr.length; i++) {
                    $(`#item_card_${i}`).append(
                        `<div class="item_card">
                        <a href="test_main2listing.html?docID=${item_arr[i].ID}"><span><img src="${item_arr[i].image}" class="img-thumbnail"></span></a>
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
