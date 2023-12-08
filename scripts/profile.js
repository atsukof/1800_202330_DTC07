var profile_user_ID

function getProfileUserInfo() {
    // Get the user ID from the URL
    let params = new URL(window.location.href); 
    profile_user_ID = params.searchParams.get("userID"); 
    return profile_user_ID;
}

function insertUserFromFirestore() {
    // Insert the user information from the database into the HTML elements
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getProfileUserInfo();

            profileUser = db.collection("users").doc(profile_user_ID);
            profileUser.get().then(userDoc => {
                // Get the user name
                var userName = userDoc.data().name;
                let picUrl = userDoc.data().profilePic;
                let userRating = userDoc.data().rating

                // Inject user profile picture
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
               
                // Inject user rating
                userRating = Math.round(userRating);
                document.querySelector(".stars_row").innerHTML = ratingStars(userRating);
            }).catch((error) => {
                console.log("error fetching user data from database");
            })

            if (profile_user_ID == user.uid) {
                // only allow user to change profile picture if it is their own profile
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

function ratingStars(rating) {
    // convert rating to stars
    let rating_stars = "";
    for (let i = 0; i < rating; i++) {
        rating_stars += '<span class="material-icons">star</span>';
    }

    for (let i = rating; i < 5; i++) {
        rating_stars += '<span class="material-icons">star_outline</span>';
    }
    return rating_stars
}

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
                            }).catch((error) => {
                                console.log("error uploading to database");
                           })
                    })
            })
    })
}

async function displayItemCardsDynamically() {
    // Fetches the query results from the database and generates the HTML elements to display the search results
    let active_block = document.querySelector('#active');
    let sold_block = document.querySelector('#sold');
    let userID = getProfileUserInfo();

    const all_activeDoc = await db.collection('items').where('status', '==', 'active').where('seller_ID', `==`, `${userID}`).orderBy(`date_created`, `desc`).get();
    all_activeDoc.forEach(function (doc) {
        search = createElementToAppend(doc);
        active_block.appendChild(search);
    });

    const all_soldDoc = await db.collection('items').where('status', '==', 'sold').where('seller_ID', `==`, `${userID}`).orderBy(`date_created`, `desc`).get();
    all_soldDoc.forEach(doc => {
        search = createElementToAppend(doc);
        sold_block.appendChild(search);
    });
}

function createElementToAppend(doc) {
    //  Dynamically generates HTML element for an item card from a document
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
    return search;
}

displayItemCardsDynamically();