# Project Title

## 1. Project Description
Our team DTC07 is developing a web application to help people who want to purchase/sell second-hand household items to enhance user experience by improving user interface and transaction security.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, I'm Alice! Excited to work with everyone!
* I am Atsuko. I'm excited to join the team.
* Chun-Wei Mo.
	
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
* ...
* ...
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* goBack function cannot work on confirm purchase page, so redirect to previous listing page. It will cause a loop if click back button on the listing page.
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Message feature
* Seller can rate buyer after complete the trade
* ...
	
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
├── index.html              # Landing HTML file, this is what users see when ├you come to url
├── main.html               # Main page, all user can see this page
├── add_listing.html        # Create listing page, user can create a new listing 
├── search.html             # Search page, show search result from main page
├── advanced_search.html    # Advanced search page, can search items by specific conditions
├── listing.html            # Listing page, show item details, user who login can see Buy button; seller can Edit instead. Any user can write comments in the comment box
├── edit.html               # Edit listing page, Seller can edit their item details here
├── profile.html            # User profile page, show user name, user rating, active listings, and sold listing
├── confirm_purchase.html   # Confirm purchase page, after clicking Buy button on listing page, user can see the summary of item, and Click confirm or Cancel button
├── rating.html             # Rating page, after confirm purchase, user can rate their trading partner
├── thanks.html             # Show thanks message page, click confirm to go back to main page.
├── message.html            # Message log page, show all message of the user
├── message_id.html         # Message page, user can send message to another user
├── purchase_successful.html# Purchase successfully page, tell user what to do next
├── template.html           # html template
├── 404.html                # Create automatically when deploy the website
├── firebase.json           # Create automatically when deploy the website
├── firestore.rules         # Create automatically when deploy the website
├── storage.rule            # Create automatically when deploy the website
├── storage.rules           # Create automatically when deploy the website

└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /blah.js                 # 
├── styles                   # Folder for styles
    /blah.css                # 



```


