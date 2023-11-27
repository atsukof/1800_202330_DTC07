var ImageFile;

$(document).ready(function () {
    $("#item-name").keyup(checkFields);
    $("#item-description").keyup(checkFields);
    $("#item-price").keyup(checkFields);
    $("#item-type").change(checkFields);
    $("#item-condition").change(checkFields);
    $("#item-location").change(checkFields);
    $("#mypic-input").change(checkFields);
});  

function checkFields() {
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
      // listen for file selection
      var fileInput = document.getElementById("mypic-input"); // pointer #1

	  // When a change happens to the File Chooser Input
      fileInput.addEventListener('change', function (e) {
          ImageFile = e.target.files[0];   //Global variable
      })
}
listenFileSelect();

function createListing() {
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
                    .serverTimestamp(), //current system time
                buyer_ID: null,
                status: 'active'
            }).then(doc => {
                console.log("Listing created!");
                console.log(doc.id);
                uploadPic(doc.id);
            })
        } else {
            // No user is signed in.
                          console.log("Error, no user signed in");
        }
    });
}

//upload picture
function uploadPic(listingID) {
    console.log("inside uploadPic " + listingID);
    var storageRef = storage.ref("images/" + listingID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile
       
                   // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                 // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // listing document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("items").doc(listingID).update({
                            "image": url // Save the URL into users collection
                        })
                         // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            window.location.href = `listing.html?docID=${listingID}`
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}