var ImageFile;

$(document).ready(function () {
    // Listens for changes in field values and keypresses
    $("#item-name").keyup(checkFields);
    $("#item-description").keyup(checkFields);
    $("#item-price").keyup(checkFields);
    $("#item-type").change(checkFields);
    $("#item-condition").change(checkFields);
    $("#item-location").change(checkFields);
    $("#item-image").change(checkFields);
});  

function checkFields() {
    // Checks if all required fields are filled in, if so, enables the create listing button
    var item_name = document.getElementById("item-name").value;
    var description = document.getElementById("item-description").value;
    var price = document.getElementById("item-price").value;
    var type = document.getElementById("item-type").value;
    var condition = document.getElementById("item-condition").value;
    var location = document.getElementById("item-location").value;

    if (item_name != '' && description != '' && price != '' && type != '' && condition != 'disable' && location != 'disable' && ImageFile != null) {
        $("#submit-btn").removeClass("disabled");
    }
}

function listenFileSelect() {
    // Listens for file selection
      var fileInput = document.getElementById("item-image"); 

      fileInput.addEventListener('change', function (e) {
          ImageFile = e.target.files[0];   
      })
}
listenFileSelect();

function createListing() {
    // Creates a new listing in the database
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
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

            db.collection("items").add({
                seller_ID: user.uid,
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
                    .serverTimestamp(), 
                buyer_ID: null,
                status: 'active'
            }).then(doc => {
                console.log("Listing created!");
                uploadImage(doc.id);
            }).catch((error) => {
                console.log("error uploading to firebase");
           })
        } else {
            console.log("Error, no user signed in");
        }
    });
}

function uploadImage(listingID) {
    // Uploads the image to cloud storage
    var storageRef = storage.ref("images/" + listingID + ".jpg");

    storageRef.put(ImageFile)
        .then(function () {
            storageRef.getDownloadURL()
                .then(function (url) {
                    db.collection("items").doc(listingID).update({
                            "image": url 
                        })
                        .then(function () {
                            window.location.href = `listing.html?docID=${listingID}`
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}