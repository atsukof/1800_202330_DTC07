
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

    // doublecheck: is your collection called "Reviews" or "reviews"?
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
            $(".description").text(`${doc.data().description}`);
        });
    return ID;
}

item_ID = itemInfo();


function displayCommentsDynamically(item_ID) {
    let commentTemplate = document.getElementById("commentTemplate"); // Retrieve the HTML element with the ID "commentTemplate" 
    db.collection("items")
        .doc(item_ID)
        .get()
        .then(doc => {
            item_name = doc.data().name;
            comment_ID = doc.data().comment_ID;
            console.log(item_name);
            return comment_ID
        })
        .then(comment_ID => {
            console.log(comment_ID)
            db.collection("comments")
                .doc(comment_ID)
                .get()
                .then(
                    doc => {
                        var commenter = doc.data().comment_user_ID;
                        var commentDate = doc.data().comment_date;
                        var commentText = doc.data().comment_text;
                        let newcard = commentTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                        //update comment name, date, text
                        newcard.querySelector('.commenter-name').innerHTML = commenter;
                        newcard.querySelector('.comment-date').innerHTML = commentDate.toDate().toLocaleString();
                        newcard.querySelector('.comment-text').innerHTML = commentText;

                        document.getElementById("comments-go-here").appendChild(newcard);
                    }
                )
        })
}

displayCommentsDynamically(item_ID);  //input param is the name of the collection
