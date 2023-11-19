var advanced_queries = {}

function advancedSearchQuery() {
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
    console.log(advanced_queries)
    sessionStorage.setItem('advanced_queries', JSON.stringify(advanced_queries));
}

function get_value(selector) {
    if ($(`#${selector}`).val() != null) {
        console.log($(`#${selector}`).val())
        advanced_queries[`${selector}`] = $(`#${selector}`).val()
    }
}