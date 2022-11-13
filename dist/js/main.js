window.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();

    // Search input
    const localQuery = localStorage.getItem('searchQuery') || '';
    let searchInput = document.getElementById('elSearch');
    let searchClear = document.getElementById('elSearchClear');
    searchInput.value = localQuery;

    // Navigation
    let nav = document.getElementById('elNavigation');
    let navTpl = document.getElementById('elNavigationTpl').innerHTML;
    let navData = document.getElementById('elNavigationData').content.textContent;
    navData = JSON.parse(navData);

    // Mustache function
    let customTags = [ '<%', '%>' ];

    function template(tpl, data) {
        Mustache.tags = customTags;
        Mustache.parse(tpl);
        let rendered = Mustache.render(tpl, data);
        return rendered;
    };

    // Live search
    function liveSearch() {
        let data;
        let query = searchInput.value.toLowerCase();
        localStorage.setItem('searchQuery', query);

        if (query == '') {
            data = navData;
        } else {
            let filteredData = {
                nav: []
            };
            navData.nav.forEach(el =>{
                let filtered = el.data.filter(element => {
                    let search = element.name.toLowerCase().indexOf(query) != -1;
                    return search;
                });

                let item = {
                    folder: el.folder,
                    open: true,
                    data: filtered,
                    hidden: filtered.length == 0
                };

                filteredData.nav.push(item);
            });
            data = filteredData;
        }

        nav.innerHTML = template(navTpl, data);
    };

    //A little delay
    let typingTimer;
    let typeInterval = 500;

    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(liveSearch, typeInterval);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        liveSearch();
    });

    liveSearch();
});
