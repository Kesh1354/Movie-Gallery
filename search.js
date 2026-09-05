document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const searchWrapper = document.getElementById("search-wrapper");
    const searchInput = document.getElementById("movie-search");

    if (searchButton && searchWrapper && searchInput) {
        searchButton.addEventListener("click", function () {
            searchWrapper.classList.toggle("open");

            if (searchWrapper.classList.contains("open")) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const query = searchInput.value.trim();

                if (!window.location.pathname.endsWith("index.html") && window.location.pathname !== "/") {
                    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
});
