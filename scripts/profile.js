var profile_user_ID

function getProfileUserInfo() {
    // Get the user ID from the URL
    let params = new URL(window.location.href); 
    profile_user_ID = params.searchParams.get("userID"); 
    return profile_user_ID;
}

function insertUserFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getProfileUserInfo();
            console.log(profile_user_ID, "will be shown");

            profileUser = db.collection("users").doc(profile_user_ID);
            profileUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                let picUrl = userDoc.data().profilePic;
                let userRating = userDoc.data().rating

                if (picUrl != null) {
                    console.log(`picUrl: ${picUrl}`);
                    document.getElementById('profile-pic').innerHTML = ''
                    profile_pic = document.createElement('img')
                    profile_pic.src = picUrl
                    profile_pic.style.height = '120px';
                    profile_pic.style.width = '120px';
                    document.getElementById('profile-pic').appendChild(profile_pic)
                }

                document.getElementById("username-here").innerText = userName;
               
                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                userRating = Math.round(userRating);

                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < userRating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = userRating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                document.querySelector(".stars_row").innerHTML = starRating;
            })

            if (profile_user_ID == user.uid) {
                showForm();
            } else {
                document.getElementById("change-pic").style.display = "none";
            }

        } else {
            console.log("No user is logged in."); 
        }
    })
}
insertUserFromFirestore();

function showForm() {
    //show form when change picture button is clicked
    document.getElementById("change-pic").addEventListener('click', function () {
        document.getElementById("change-pic").style.display = "none";
        document.getElementById("upload-pic").style.display = "block";
        document.getElementById("username-rating").style.display = "none";
    })
}

var ImageFile;

function chooseFileListener() {
    // Listens for a file to be chosen
    const fileInput = document.getElementById("profile-pic-upload");
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];
    })
}
chooseFileListener();

function savePic() {
    // Saves the profile picture to the database
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");
        storageRef.put(ImageFile)
            .then(async function () {
                await storageRef.getDownloadURL()
                    .then(async function (url) { 
                        await db.collection("users").doc(user.uid).update({
                            profilePic: url 
                        })
                            .then(function () {
                                location.reload();
                            })
                    })
            })
    })
}

async function displayItemCardsDynamically() {
    let active_block = document.querySelector('#active');
    let sold_block = document.querySelector('#sold');

    let userID = getProfileUserInfo();


    const all_activeDoc = await db.collection('items').where('status', '==', 'active').where('seller_ID', `==`, `${userID}`).orderBy(`date_created`, `desc`).get();
    all_activeDoc.forEach(function (doc) {

        let search = document.createElement('div');
        search.className = 'search';
        let redirect = document.createElement('a')
        redirect.href = `listing.html?docID=${doc.id}`
        let image = document.createElement('img');
        image.src = doc.data().image;
        image.className = 'img-thumbnail';
        let price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = `$${doc.data().price}`;
        let location = document.createElement('p');
        location.innerHTML = doc.data().location;
        location.className = 'location';

        redirect.appendChild(image);
        search.appendChild(redirect);
        search.appendChild(price);
        search.appendChild(location);
        active_block.appendChild(search);
    });


    const all_soldDoc = await db.collection('items').where('status', '==', 'sold').where('seller_ID', `==`, `${userID}`).orderBy(`date_created`, `desc`).get();
    all_soldDoc.forEach(doc => {
        let search = document.createElement('div');
        search.className = 'search';
        let redirect = document.createElement('a');
        redirect.href = `listing.html?docID=${doc.id}`;
        let image = document.createElement('img');
        image.src = doc.data().image;
        image.className = 'img-thumbnail';
        let price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = `$${doc.data().price}`;
        let location = document.createElement('p');
        location.innerHTML = doc.data().location;
        location.className = 'location';

        redirect.appendChild(image);
        search.appendChild(redirect);
        search.appendChild(price);
        search.appendChild(location);
        sold_block.appendChild(search);
    });
}

displayItemCardsDynamically();