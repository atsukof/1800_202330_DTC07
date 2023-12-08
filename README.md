# Second Chance

## 1. Project Description
Our team DTC07 is developing a web application to help people who want to purchase/sell second-hand household items to enhance user experience by improving user interface and transaction security.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, I'm Alice! Excited to work with everyone!
* I am Atsuko. I'm excited to join the team.
* Hello, I am Mo. I am changing readme file to produce conflict, 3rd try.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Icon
* jQuery

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Have firebaseAPI.js for firebase configuration
* Initialize firestore and firebase storage

## 5. Known Bugs and Limitations
Here are some known bugs:
* goBack function cannot work on confirm purchase page, so redirect to previous listing page. It will cause a loop if click back button on the listing page.

## 6. Features for Future
What we'd like to build in the future:
* Message feature
* Seller can rate buyer after complete the trade
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore              # Git ignore file
├── images                  # Image folder
├── json                    # json file folder, firebase collection templates are in the folder
├── scripts                 # JavaScript folder
├── templates               # Navbar and footer javascript folder
├── styles                  # CSS style folder
├── .firebaserc             # Create automatically when deploy the website
├── .gitignore              # ignore files for git
├── 404.html                # Page not found, create automatically when deploy the website
├── add_listing.html        # Create listing page, user can create a new listing 
├── advanced_search.html    # Advanced search page, can search items by specific conditions
├── confirm_purchase.html   # Confirm purchase page, after clicking Buy button on listing page, user can see the summary of item, and Click confirm or Cancel button
├── edit.html               # Edit listing page, Seller can edit their item details here
├── firebase.json           # Create automatically when deploy the website
├── firestore.indexes.json  # Create automatically when deploy the website
├── firestore.indexex.json  # Create automatically when deploy the website
├── firestore.rules         # Create automatically when deploy the website
├── index.html              # Landing HTML file, this is what users see when you come to url
├── listing.html            # Listing page, show item details, user who login can see Buy button; seller can Edit instead. Any user can write comments in the comment box
├── login.html              # Login page, Login if already having an account or sign up as a new user
├── main.html               # Main page, all user can see this page
├── message_id.html         # Message page, user can send message to another user
├── message.html            # Message log page, show all message of the user
├── profile.html            # User profile page, show user name, user rating, active listings, and sold listing
├── purchase_successful.html# Purchase successfully page, tell user what to do next
├── rating.html             # Rating page, after confirm purchase, user can rate their trading partner
├── search.html             # Search page, show search result from main page
├── storage.rule            # Create automatically when deploy the website
├── storage.rules           # Create automatically when deploy the website
├── thanks.html             # Show thanks message page, click confirm to go back to main page.
├── template.html           # HTML template
├── watchlist.html          # Watchlist page, show the items added in user's watchlist
└── README.md

It has the following subfolders and files:
├── .git                    # Folder for git repo
├── .firebase               # Folder created when deploy the website
    /hosting..cache         # File created when deploy the website
├── images                  # Folder for images
    /flowchart.png          # Flowchart of purchase process
    /flowchart.svg          # Flowchart of purchase process, svg file
    /landing_background.png # Background image on the landing page
    /Second_Chance_logo.png # Big logo
    /Second_Chance.png      # Small logo
├── json                    # Folder for json file
    /comments.json          # Fields in comments collection 
    /items.json             # Fields in items collection
    /rating.json            # Fields in rating collection (rating collection deleted)
    /user.json              # Fields in user collection
├── scripts                 # Folder for scripts
    /add_listing.js         # Implement creating a new listing feature on add_listing.html
    /advanced_search.js     # Implement advanced search feature on advanced_search.html
    /authentication.js      # Handle authentication on firebase
    /confirm_purchase.js    # Implement confirm purchase feature on confirm_purchase.html
    /edit.js                # Implement editing listing feature on edit.html
    /listing.js             # Implement showing listing details, reading/ writing comments, and purchasing item features on listing.html
    /main.js                # Implement search and displaying newest listings features on main.html
    /profile.js             # Implement showing user profile and active/ sold items features on profile.html
    /rating.js              # Implement rating user features rating.html
    /script.js              # Implement logout feature
    /skeleton.js            # Implement different navbar and footer for logged-in user or unregistered user
    /updateItemInfo.js      # Operate all documents in a specific feature
    /watchlist.js           # Implement displaying items in watchlist feature on watchlist.html
    /writedata.js           # Create test cases of comments and watchlist
├── styles                  # Folder for styles
    /confirm_purchase.css   # Implement CSS on confirm_purchase.html
    /listing.css            # Implement CSS on listing.html
    /main.css               # Implement CSS on main.html
    /profile.css            # Implement CSS on profile.html
    /purchase_successful.css# Implement CSS on purchase_successful.html
    /rating.css             # Implement CSS on rating.html
    /search.css             # Implement CSS on search.html
    /style.css              # Implement CSS on navbar and footer
├── templates               # Folder for templates
    /footer-after.html      # footer for logged-in user
    /footer-before.html     # footer for unregistered user
    /navbar-after.html      # navbar for logged-in user
    /navbar-before.html     # navbar for logged-in user
```


