let user_ID = null
let item_ID = null


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
    });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function itemInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    console.log(params)
    item_ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(item_ID, "item_ID");

    db.collection("items")
        .doc(item_ID)
        .get()
        .then(doc => {
            console.log("item is read")
            let imgEvent = document.querySelector(".item-img");
            imgEvent.src = `${doc.data().image}`;
            $(".item-name").append(`
            <h2 class="item-name-text">${doc.data().name}
            </h2>
            `);

            // get users collection -> user.name
            seller_ID = doc.data().seller_ID
            db.collection("users").doc(seller_ID).get()
                .then(
                    seller => {
                        seller = seller.data()
                        $(".title-left").append(`<p>${seller.name}<span id="rating">★★★★★</span></p>`)
                    })

            $("#price").text(`$${doc.data().price}`);
            document.getElementById("city").innerHTML = doc.data().city;
            document.getElementById("location").innerHTML = doc.data().location;
            document.getElementById("color").innerHTML = doc.data().color;
            document.getElementById("material").innerHTML = doc.data().material;
            document.getElementById("status").innerHTML = doc.data().status;
            document.getElementById("description").innerHTML = doc.data().description;
        });
    return item_ID;
}

function saveItemID() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('item_ID', ID);
    // window.location.href = 'review.html';
}

function getUserID() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            user_ID = user.uid
            checkFavorite(user_ID)
        }
    })
}

function checkFavorite(user_ID) {
    let params = new URL(window.location.href); //get URL of search bar
    // let itemID = params.searchParams.get("docID"); //get value for key "id"
    console.log(item_ID, "item ID");

    db.collection("watchlists")
        .where("user_ID", "==", user_ID)
        .where("item_ID", "==", item_ID)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                console.log("this item is in your watchlist");
                $(".item-name-text").append(`
            <span class="material-icons" onclick="changeWatchilist()">favorite</span>
            `);

            } else {
                console.log("this item is not in your watchlist");
                $(".item-name-text").append(`
            <span class="material-icons" onclick="changeWatchlist()">favorite_border</span>
            `)
            }
        })
        .catch((error) => {
            console.error("error occurred", error);
        });
}

function changeWatchilist() {
    console.log("watchlist icon clicked")
    console.log(user_ID, item_ID)
}

async function displayCommentsDynamically(item_ID) {
    const all_comments = await db.collection("comments").where("item_ID", "==", item_ID).get()
    const comments = all_comments.docs;
    console.log(comments);
    comments.forEach((doc) => {
        var commenter = doc.data().comment_user_ID;
        var commentDate = doc.data().comment_date;
        var commentText = doc.data().comment_text;

        let newcard = commentTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update comment name, date, text
        newcard.querySelector('.commenter-name').innerHTML = commenter;
        newcard.querySelector('.comment-date').innerHTML = commentDate.toDate().toLocaleString();
        newcard.querySelector('.comment-text').innerHTML = commentText;

        document.getElementById("comments-go-here").appendChild(newcard);
    })
};



function checkCommentFields() {
    var comment = document.getElementById("comment").value;

    if (comment != '') {
        $("#comment-btn").removeClass("disabled");
    }
    else {
        $("#comment-btn").addClass("disabled");
    }
}

function postComment() {
    console.log("comment button clicked")
    var commentDate = firebase.firestore.Timestamp.fromDate(new Date())
    var commentText = document.getElementById("comment").value

    console.log(commentText)
    console.log(item_ID)
    console.log(commentDate)

    var user = firebase.auth().currentUser;
    if (user) {
        db.collection("comments").add({
            comment_date: commentDate,
            comment_text: commentText,
            comment_user_ID: user_ID,
            item_ID: item_ID
        }).then(() => {
            alert("Comment submitted.");
            window.location.href = `listing.html?docID=${item_ID}`; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
    }
};

async function setup() {
    item_ID = await itemInfo();
    saveItemID();
    getUserID();
    displayCommentsDynamically(item_ID);
    $("#comment").keyup(checkCommentFields);
    $("#comment").change(checkCommentFields);

}

$(document).ready(setup)