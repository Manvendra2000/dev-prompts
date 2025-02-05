// handlers/eventHandlers.js
import { topicHierarchy } from '../data/topicHierarchy.js';
import { frameworksByLanguage } from '../data/frameworks.js';
import { updateOptionsWithDefault } from '../utils/dropdownUtils.js';
import { generatePrompt } from '../utils/promptGenerator.js';

export function updateMainTopics(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown, subTopic2Dropdown, subTopicCustomInput) {
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const topics = topicHierarchy[selectedLang] || {};

    updateOptionsWithDefault(
        mainTopicDropdown, 
        Object.keys(topics), 
        Object.keys(topics).length ? 'Select Main Topic' : 'No main topics available'
    );

    // Clear dependent dropdowns and custom input
    updateSubTopics(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown, subTopic2Dropdown, subTopicCustomInput);
}

export function updateSubTopics(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown, subTopicCustomInput) {
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const selectedMainTopic = mainTopicDropdown.value;
    const subTopics = topicHierarchy[selectedLang]?.[selectedMainTopic] || {};

    updateOptionsWithDefault(
        subTopicDropdown, 
        Object.keys(subTopics), 
        Object.keys(subTopics).length ? 'Select Sub Topic' : 'No sub-topics available'
    );

    // Clear dependent dropdown and custom input
    updateSubTopics2(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown);
    subTopicCustomInput.value = '';
}

export function updateSubTopics2(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown) {
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const selectedMainTopic = mainTopicDropdown.value;
    const selectedSubTopic = subTopicDropdown.value;
    const subTopics2 = topicHierarchy[selectedLang]?.[selectedMainTopic]?.[selectedSubTopic] || [];

    updateOptionsWithDefault(
        subTopic2Dropdown, 
        subTopics2, 
        subTopics2.length ? 'Select Sub Topic Level 2' : 'No sub-topics available'
    );
}

export function updateFrameworkOptions(programmingLanguageDropdown, frameworkDropdown) {
    const selectedLang = programmingLanguageDropdown.value.toLowerCase();
    const frameworks = frameworksByLanguage[selectedLang] || [];

    updateOptionsWithDefault(
        frameworkDropdown, 
        frameworks, 
        frameworks.length ? 'Select Framework (optional)' : 'No frameworks available'
    );

    frameworkDropdown.disabled = !frameworks.length;
}

export function setupEventListeners(
    languageDropdown, 
    programmingLanguageDropdown, 
    frameworkDropdown, 
    objectiveDropdown, 
    proficiencyDropdown, 
    mainTopicDropdown, 
    subTopicDropdown, 
    subTopic2Dropdown,
    subTopicCustomInput,
    promptTextarea
) {
    const allDropdowns = [
        languageDropdown, 
        programmingLanguageDropdown, 
        frameworkDropdown, 
        objectiveDropdown, 
        proficiencyDropdown
    ];

    // Generic dropdown update listeners
    allDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            if (dropdown === programmingLanguageDropdown) {
                updateFrameworkOptions(programmingLanguageDropdown, frameworkDropdown);
                updateMainTopics(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown, subTopicCustomInput);
            }
            updatePrompt();
        });
    });

    // Topic hierarchy listeners
    mainTopicDropdown.addEventListener('change', () => {
        updateSubTopics(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown, subTopicCustomInput);
        updatePrompt();
    });

    subTopicDropdown.addEventListener('change', () => {
        updateSubTopics2(programmingLanguageDropdown, mainTopicDropdown, subTopicDropdown);
        updatePrompt();
    });

    subTopic2Dropdown.addEventListener('change', updatePrompt);
    
    // Custom input listener
    subTopicCustomInput.addEventListener('input', () => {
        // Clear dropdown selection when using custom input
        subTopicDropdown.value = '';
        updatePrompt();
    });

    function updatePrompt() {
        const selections = {
            language: languageDropdown.value || '[Language]',
            programmingLang: programmingLanguageDropdown.value || '[Programming Language]',
            framework: frameworkDropdown.value || '[Framework]',
            objective: objectiveDropdown.value || '[Objective]',
            proficiency: proficiencyDropdown.value || '[Proficiency Level]',
            mainTopic: mainTopicDropdown.value || '[Main Topic]',
            subTopic: subTopicDropdown.value || subTopicCustomInput.value || '[Sub Topic]',
            subTopic2: subTopic2Dropdown.value || '[Sub Topic Level 2]'
        };

        promptTextarea.value = generatePrompt(selections);
    }
}