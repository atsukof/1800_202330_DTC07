// GET USER INFO FROM FIRESTORE
function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;

                document.getElementById("username-here").innerText = userName;
                console.log(userName);
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertNameFromFirestore();

//show form when change picture button is clicked
function showForm() {
    document.getElementById("change-pic").addEventListener('click', function() {
        console.log("clicked");
        document.getElementById("change-pic").style.display = "none";
        document.getElementById("upload-pic").style.display = "block";
        document.getElementById("username-rating").style.display = "none";
    })
}
showForm();
