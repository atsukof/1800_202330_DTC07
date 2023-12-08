docID_array = [];
json_data = undefined;


async function get_collection() {
    // get all doc.id of documents in this collection
    // ------------------------------------------------------------
    // change "items" to target collection named
    const docRef = await db.collection("items").get();
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    docRef.forEach(doc => {
        docID_array.push(doc.id)
    });
}


async function get_collection_Jsonfile() {
    // read collection template json
    // ------------------------------------------------------------
    // change to correspond json file
    const json_filepath = "../json/items.json";
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    const resp = await fetch(json_filepath);
    json_data = await resp.json();
}

async function update_all_doc_field(json_data, docID_array) {
    // update a field for all documents
    for (let id of docID_array) {
        // ------------------------------------------------------------
        // ------------------------------------------------------------
        // change "items" to target collection name
        const docRef = await db.collection("items").doc(id).get();
        // ------------------------------------------------------------
        // ------------------------------------------------------------
        for (let key in json_data) {
            is_exist = await docRef.data().hasOwnProperty(key)
            if (is_exist == false) {
                field_update = { [key]: '' }
                // ------------------------------------------------------------
                // change "items" to target collection name
                db.collection("items").doc(id).update(field_update).then(
                    // ------------------------------------------------------------
                    // ------------------------------------------------------------
                    () => {
                        console.log(`${key} is updated`)
                    }
                    )
            }
        }
    }
}

async function delete_target_field(docID_array) {
    // delete a field for all documents
    for (let id of docID_array) {
        // ------------------------------------------------------------
        // ------------------------------------------------------------
        // change "items" to target collection name
        // change "key" to target field name
        const docRef = await db.collection("items").doc(id).get();
        key = "test_field_01"
        // ------------------------------------------------------------
        // ------------------------------------------------------------
        is_exist = await docRef.data().hasOwnProperty(key)
        if (is_exist == true) {
            console.log(`${key} is ${is_exist}`);
            // ------------------------------------------------------------
            // ------------------------------------------------------------
            // change "items" to target collection name
            db.collection("items").doc(id).update({
                // ------------------------------------------------------------
                // ------------------------------------------------------------
                [key]: firebase.firestore.FieldValue.delete()
            });
            console.log(`${key} is deleted`);
        }
    }
}



async function setup() {
    // when document is ready, operate a specific collection
    await get_collection();
    await get_collection_Jsonfile();
    // update_all_doc_field(json_data, docID_array);
    // delete_item_field(docID_array)
}

$(document).ready(setup);