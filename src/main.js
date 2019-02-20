function createFilters() {
    const configFilters = [
        {
            id: `all`,
            count: 9,
            checked: true
        },
        {
            id: `overdue`,
            count: 8
        },
        {
            id: `today`,
            count: 7
        },
        {
            id: `favorites`,
            count: 0
        },
        {
            id: `repeating`,
            count: 5
        },
        {
            id: `tags`,
            count: 4
        },
        {
            id: `archive`,
            count: 3
        }
    ];

    const mainFilter = document.getElementsByClassName(`main__filter`)[0];

    if (mainFilter) {
        const filters = createFiltersList(configFilters);

        mainFilter.innerHTML = filters;
    }

    function createFiltersList(configFilters = []) {
        return configFilters.reduce((result, current) => result + createFilter(current), ``);
    }

    function createFilter(configFilter) {
        const result = `
        <input
            type="radio"
            id="filter__${configFilter.id}"
            class="filter__input visually-hidden"
            name="filter"
            ${configFilter.checked ? `checked` : ``}
            ${configFilter.count ? `` : `disabled`}
        />
        <label for="filter__${configFilter.id}" class="filter__label">
            ${configFilter.title || configFilter.id.toUpperCase()} 
            <span class="filter__${configFilter.id}-count">
                ${configFilter.count}
            </span>
        </label>
    `;

        return result;
    }
}

createFilters();