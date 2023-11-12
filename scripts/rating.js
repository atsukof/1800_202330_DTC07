// Iterate through each star element
function rating() {
    // Select all elements with the class name "star" and store them in the "stars" variable
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        // Add a click event listener to the current star
        star.addEventListener('click', () => {
            // Fill in clicked star and stars before it
            for (let i = 0; i <= index; i++) {
                // Change the text content of stars to 'star' (filled)
                document.getElementById(`star${i + 1}`).textContent = 'star';
            }
        });
    });

}

function convert_stars_to_rating() {
    const stars = document.querySelectorAll('.star');
    // Iterate through each star element
    let rating = 0;
    // Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
        // Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
            // If the condition is met, increment the 'hikeRating' by 1
            rating++;
        }
    });
    console.log(rating);
}



function setup() {
    console.log("rating.js is read");
    rating();
    convert_stars_to_rating();
}

$(document).ready(setup)