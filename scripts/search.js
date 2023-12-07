function searchQuery() {
    // Splits the search query into strings of keyword tokens and saves them in session storage
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

function setup() {
    // Sets up the search page
    if (sessionStorage.getItem('keywords')) {
        var keywords = sessionStorage.getItem('keywords').split(',');
    } else if (sessionStorage.getItem('advanced_queries')) {
        var advanced_queries = JSON.parse(sessionStorage.getItem('advanced_queries'))
    } else if (sessionStorage.getItem('type')) {
        var selectedType = sessionStorage.getItem('type');
        if (selectedType == 'type-furniture') {
            var type = "Furniture"
        }
        if (selectedType == 'type-household-items') {
            var type = "Household Items"
        }
        if (selectedType == 'type-electronics') {
            var type = "Electronics"
        }
        if (selectedType == 'type-plants') {
            var type = "Plants"
        }
    }

    // search with enter key
    $("#search-input").keydown((e) =>{
        var keyCode = e.which || e.keyCode;
        if(keyCode == 13) {
            searchQuery()
            window.location.href = `search.html`
        }
    })

    sessionStorage.clear();

    results_arr = []
    query = generateQuery(keywords, advanced_queries, type)
    fetchQuery(query);
}

function fetchQuery(query) {
    // Fetches the query results from the database
    query.get()
        .then(
            results => {
                results.forEach(result => {
                    var result_obj = {
                        name: result.data().name,
                        image: result.data().image,
                        price: result.data().price,
                        location: result.data().location,
                        id: result.id
                    };
                    results_arr.push(result_obj);
                })
            }
        )
        .then(() => {
            if (results_arr.length == 0) {
                no_result = document.createElement('div')
                no_result.innerHTML = 'No listings found.'
                document.getElementById('results').appendChild(no_result)
            } else {
                for (let i = 0; i < results_arr.length; i++) {
                    dynamicallyGenerateElement(results_arr[i])
                }
            };
        });
}

function generateQuery(keywords, advanced_queries, type) {
    // Generates the query based on the search criteria
    query = db.collection("items").where('status', '==', 'active')

    if (keywords) {
        query = query.where('name', 'in', keywords)
    }

    if (advanced_queries) {
        for (let key in advanced_queries) {
            if (key === 'name') {
                query = query.where('name', 'in', advanced_queries[key].split(' '))
            } else {
                query = query.where(key, '==', advanced_queries[key])
            }
        }
    } else if (type) {
        query = query.where('type', '==', type);
    }
    return query
}

function dynamicallyGenerateElement(queryResult) {
    // Dynamically generates HTML elements to display the search results
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

$(document).ready(setup);