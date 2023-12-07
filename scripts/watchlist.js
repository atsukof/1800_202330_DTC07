function getUserID() {
    // Get User ID if authenticated
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user_ID = user.uid
            displayWatchlistsDynamically(user_ID)

        }
    })
}

async function displayWatchlistsDynamically(user_ID) {
    // Get items from the user's watchlist
    const userDoc = await db.collection("users").doc(user_ID).get()
    const watchlist_items = userDoc.data().watchlists;
    // Delete sold items from watchlist
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
    // Generate a new card to display
    console.log("inside item into watchlist", itemID)
    doc = db.collection("items").doc(itemID).get().then((doc) => {
        if (doc.exists) {
            var itemName = doc.data().name
            var itemLocation = doc.data().location
            var itemPrice = doc.data().price
            var itemImg = doc.data().image
            var itemName = doc.data().name

            let newcard = watchlistTemplate.content.cloneNode(true);

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
    // Sets up the watchlist page
    getUserID();
}

$(document).ready(setup)
