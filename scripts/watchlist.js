
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
    for (const item_ID of watchlist_items) {
        let item_doc = await db.collection("items").doc(item_ID).get();
        if (item_doc.data().status === "sold") {
            elementToRemove = item_ID;
            let indexToRemove = watchlist_items.indexOf(elementToRemove);
            if (indexToRemove !== -1) {
                watchlist_items.splice(indexToRemove, 1);
            }
        }
    }
    await db.collection("users").doc(user_ID).update({ watchlists: watchlist_items });

    watchlist_items.forEach((item_ID) => {
        newCard(item_ID);
    });
}

function newCard(itemID) {
    console.log("inside item into watchlist", itemID)
    doc = db.collection("items").doc(itemID).get().then((doc) => {
        if (doc.exists) {
            var itemName = doc.data().name
            var itemLocation = doc.data().location
            var itemPrice = doc.data().price
            var itemImg = doc.data().image
            var itemName = doc.data().name

            let newcard = watchlistTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

            //update comment name, date, text
            newcard.querySelector('.img-thumbnail').src = itemImg;
            newcard.querySelector('.price').innerHTML = `\$${itemPrice}`;
            newcard.querySelector('.location').innerHTML = itemLocation;
            newcard.querySelector('.name').innerHTML = itemName;
            newcard.querySelector('.listing-link').href = `listing.html?docID=${itemID}`;

            document.getElementById("watchlists-go-here").appendChild(newcard);

        }
    })
}

function setup() {
    getUserID();
}

$(document).ready(setup)
