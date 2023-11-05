var ImageFile;
function listenFileSelect() {
      // listen for file selection
      var fileInput = document.getElementById("mypic-input"); // pointer #1

			// When a change happens to the File Chooser Input
      fileInput.addEventListener('change', function (e) {
          ImageFile = e.target.files[0];   //Global variable
          var blob = URL.createObjectURL(ImageFile);
          console.log(blob)
      })
}
listenFileSelect();

function createListing() {
    alert ("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var name = document.getElementById("item-name").value;
            var type = document.getElementById("item-type").value;
            var category = document.getElementById("item-category-2").value;
            var colour = document.getElementById("item-colour").value;
            var brand = document.getElementById("item-brand").value;
            var material = document.getElementById("item-material").value;
            var condition = document.getElementById("item-condition").value;
            var description = document.getElementById("item-description").value;
            var price = document.getElementById("item-price").value;
            var location = document.getElementById("handover-location").value;

            console.log(name, type, category, colour, brand, material, condition, description, price, location)

            db.collection("items").add({
                seller_ID: user.uid,
                name: name,
                type: type,
                category: category,
                colour: colour,
                brand: brand,
                material: material,
                condition: condition,
                description: description,
                price: price,
                location: location,
                date_created: firebase.firestore.FieldValue
                    .serverTimestamp(), //current system time
                buyer_ID: null
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
function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

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
                    db.collection("items").doc(postDocID).update({
                            "image": url // Save the URL into users collection
                        })
                         // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}