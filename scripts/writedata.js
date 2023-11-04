function writeComments() {
    //define a variable for the collection you want to create in Firestore to populate data
    var commentsRef = db.collection("comments");
    commentsRef.add({
        item_ID: "a001",
        comment_user_ID: "aaa",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("April 2, 2023")),
        comment_text: "Is the work desk still available? I have a budget of $150 in mind; would you consider selling it at that price?"
    });
    commentsRef.add({
        item_ID: "a001",
        comment_user_ID: "bbb",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("April 3, 2023")),
        comment_text: "Hi, I'm interested in your work desk. Could you provide the exact dimensions (length, width, and height) of the desk?"
    });
    commentsRef.add({
        item_ID: "a001",
        comment_user_ID: "ccc",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("April 4, 2023")),
        comment_text: "The work desk measures 48 inches in length, 24 inches in width, and 30 inches in height."
    });
    commentsRef.add({
        item_ID: "a001",
        comment_user_ID: "ccc",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("April 4, 2023")),
        comment_text: "Yes, the desk is still available. I could consider your offer of $150 if you're able to pick it up this weekend."
    });
    commentsRef.add({
        item_ID: "a002",
        comment_user_ID: "aaa",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2023")),
        comment_text: "Hi, I'm interested in your laptop. Could you please provide more details about its specifications and any potential issues it might have?"
    });
    commentsRef.add({
        item_ID: "a002",
        comment_user_ID: "bbb",
        comment_date: firebase.firestore.Timestamp.fromDate(new Date("March 12, 2023")),
        comment_text: "Is the laptop still available, and if so, could you share some photos of it so I can assess its condition?"
    });
}