
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
            const itemName = doc.data()["name"]
            console.log(itemName)
        }
    })
}

function setup() {
    getUserID();
}

$(document).ready(setup)
