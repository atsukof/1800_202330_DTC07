function searchQuery() {
    keywords = $("#search-input").val().split(" ")
    sessionStorage.setItem('keywords', keywords);
}

function setup() {
    var keywords = sessionStorage.getItem('keywords').split(',');
    sessionStorage.clear();

    results_arr = []
    db.collection("items")
        .where('name', 'in', keywords)
        .get()
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
            for (let i = 0; i < results_arr.length; i++) {
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
                search.appendChild(image)
                search.appendChild(price)
                search.appendChild(location)
                document.getElementById('results').appendChild(search)
                console.log(results_arr[i])
            }
        }
        );
}

$(document).ready(setup);