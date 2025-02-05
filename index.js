import { languages, programmingLanguages, objectives, proficiencyItems } from './data/languages.js';
import { topicHierarchy } from './data/topicHierarchy.js';
import { frameworksByLanguage } from './data/frameworks.js';
import { populateDropdown } from './utils/dropdownUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const languageDropdown = document.getElementById('language');
    const programmingLanguageDropdown = document.getElementById('programming-language');
    const frameworkDropdown = document.getElementById('framework');
    const objectiveDropdown = document.getElementById('objective');
    const proficiencyDropdown = document.getElementById('level');
    const mainTopicDropdown = document.getElementById('main-topic');
    const subTopicDropdown = document.getElementById('sub-topic');
    const subTopic2Input = document.getElementById('sub-topic-2'); // Changed to text input
    const generatedPromptTextarea = document.getElementById('generated-prompt');
    const copyButton = document.querySelector('.copy-btn');

    // Populate dropdowns
    populateDropdown(languageDropdown, languages);
    populateDropdown(programmingLanguageDropdown, programmingLanguages);
    populateDropdown(objectiveDropdown, objectives);
    populateDropdown(proficiencyDropdown, proficiencyItems);

    // Update frameworks based on programming language
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
    }

    // Update main topics based on programming language
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

    // Update sub topics based on main topic
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

        // Clear custom sub-topic input
        subTopic2Input.value = '';
    }

    // Update prompt
    function updatePrompt() {
        const selections = {
            language: languageDropdown.value || '[Language]',
            programmingLang: programmingLanguageDropdown.value || '[Programming Language]',
            framework: frameworkDropdown.value || '[Framework]',
            objective: objectiveDropdown.value || '[Objective]',
            proficiency: proficiencyDropdown.value || '[Proficiency Level]',
            mainTopic: mainTopicDropdown.value || '[Main Topic]',
            subTopic: subTopicDropdown.value || '[Sub Topic]',
            subTopic2: subTopic2Input.value || '[Specific Focus]'
        };

        generatedPromptTextarea.value = `As a ${selections.proficiency} developer familiar with ${selections.programmingLang}, ${selections.objective.toLowerCase()} ${selections.framework} development in ${selections.language}. Provide step-by-step guidance for: ${selections.mainTopic} focusing on ${selections.subTopic} and specifically addressing ${selections.subTopic2}.`;
    }

    // Copy prompt functionality
    copyButton.addEventListener('click', () => {
        generatedPromptTextarea.select();
        document.execCommand('copy');
        
        // Optional: Temporary visual feedback
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.innerHTML = '<span class="btn-text">Copy Prompt</span><span class="btn-icon">📋</span>';
        }, 1500);
    });

    // Event listeners
    programmingLanguageDropdown.addEventListener('change', () => {
        updateFrameworkOptions();
        updateMainTopics();
        updatePrompt();
    });

    mainTopicDropdown.addEventListener('change', () => {
        updateSubTopics();
        updatePrompt();
    });

    // Add change event listeners to all dropdowns and input to update prompt
    [
        languageDropdown, 
        programmingLanguageDropdown, 
        frameworkDropdown, 
        objectiveDropdown, 
        proficiencyDropdown,
        mainTopicDropdown,
        subTopicDropdown
    ].forEach(dropdown => {
        dropdown.addEventListener('change', updatePrompt);
    });

    // Add input event listener for sub-topic 2 input
    subTopic2Input.addEventListener('input', updatePrompt);

    // Initial setup
    updateFrameworkOptions();
});