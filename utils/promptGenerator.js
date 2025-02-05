export function setupEventListeners(
    languageDropdown, 
    programmingLanguageDropdown, 
    frameworkDropdown, 
    objectiveDropdown, 
    proficiencyDropdown, 
    mainTopicDropdown, 
    subTopicDropdown, 
    subTopic2Dropdown, 
    promptTextarea,
    subTopicCustomInput
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
            }
            updatePrompt();
        });
    });

    // Add event listener for custom input
    subTopicCustomInput.addEventListener('input', updatePrompt);

    // Specific topic dropdown listeners
    mainTopicDropdown.addEventListener('change', updatePrompt);
    subTopicDropdown.addEventListener('change', updatePrompt);
    subTopic2Dropdown.addEventListener('change', updatePrompt);

    // Prompt update function
    function updatePrompt() {
        const selections = {
            language: languageDropdown.value || '[Language]',
            programmingLang: programmingLanguageDropdown.value || '[Programming Language]',
            framework: frameworkDropdown.value || '[Framework]',
            objective: objectiveDropdown.value || '[Objective]',
            proficiency: proficiencyDropdown.value || '[Proficiency Level]',
            mainTopic: mainTopicDropdown.value || '[Main Topic]',
            subTopic: subTopicDropdown.value || '[Sub Topic]',
            subTopic2: subTopic2Dropdown.value || '[Sub Topic Level 2]',
            customSubTopic: subTopicCustomInput.value || '[Custom Sub Topic]'
        };

        promptTextarea.value = `As a ${selections.proficiency} developer familiar with ${selections.programmingLang}, ${selections.objective.toLowerCase()} ${selections.framework} development in ${selections.language}. Provide step-by-step guidance for: ${selections.mainTopic} focusing on ${selections.subTopic}, ${selections.subTopic2}, and specifically ${selections.customSubTopic}.`;
    }
}