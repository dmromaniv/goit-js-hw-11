export function addCountriesList(items = [], parentRef) {
  const markup = items
    .map((el, idx) => {
      return `<li class="country-list-item">
      <span>${idx + 1}:</span>
      <img class="country-flag" src="${el.flags.svg}"/>  
      <span class="country-name">${el.name.official}</span>
      </li>`;
    })
    .join('');
  parentRef.innerHTML = markup;
}

export function addCountryInfo(items = [], parentRef) {
  const countriesList = Object.values(items[0].languages).join(',');
  const cardMarkup = `
    <img class="country-flag" src="${items[0].flags.svg}"/>
    
    <p class="country-name"> ${items[0].name.official}</p>
    
    <ul class="country-info-list">
        <li><p><span class="country-desc">Capital:</span> ${items[0].capital}</p></li>
        <li><p><span class="country-desc">Population:</span> ${items[0].population}</p></li>
        <li><p><span class="country-desc">Languages:</span> ${countriesList}</p></li>
    </ul>`;
  parentRef.innerHTML = cardMarkup;
}
