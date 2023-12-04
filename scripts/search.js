function searchQuery() {
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

// function saveSort(sort_array, index) {
//     sessionStorage.setItem('sort', sort_array[index].innerHTML)
// }

function setup() {

    // console.log('selected:', sessionStorage.getItem('type'))

    sort = document.getElementsByTagName('li')
    for (let i = 0; i < sort.length; i ++) {
        html = sort[i].childNodes[0].innerHTML
        console.log(html)
        sort[i].childNodes[0].addEventListener("click", function () {
            console.log(this.innerHTML)
            sessionStorage.setItem('sort', this.innerHTML)
        })
        // sort[i].onclick = saveSort(sort, i)
    }

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

    results_arr = []
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
            console.log(results_arr.length);
            if (results_arr.length == 0) {
                no_result = document.createElement('div')
                no_result.innerHTML = 'No listings found.'
                document.getElementById('results').appendChild(no_result)
            } else {
                for (let i = 0; i < results_arr.length; i++) {
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
            }

        });
}

$(document).ready(setup);