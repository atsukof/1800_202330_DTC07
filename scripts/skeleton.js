//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------   

function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
            //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.

            var user_ID = user.uid

            $('#navbar-here').load('./templates/navbar-after.html', function () {
                $("#navbar-here #link-to-profile").attr('href', `../profile.html?userID=${user_ID}`)
            });

            console.log($('#footer-here').load('./templates/footer-after.html'));
        } else {
            // No user is signed in.
            console.log($('#navbar-here').load('./templates/navbar-before.html'));
            console.log($('#footer-here').load('./templates/footer-before.html'));
        }
    });
}
loadSkeleton(); //invoke the function