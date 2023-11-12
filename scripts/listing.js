
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
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    db.collection("items")
        .doc(ID)
        .get()
        .then(doc => {
            console.log("item is read")
            let imgEvent = document.querySelector(".item-img");
            imgEvent.src = `${doc.data().image}`;
            $(".item-name").append(`
            <h2 class="item-name-text">${doc.data().name}<span class="material-icons">favorite</span></h2>
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
    return ID;
}

function saveItemID() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('item_ID', ID);
    // window.location.href = 'review.html';
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


async function setup() {
    item_ID = await itemInfo();
    saveItemID();
    displayCommentsDynamically(item_ID);
}

$(document).ready(setup)