async function add_6_card() {
    // Adds 6 cards to the main page
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
                    dynamicallyGenerateElement(results_arr[i])
                }
            })
}

function dynamicallyGenerateElement(queryResult) {
    // Dynamically generates an item card from the search result
    let redirect = document.createElement('a')
    redirect.href = `listing.html?docID=${queryResult.id}`

    let panel = document.createElement('div')
    panel.className = 'panel col'

    let search = document.createElement('div')
    search.className = 'search'

    let image = document.createElement('img')
    image.src = queryResult.image
    image.className = 'img-thumbnail'

    let price = document.createElement('p')
    price.className = 'price'
    price.innerHTML = `$${queryResult.price}`

    let location = document.createElement('p')
    location.innerHTML = queryResult.location
    location.className = 'location'

    let name = document.createElement('p')
    name.innerHTML = queryResult.name
    name.className = 'name'

    redirect.appendChild(image)
    search.appendChild(redirect)
    search.appendChild(price)
    search.appendChild(location)
    panel.appendChild(search)
    panel.appendChild(name)
    document.getElementById('results').appendChild(panel)
}

function setup() {
    // Runs when the page is loaded
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
    // Stores the search query in session storage
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

function searchByType(event) {
    // Stores the type of item to search for in session storage
    var selectedType = event.currentTarget.id
    sessionStorage.setItem("type", selectedType)
}

$(document).ready(setup);