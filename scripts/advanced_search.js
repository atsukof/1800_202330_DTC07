var advanced_queries = {}

function advancedSearchQuery() {
    // Gets the advanced search queries and stores them in session storage
    if ($("#search-input").val()) {
        advanced_queries.name = $("#search-input").val()
    } 
    get_value('type')
    get_value('subcategory')
    get_value('brand')
    get_value('colour')
    get_value('material')
    get_value('condition')
    get_value('price-range')
    get_value('location')
    sessionStorage.setItem('advanced_queries', JSON.stringify(advanced_queries));
}

function get_value(selector) {
    // Gets the value of the selector if it is not null
    if ($(`#${selector}`).val() != null) {
        advanced_queries[`${selector}`] = $(`#${selector}`).val()
    }
}