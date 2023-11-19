var user_ID
var item_ID = null
var seller_ID
var currentUser


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


async function itemInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    console.log(params)
    item_ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(item_ID, "item_ID");

    await db.collection("items")
        .doc(item_ID)
        .get()
        .then(async (doc) => {
            console.log("item is read")
            let imgEvent = document.querySelector(".item-img");
            imgEvent.src = `${doc.data().image}`;
            $(".item-name-text").append(doc.data().name);
            document.querySelector("i").id = "save-" + item_ID

            // check if the item is in the watchlist
            currentUser.get().then(userDoc => {
                //get the user name
                var watchlist_items = userDoc.data().watchlists;
                if (watchlist_items.includes(item_ID)) {
                    document.getElementById('save-' + item_ID).innerText = 'favorite';
                }
            })

            document.querySelector('i').onclick = () => updateWatchlist(item_ID);

            // get users collection -> user.name

            seller_ID = doc.data().seller_ID;
            localStorage.setItem("seller_ID", seller_ID);

            let seller_docRef = await db.collection("users").doc(seller_ID).get();
            seller_rating = seller_docRef.data().rating;
            seller_rating = Math.round(seller_rating);


            // convert rating to stars
            stars = ""
            let rating_stars = "";
            for (let i = 0; i < seller_rating; i++) {
                rating_stars += '<span class="material-icons" style="font-size:15px">star</span>';
            }

            for (let i = seller_rating; i < 5; i++) {
                rating_stars += '<span class="material-icons" style="font-size:15px">star_outline</span>';
            }


            db.collection("users").doc(seller_ID).get()
                .then(
                    seller => {
                        seller = seller.data()
                        $(".seller-name").append(`${seller.name} ${rating_stars}`)
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

function showEdit() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user && seller_ID === user.uid) {
            document.getElementById('edit-btn').style.display = 'block'
        } else if (user && seller_ID != user.uid) {
            document.getElementById('buy-btn').style.display = 'block'
        }
    })
}

function saveItemID() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('item_ID', ID);
    // window.location.href = 'review.html';
}

async function getUserID() {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            localStorage.setItem('user_ID', user.uid)
            var user_ID = user.uid;
            currentUser = await db.collection("users").doc(user_ID);
            console.log(currentUser)
        }
    })
}

function updateWatchlist(item_ID) {
    currentUser.get().then(userDoc => {
        let watchlist_items = userDoc.data().watchlists
        let iconID = 'save-' + item_ID;
        let isInWatchlist = watchlist_items.includes(item_ID);

        if (isInWatchlist) {
            currentUser.update({
                watchlists: firebase.firestore.FieldValue.arrayRemove(item_ID)
            }).then(() => {
                console.log(`item ${item_ID} was removed.`)
                document.getElementById(iconID).innerText = 'favorite_border';
            })

        } else {
            currentUser.update({
                watchlists: firebase.firestore.FieldValue.arrayUnion(item_ID)
            })
                // Handle the front-end update to change the icon
                .then(function () {
                    console.log(`item ${item_ID} was added to your watchlist.`);
                    document.getElementById(iconID).innerText = 'favorite';
                });
        }
    })

}


async function displayCommentsDynamically(item_ID) {
    const all_comments = await db.collection("comments").where("item_ID", "==", item_ID).get()
    const comments = all_comments.docs;
    // console.log(comments);
    comments.forEach(async (doc) => {
        var commenter = await doc.data().comment_user_ID;
        var commenter_docRef = await db.collection("users").doc(commenter).get()
        var commenter_name = commenter_docRef.data().name;
        // console.log(commenter_name);
        var commentDate = doc.data().comment_date;
        var commentText = doc.data().comment_text;

        let newcard = commentTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update comment name, date, text
        newcard.querySelector('.commenter-name').innerHTML = commenter_name;
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
            window.location.href = `listing.html?docID=${item_ID}`; // Redirect to the listing page
        });
    } else {
        console.log("No user is signed in");
    }
};

async function setup() {
    await getUserID();
    item_ID = await itemInfo();
    saveItemID();

    displayCommentsDynamically(item_ID);
    $("#comment").keyup(checkCommentFields);
    showEdit();
    console.log(currentUser)
}

$(document).ready(setup)