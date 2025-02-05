// Get DOM elements
const languageDropdown = document.getElementById('language');
const programmingLanguageDropdown = document.getElementById('programming-language');
const frameworkDropdown = document.getElementById('framework');
const promptTextarea = document.getElementById('generated-prompt');
const objectiveDropdown = document.getElementById('objective');
const proficiencyDropdown = document.getElementById('level');
const mainTopicDropdown = document.getElementById('main-topic');
const subTopicDropdown = document.getElementById('sub-topic');
const subTopic2Dropdown = document.getElementById('sub-topic-2');

// Topic hierarchy data structure - simplified without difficulty levels
const topicHierarchy = {
    'javascript': {
        'DOM Manipulation': {
            'Event Handling': ['Event Bubbling', 'Event Delegation', 'Custom Events', 'Event Prevention'],
            'DOM Traversal': ['Parent/Child Selection', 'Siblings', 'Query Selectors', 'Element Properties'],
            'DOM Modification': ['Creating Elements', 'Modifying Attributes', 'Changing Styles', 'Template Literals']
        },
        'Functions': {
            'Function Types': ['Function Declarations', 'Function Expressions', 'Arrow Functions', 'IIFE'],
            'Advanced Concepts': ['Closures', 'Callbacks', 'Higher-Order Functions', 'Function Composition'],
            'Function Context': ['this Keyword', 'Bind/Call/Apply', 'Method Borrowing', 'Lexical Scope']
        },
        'Asynchronous Programming': {
            'Promises': ['Promise Creation', 'Promise Chaining', 'Error Handling', 'Promise.all/race'],
            'Async/Await': ['Async Functions', 'Error Handling', 'Parallel Execution', 'Sequential Execution'],
            'Event Loop': ['Call Stack', 'Callback Queue', 'Microtasks', 'Macrotasks']
        },
        'Data Structures': {
            'Arrays': ['Array Methods', 'Array Iteration', 'Array Transformations', 'TypedArrays'],
            'Objects': ['Object Methods', 'Property Descriptors', 'Prototypes', 'Object Inheritance'],
            'Maps and Sets': ['Map Operations', 'Set Operations', 'WeakMap', 'WeakSet']
        }
    },
    'python': {
        'Data Structures': {
            'Lists': ['List Comprehension', 'List Methods', 'Slicing', 'Sorting'],
            'Dictionaries': ['Dictionary Methods', 'Dictionary Comprehension', 'Nested Dictionaries', 'DefaultDict'],
            'Sets': ['Set Operations', 'Frozen Sets', 'Set Methods', 'Set Theory']
        },
        'Functions': {
            'Function Basics': ['Parameters', 'Return Values', 'Docstrings', 'Lambda Functions'],
            'Decorators': ['Function Decorators', 'Class Decorators', 'Decorator Factories', 'Built-in Decorators'],
            'Generators': ['Yield Statement', 'Generator Expressions', 'Send Method', 'Yield From']
        },
        'OOP': {
            'Classes': ['Class Creation', 'Instance Methods', 'Class Methods', 'Static Methods'],
            'Inheritance': ['Single Inheritance', 'Multiple Inheritance', 'Method Resolution', 'Abstract Classes'],
            'Magic Methods': ['Constructors', 'Operators', 'Container Methods', 'Context Managers']
        },
        'File Handling': {
            'Text Files': ['Reading', 'Writing', 'Appending', 'Context Managers'],
            'Binary Files': ['Read/Write Binary', 'Seeking', 'Buffer Management', 'Memory Mapping'],
            'File Systems': ['Path Operations', 'Directory Operations', 'File Attributes', 'Temporary Files']
        }
    }
    // Add more programming languages as needed
};


// Function to populate main topics based on programming language
function updateMainTopics() {
    mainTopicDropdown.innerHTML = '';
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const topics = topicHierarchy[selectedLang] || {};

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = Object.keys(topics).length ? 'Select Main Topic' : 'No topics available';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    mainTopicDropdown.appendChild(defaultOption);

    // Add topic options
    Object.keys(topics).forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        mainTopicDropdown.appendChild(option);
    });

    // Clear dependent dropdowns
    updateSubTopics();
}

// Function to populate sub topics based on main topic
function updateSubTopics() {
    subTopicDropdown.innerHTML = '';
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const selectedMainTopic = mainTopicDropdown.value;
    const subTopics = topicHierarchy[selectedLang]?.[selectedMainTopic] || {};

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = Object.keys(subTopics).length ? 'Select Sub Topic' : 'No sub-topics available';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    subTopicDropdown.appendChild(defaultOption);

    // Add sub-topic options
    Object.keys(subTopics).forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        subTopicDropdown.appendChild(option);
    });

    // Clear dependent dropdown
    updateSubTopics2();
}

// Function to populate sub topics level 2
function updateSubTopics2() {
    subTopic2Dropdown.innerHTML = '';
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const selectedMainTopic = mainTopicDropdown.value;
    const selectedSubTopic = subTopicDropdown.value;
    const subTopics2 = topicHierarchy[selectedLang]?.[selectedMainTopic]?.[selectedSubTopic] || [];

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = subTopics2.length ? 'Select Sub Topic Level 2' : 'No sub-topics available';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    subTopic2Dropdown.appendChild(defaultOption);

    // Add sub-topic level 2 options
    subTopics2.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        subTopic2Dropdown.appendChild(option);
    });
}



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
    // Add event listeners for topic dropdowns
    programmingLanguageDropdown.addEventListener('change', () => {
        updateFrameworkOptions();
        updateMainTopics();
        updatePrompt();
    });

    mainTopicDropdown.addEventListener('change', () => {
        updateSubTopics();
        updatePrompt();
    });

    subTopicDropdown.addEventListener('change', () => {
        updateSubTopics2();
        updatePrompt();
    });

    subTopic2Dropdown.addEventListener('change', updatePrompt);
});