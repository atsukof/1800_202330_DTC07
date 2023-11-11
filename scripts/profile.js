// GET USER INFO FROM FIRESTORE
function insertUserFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            showForm();
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                let picUrl = userDoc.data().profilePic; 

                if (picUrl != null){
                    console.log(picUrl);
                    document.getElementById('profile-pic').innerHTML = ''
                    profile_pic = document.createElement('img')
                    profile_pic.src = picUrl
                    profile_pic.style.height = '120px';
                    profile_pic.style.width = '120px';
                    document.getElementById('profile-pic').appendChild(profile_pic)
                }

                document.getElementById("username-here").innerText = userName;
                console.log(userName);
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertUserFromFirestore();

//show form when change picture button is clicked
function showForm() {
    document.getElementById("change-pic").addEventListener('click', function() {
        console.log("clicked");
        document.getElementById("change-pic").style.display = "none";
        document.getElementById("upload-pic").style.display = "block";
        document.getElementById("username-rating").style.display = "none";
    })
}

var ImageFile; 

function chooseFileListener(){
    const fileInput = document.getElementById("mypic-input");   // pointer #1

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
	      ImageFile = e.target.files[0];
    })
}
chooseFileListener();

function savePic() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                                profilePic: url // Save the URL into users collection
                            })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                            })
                    })
            })
    })
}