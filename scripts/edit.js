var listing

function setup() {
    item_ID = localStorage.getItem('item_ID')
    listing = db.collection("items").doc(item_ID)
    listing.get()
        .then(item => {
            document.getElementById("item-name").value = item.data().name
            document.getElementById("item-type").value = item.data().type
            document.getElementById("item-condition").value = item.data().condition
            document.getElementById("item-location").value = item.data().location
            document.getElementById("item-description").value = item.data().description
            document.getElementById("item-price").value = item.data().price
            console.log(item.data())
            if (item.data().brand != null) {
                document.getElementById("item-brand").value = item.data().brand
            }
            if (item.data().colour != null) {
                document.getElementById("item-colour").value = item.data().colour
            }
            if (item.data().subcategory != null) {
                document.getElementById('item-subcategory').value = item.data().subcategory
            }
            if (item.data().material != null) {
                document.getElementById('item-material').value = item.data().material
            }
        })
}

async function deleteListing() {
    if (confirm('Are you sure you want to delete this listing?')){
        await listing.delete();
        localStorage.clear();
        window.location.href = 'main.html'
    } 
}

async function saveListing() {
    var item_name = document.getElementById("item-name").value;
    var item_description = document.getElementById("item-description").value;
    var item_price = parseFloat(document.getElementById("item-price").value);
    var item_type = document.getElementById("item-type").value;
    var item_condition = document.getElementById("item-condition").value;
    var item_location = document.getElementById("item-location").value;

    var item_subcategory = document.getElementById("item-subcategory").value;
    if (item_subcategory == 'disable') {
        item_subcategory = null
    }
    var colour = document.getElementById("item-colour").value;
    if (colour == 'disable') {
        colour = null
    }
    var brand = document.getElementById("item-brand").value;
    if (brand == 'disable') {
        brand = null
    }
    var material = document.getElementById("item-material").value;
    if (material == 'disable') {
         material = null
    }

    await listing.update({
        name: item_name,
        type: item_type,
        subcategory: item_subcategory,
        colour: colour,
        brand: brand,
        material: material,
        condition: item_condition,
        description: item_description,
        price: item_price,
        location: item_location,
        date_created: firebase.firestore.FieldValue
            .serverTimestamp(), //current system time
    }).then(
        console.log('saved')
    )
    window.location.href = `listing.html?docID=${localStorage.getItem('item_ID')}`
}



$(document).ready(setup)