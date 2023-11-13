
function getUserID() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid
            displayWatchlistsDynamically(userID)

        }
    })
}

async function displayWatchlistsDynamically(userID) {
    const all_watchlists = await db.collection("watchlists").where("user_ID", "==", userID).get()
    console.log(db.collection("watchlists").where("user_ID", "==", userID).get().doc)
    const watchlists = all_watchlists.docs;
    console.log(watchlists)
    watchlists.forEach((doc) => {
        var itemID = doc.data().item_ID;
        console.log(itemID)
        newCard(itemID);
    })
};

function newCard(itemID) {
    console.log("inside new card", itemID)
    doc = db.collection("items").doc(itemID).get().then((doc) => {
        if (doc.exists) {
            var itemName = doc.data()["name"]
            var itemLocation = doc.data()["city"]
            var itemPrice = doc.data()["price"]
            console.log(itemName, itemLocation, itemPrice)

            let newcard = watchlistTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

            //update comment name, date, text
            // newcard.querySelector('.watchilist-img').innerHTML = img;
            newcard.querySelector('.price').innerHTML = itemPrice;
            newcard.querySelector('.location').innerHTML = itemLocation;

            document.getElementById("watchlists-go-here").appendChild(newcard);


        }
    })
}

function setup() {
    getUserID();
}

$(document).ready(setup)
