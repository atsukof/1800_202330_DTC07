let seller_ID = undefined;

async function show_seller() {
    seller_ID = localStorage.getItem("seller_ID");
    const sellerDoc = await db.collection("users").doc(seller_ID).get();
    seller_name = document.querySelectorAll(".seller_name");
    console.log(sellerDoc.data());

    seller_name.forEach(function (seller_name) {
        seller_name.textContent = "Rate "
        seller_name.textContent += `${sellerDoc.data().name}`;
    })

    let seller_img = document.createElement("img");
    seller_img.src = sellerDoc.data().profilePic;

    if (seller_img) {
        document.getElementById("seller_img").innerHTML = "";
        document.getElementById("seller_img").appendChild(seller_img);
    } else {
        console.log("seller profilePic does no exist.")
    }
}


// Iterate through each star element
function click_rating() {
    // Select all elements with the class name "star" and store them in the "stars" variable
    const stars = document.querySelectorAll('.star');
    console.log(stars)
    stars.forEach((star, index) => {
        // Add a click event listener to the current star
        star.addEventListener('click', () => {
            // Fill in clicked star and stars before it
            for (let i = 0; i <= index; i++) {
                // Change the text content of stars to 'star' (filled)
                document.getElementById(`star${i + 1}`).textContent = 'star';
            }
            for (let i = index + 1; i <= 4; i++) {
                document.getElementById(`star${i + 1}`).textContent = 'star_outline';
            }
            console.log(`rating star: ${index + 1}`);
        });
    });
}

async function update_rating() {
    let userDoc = await db.collection("users").doc(seller_ID).get();
    let rating_average = userDoc.data().rating;
    let rating_count = userDoc.data().rating_count;

    const stars = document.querySelectorAll('.star');

    // Iterate through each star element
    let rating_new = 0;
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            rating_new++;
        }
    });

    // calculate new rating
    rating_total = rating_average * rating_count;
    rating_count++;
    rating_average = (rating_total + rating_new) / rating_count

    field_update = {
        "rating": rating_average,
        "rating_count": rating_count
    }

    // update to firestore and go to thanks.html
    await db.collection("users").doc(seller_ID).update(field_update);
    console.log("rating is upload.")

    window.location.href = "thanks.html";
}


function setup() {
    console.log("rating.js is read");
    show_seller();
    click_rating();
    // update_rating();
}

$(document).ready(setup)
