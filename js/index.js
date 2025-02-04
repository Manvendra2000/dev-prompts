document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements with null checks
    const elements = {
      language: document.getElementById('language'),
      programmingLanguage: document.getElementById('programming-language'),
      framework: document.getElementById('framework'),
      objective: document.getElementById('objective'),
      level: document.getElementById('level'),
      mainTopic: document.getElementById('main-topic'),
      subTopic: document.getElementById('sub-topic'),
      subTopic2: document.getElementById('sub-topic-2'),
      promptOutput: document.getElementById('generated-prompt'),
      copyBtn: document.querySelector('.copy-btn')
    };
  
    // Verify all elements exist
    if (Object.values(elements).some(el => !el)) {
      console.error('Missing elements:', Object.entries(elements).filter(([_, el]) => !el).map(([name]) => name));
      return;
    }
  
    // Curriculum Data
    const curriculumData = {
      languages: ['English', 'Hindi', 'Spanish'],
      programmingLanguages: {
        English: ['JavaScript', 'Python', 'HTML'],
        Hindi: ['JavaScript', 'Python'],
        Spanish: ['JavaScript']
      },
      frameworks: {
        JavaScript: ['React', 'Vue', 'Node.js'],
        Python: ['Django', 'Flask'],
        HTML: ['None']
      },
      objectives: ['Learn', 'Practice', 'Debug'],
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      topics: {
        React: {
          mainTopics: ['Components', 'State Management', 'Routing'],
          subTopics: {
            Components: ['Class Components', 'Functional Components'],
            'State Management': ['useState', 'useReducer']
          }
        },
        Vue: {
          mainTopics: ['Vue Instance', 'Components', 'Directives'],
          subTopics: {
            'Vue Instance': ['Data Properties', 'Methods']
          }
        }
      }
    };
  
    // Dropdown Population
    const populateDropdown = (dropdown, options, placeholder = 'Select') => {
      dropdown.innerHTML = `
        <option value="" disabled selected>${placeholder}</option>
        ${(options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
      `;
    };
  
    // Cascade Update
    const updateDropdownChain = (currentDropdown, nextKey) => {
      const value = currentDropdown.value;
      const nextDropdown = elements[nextKey];
      
      if (!nextDropdown) return;
  
      switch(currentDropdown.id) {
        case 'language':
          populateDropdown(nextDropdown, curriculumData.programmingLanguages[value]);
          break;
        case 'programming-language':
          populateDropdown(nextDropdown, curriculumData.frameworks[value]);
          break;
        case 'framework':
          populateDropdown(elements.objective, curriculumData.objectives);
          populateDropdown(elements.level, curriculumData.levels);
          break;
        case 'main-topic':
          const framework = elements.framework.value;
          populateDropdown(nextDropdown, curriculumData.topics[framework]?.subTopics[value]);
          break;
      }
  
      // Reset subsequent dropdowns
      const dropdownOrder = ['language', 'programming-language', 'framework', 'objective', 
                            'level', 'main-topic', 'sub-topic', 'sub-topic-2'];
      const startIndex = dropdownOrder.indexOf(nextKey) + 1;
      dropdownOrder.slice(startIndex).forEach(key => {
        populateDropdown(elements[key], [], 'Select previous first');
      });
    };
  
    // Event Listeners
    Object.values(elements).forEach(el => {
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', (e) => {
          const nextKey = e.target.dataset.next;
          if (nextKey) updateDropdownChain(e.target, nextKey);
          updatePrompt();
        });
      }
    });
  
    // Copy Functionality
    elements.copyBtn.addEventListener('click', () => {
      elements.promptOutput.select();
      document.execCommand('copy');
      elements.copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        elements.copyBtn.innerHTML = '<span class="btn-text">Copy Prompt</span><span class="btn-icon">📋</span>';
      }, 2000);
    });
  
    // Prompt Generation
    const updatePrompt = () => {
      const selections = {
        language: elements.language.value,
        programming: elements.programmingLanguage.value,
        framework: elements.framework.value,
        objective: elements.objective.value,
        level: elements.level.value,
        mainTopic: elements.mainTopic.value,
        subTopic: elements.subTopic.value,
        subTopic2: elements.subTopic2.value
      };
  
      elements.promptOutput.value = `
        Act as a ${selections.level.toLowerCase()} coding instructor teaching in ${selections.language}.
        Create ${selections.objective.toLowerCase()} material for ${selections.programming}
        ${selections.framework ? `using ${selections.framework}` : ''}.
        Focus on: ${[selections.mainTopic, selections.subTopic, selections.subTopic2].filter(Boolean).join(' → ')}.
        Provide practical examples and explain concepts clearly.
      `.trim().replace(/\n\s+/g, '\n');
    };
  
    // Initialize first dropdown
    populateDropdown(elements.language, curriculumData.languages, 'Select Language');
  });