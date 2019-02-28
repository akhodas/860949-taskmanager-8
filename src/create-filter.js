const createFilter = (configFilter) => {
  return `
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
};

export default createFilter;
