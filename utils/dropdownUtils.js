// utils/dropdownUtils.js
export function createOption(item, index) {
    const option = document.createElement('option');
    if (typeof item === 'object') {
        Object.assign(option, item);
    } else {
        option.value = item.toLowerCase();
        option.textContent = item;
        if (index === 1) option.selected = true;
    }
    return option;
}

export function populateDropdown(dropdown, items) {
    dropdown.innerHTML = '';
    items.forEach((item, index) => {
        const option = createOption(item, index);
        dropdown.appendChild(option);
    });
}

export function updateOptionsWithDefault(dropdown, options, defaultText) {
    dropdown.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = options.length ? defaultText : 'No options available';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);

    // Add other options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = typeof option === 'object' ? option.value : option.toLowerCase();
        optionElement.textContent = typeof option === 'object' ? option.text : option;
        dropdown.appendChild(optionElement);
    });
}