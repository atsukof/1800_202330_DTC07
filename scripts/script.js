
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
function displayCommentsDynamically(collection) {
  let commentTemplate = document.getElementById("commentTemplate"); // Retrieve the HTML element with the ID "commentTemplate" 

  db.collection(collection).get()   //the collection called "comments"
    .then(allHikes => {
      allHikes.forEach(doc => { //iterate thru each doc
        var commenter = doc.data().comment_user_ID;
        var commentDate = doc.data().comment_date;
        var commentText = doc.data().comment_text;
        let newcard = commentTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

        //update comment name, date, text
        newcard.querySelector('.commenter-name').innerHTML = commenter;
        newcard.querySelector('.comment-date').innerHTML = commentDate.toDate().toLocaleString();
        newcard.querySelector('.comment-text').innerHTML = commentText;

        document.getElementById(collection + "-go-here").appendChild(newcard);

      })
    })
}

displayCommentsDynamically("comments");  //input param is the name of the collection