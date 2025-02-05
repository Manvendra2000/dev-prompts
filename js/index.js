// Get DOM elements
const languageDropdown = document.getElementById('language');
const programmingLanguageDropdown = document.getElementById('programming-language');
const frameworkDropdown = document.getElementById('framework');
const promptTextarea = document.getElementById('generated-prompt');
const objectiveDropdown = document.getElementById('objective');
const proficiencyDropdown = document.getElementById('level');

// Language options
const languages = [
    { value: '', text: 'Select Language', disabled: true },
    'English', 'Spanish', 'French', 'German', 
    'Chinese', 'Japanese', 'Arabic', 'Russian',
    'Portuguese', 'Italian', 'Dutch', 'Korean'
];

// Programming language options
const programmingLanguages = [
    { value: '', text: 'Select Programming Language', disabled: true },
    'JavaScript', 'Python', 'Java', 'C#', 'PHP',
    'Ruby', 'Swift', 'Go', 'TypeScript', 'Kotlin'
];

const frameworksByLanguage = {
    'javascript': ['React', 'Angular', 'Vue.js', 'Node.js', 'Express.js'],
    'python': ['Django', 'Flask', 'FastAPI', 'Pyramid'],
    'java': ['Spring', 'Hibernate', 'JavaServer Faces'],
    'php': ['Laravel', 'Symfony', 'CodeIgniter'],
    'ruby': ['Ruby on Rails', 'Sinatra'],
    'typescript': ['Angular', 'Next.js', 'NestJS'],
    'c#': ['.NET Core', 'ASP.NET', 'Xamarin'],
    'go': ['Gin', 'Echo', 'Fiber'],
    'kotlin': ['Spring Boot', 'Ktor', 'Android'],
    'swift': ['SwiftUI', 'UIKit']
};

// Objectives options
const objectives = [
    { value: '', text: 'Select Objective', disabled: true },
    'Learn', 'Practice'
];

// Proficiency levels
const proficiencyItems = [
    { value: '', text: 'Select Proficiency Level', disabled: true },
    'Beginner', 'Intermediate', 'Advanced'
];

// Populate all dropdowns
function populateDropdowns() {
    // Language dropdown
    languages.forEach((lang, index) => {
        const option = createOption(lang, index);
        languageDropdown.appendChild(option);
    });

    // Programming Language dropdown
    programmingLanguages.forEach((lang, index) => {
        const option = createOption(lang, index);
        programmingLanguageDropdown.appendChild(option);
    });

    // Objective dropdown
    objectives.forEach((obj, index) => {
        const option = createOption(obj, index);
        objectiveDropdown.appendChild(option);
    });

    // Proficiency dropdown
    proficiencyItems.forEach((prof, index) => {
        const option = createOption(prof, index);
        proficiencyDropdown.appendChild(option);
    });
}

function createOption(item, index) {
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

// Update framework options
function updateFrameworkOptions() {
    frameworkDropdown.innerHTML = '';
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const frameworks = frameworksByLanguage[selectedLang] || [];

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = frameworks.length ? 'Select Framework (optional)' : 'No frameworks available';
    defaultOption.disabled = !frameworks.length;
    frameworkDropdown.appendChild(defaultOption);

    // Add framework options
    frameworks.forEach(framework => {
        const option = document.createElement('option');
        option.value = framework;
        option.textContent = framework;
        frameworkDropdown.appendChild(option);
    });

    frameworkDropdown.disabled = !frameworks.length;
}

// Update prompt template
function updatePrompt() {
    const selections = {
        language: languageDropdown.value || '[Language]',
        programmingLang: programmingLanguageDropdown.value || '[Programming Language]',
        framework: frameworkDropdown.value || '[Framework]',
        objective: objectiveDropdown.value || '[Objective]',
        proficiency: proficiencyDropdown.value || '[Proficiency Level]'
    };

    promptTextarea.value = `As a ${selections.proficiency} developer familiar with ${selections.programmingLang}, ${selections.objective.toLowerCase()} ${selections.framework} development in ${selections.language}. Provide step-by-step guidance for: [Main Topic] focusing on [Sub Topic] and [Sub Topic Level 2].`;
}

// Initialize and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    updateFrameworkOptions();
    updatePrompt();

    // Add event listeners to all dropdowns
    const allDropdowns = [languageDropdown, programmingLanguageDropdown, frameworkDropdown, objectiveDropdown, proficiencyDropdown];
    allDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            if (dropdown === programmingLanguageDropdown) {
                updateFrameworkOptions();
            }
            updatePrompt();
        });
    });
});