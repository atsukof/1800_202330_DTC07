
function getUserID() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user_ID = user.uid
            // currentUser = db.collection("users").doc(user_ID)
            displayWatchlistsDynamically(user_ID)

        }
    })
}

async function displayWatchlistsDynamically(user_ID) {
    const userDoc = await db.collection("users").doc(user_ID).get()
    const watchlist_items = userDoc.data().watchlists;

    watchlist_items.forEach((item_ID) => {
        console.log(item_ID)
        newCard(item_ID);
    });
    }
    
function newCard(itemID) {
    console.log("inside new card", itemID)
    doc = db.collection("items").doc(itemID).get().then((doc) => {
        if (doc.exists) {
            var itemName = doc.data().name
            var itemLocation = doc.data().location
            var itemPrice = doc.data().price
            var itemImg = doc.data().image
            console.log(itemName, itemLocation, itemPrice, itemImg, itemID)

            let newcard = watchlistTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

            //update comment name, date, text
            newcard.querySelector('.img-thumbnail').src = itemImg;
            newcard.querySelector('.price').innerHTML = `\$${itemPrice}`;
            newcard.querySelector('.location').innerHTML = itemLocation;
            newcard.querySelector('.listing-link').href = `listing.html?docID=${itemID}`;

            document.getElementById("watchlists-go-here").appendChild(newcard);

        }
    })
}

function setup() {
    getUserID();
}

$(document).ready(setup)
