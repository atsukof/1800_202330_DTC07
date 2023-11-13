// read_items
async function add_4_card() {
    const results_arr = [];
    await db.collection("items")
        .where('status', '==', 'active')
        .get()
        .then(
            all_items => {

                all_items.forEach(doc => { //iterate thru each doc
                    var item_obj = {
                        id: doc.id,
                        location: doc.data().location,
                        price: doc.data().price,
                        image: doc.data().image,
                    };

                    console.log(item_obj)
                    results_arr.push(item_obj);
                    return results_arr
                })
                // add card into main.html
                for (let i = 0; i < results_arr.length; i++) {
                    let redirect = document.createElement('a')
                    redirect.href = `listing.html?docID=${results_arr[i].id}`
                    let search = document.createElement('div')
                    search.className = 'search'
                    let image = document.createElement('img')
                    image.src = results_arr[i].image
                    let price = document.createElement('p')
                    price.className = 'price'
                    price.innerHTML = `$${results_arr[i].price}`
                    let location = document.createElement('p')
                    location.innerHTML = results_arr[i].location
                    location.className = 'location'
    
                    redirect.appendChild(image)
                    search.appendChild(redirect)
                    search.appendChild(price)
                    search.appendChild(location)
                    document.getElementById('results').appendChild(search)
                }
            })
}

// setup
function setup() {
    console.log("main.js is loaded")
    add_4_card()
}

function searchQuery() {
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

$(document).ready(setup);
