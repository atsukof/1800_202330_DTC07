// read_items
async function add_4_card() {
    const results_arr = [];
    await db.collection('items').where('status', '==', 'active').orderBy(`date_created`, `desc`).get()
        .then(
            all_items => {

                all_items.forEach(doc => { //iterate thru each doc
                    var item_obj = {
                        id: doc.id,
                        location: doc.data().location,
                        price: doc.data().price,
                        image: doc.data().image,
                        name: doc.data().name
                    };

                    results_arr.push(item_obj);
                    return results_arr
                })
                // add card into main.html
                for (let i = 0; i < 6; i++) {
                    let redirect = document.createElement('a')
                    redirect.href = `listing.html?docID=${results_arr[i].id}`

                    let panel = document.createElement('div')
                    panel.className = 'panel col'

                    let search = document.createElement('div')
                    search.className = 'search'

                    let image = document.createElement('img')
                    image.src = results_arr[i].image
                    image.className = 'img-thumbnail'

                    let price = document.createElement('p')
                    price.className = 'price'
                    price.innerHTML = `$${results_arr[i].price}`

                    let location = document.createElement('p')
                    location.innerHTML = results_arr[i].location
                    location.className = 'location'

                    let name = document.createElement('p')
                    name.innerHTML = results_arr[i].name
                    name.className = 'name'
    
                    redirect.appendChild(image)
                    search.appendChild(redirect)
                    search.appendChild(price)
                    search.appendChild(location)
                    panel.appendChild(search)
                    panel.appendChild(name)
                    document.getElementById('results').appendChild(panel)

                }
            })
}

// setup
function setup() {
    add_4_card()

    // search with enter key
    $("#search-input").keydown((e) => {
        var keyCode = e.which || e.keyCode;
        if (keyCode == 13) {
            searchQuery()
            window.location.href = `search.html`
        }
    })
}


function searchQuery() {
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

function searchByType(event) {
    var selectedType = event.currentTarget.id
    sessionStorage.setItem("type", selectedType)
}

$(document).ready(setup);
