// data/topicHierarchy.js
// export const topicHierarchy = {
//     'javascript': {
//         'DOM Manipulation': {
//             'Event Handling': ['Event Bubbling', 'Event Delegation', 'Custom Events', 'Event Prevention'],
//             'DOM Traversal': ['Parent/Child Selection', 'Siblings', 'Query Selectors', 'Element Properties'],
//             'DOM Modification': ['Creating Elements', 'Modifying Attributes', 'Changing Styles', 'Template Literals']
//         },
//         // ... (rest of the JavaScript topics remain the same)
//     },
//     'python': {
//         'Data Structures': {
//             'Lists': ['List Comprehension', 'List Methods', 'Slicing', 'Sorting'],
//             // ... (rest of the Python topics remain the same)
//         }
//         // ... 
//     }
// };


export const topicHierarchy = {
    'javascript': {
        'DOM Manipulation': {
            'Event Handling': [
                'Event Bubbling', 
                'Event Delegation', 
                'Custom Events', 
                'Event Prevention',
                'Async Event Handling',
                'Event Throttling/Debouncing'
            ],
            'DOM Traversal': [
                'Parent/Child Selection', 
                'Siblings', 
                'Query Selectors', 
                'Element Properties',
                'Closest Element Search',
                'Nested Element Manipulation'
            ],
            'DOM Modification': [
                'Creating Elements', 
                'Modifying Attributes', 
                'Changing Styles', 
                'Template Literals',
                'Dynamic Content Insertion',
                'Element Cloning'
            ]
        },
        'Functions': {
            'Function Types': [
                'Function Declarations', 
                'Function Expressions', 
                'Arrow Functions', 
                'IIFE',
                'Generator Functions',
                'Async Functions'
            ],
            'Advanced Concepts': [
                'Closures', 
                'Callbacks', 
                'Higher-Order Functions', 
                'Function Composition',
                'Currying',
                'Partial Application'
            ],
            'Function Context': [
                'this Keyword', 
                'Bind/Call/Apply', 
                'Method Borrowing', 
                'Lexical Scope',
                'Arrow Function Context',
                'Explicit Binding'
            ]
        },
        'Asynchronous Programming': {
            'Promises': [
                'Promise Creation', 
                'Promise Chaining', 
                'Error Handling', 
                'Promise.all/race',
                'Promise Composition',
                'Promise Cancellation'
            ],
            'Async/Await': [
                'Async Functions', 
                'Error Handling', 
                'Parallel Execution', 
                'Sequential Execution',
                'Async Iteration',
                'Top-Level Await'
            ],
            'Event Loop': [
                'Call Stack', 
                'Callback Queue', 
                'Microtasks', 
                'Macrotasks',
                'Task Scheduling',
                'Performance Optimization'
            ]
        },
        'Data Structures': {
            'Arrays': [
                'Array Methods', 
                'Array Iteration', 
                'Array Transformations', 
                'TypedArrays',
                'Immutable Array Operations',
                'Advanced Filtering Techniques'
            ],
            'Objects': [
                'Object Methods', 
                'Property Descriptors', 
                'Prototypes', 
                'Object Inheritance',
                'Object Composition',
                'Proxy and Reflect'
            ],
            'Maps and Sets': [
                'Map Operations', 
                'Set Operations', 
                'WeakMap', 
                'WeakSet',
                'Efficient Data Storage',
                'Advanced Set Manipulations'
            ]
        }
    },
    'python': {
        'Data Structures': {
            'Lists': [
                'List Comprehension', 
                'List Methods', 
                'Slicing', 
                'Sorting',
                'Advanced List Operations',
                'Functional List Manipulations'
            ],
            'Dictionaries': [
                'Dictionary Methods', 
                'Dictionary Comprehension', 
                'Nested Dictionaries', 
                'DefaultDict',
                'OrderedDict',
                'Advanced Key-Value Techniques'
            ],
            'Sets': [
                'Set Operations', 
                'Frozen Sets', 
                'Set Methods', 
                'Set Theory',
                'Performance Considerations',
                'Advanced Set Manipulations'
            ]
        },
        'Functions': {
            'Function Basics': [
                'Parameters', 
                'Return Values', 
                'Docstrings', 
                'Lambda Functions',
                'Variable-Length Arguments',
                'Keyword Arguments'
            ],
            'Decorators': [
                'Function Decorators', 
                'Class Decorators', 
                'Decorator Factories', 
                'Built-in Decorators',
                'Parameterized Decorators',
                'Decorator Chaining'
            ],
            'Generators': [
                'Yield Statement', 
                'Generator Expressions', 
                'Send Method', 
                'Yield From',
                'Generator Delegation',
                'Infinite Generators'
            ]
        },
        'OOP': {
            'Classes': [
                'Class Creation', 
                'Instance Methods', 
                'Class Methods', 
                'Static Methods',
                'Metaclasses',
                'Class Composition'
            ],
            'Inheritance': [
                'Single Inheritance', 
                'Multiple Inheritance', 
                'Method Resolution', 
                'Abstract Classes',
                'Mixins',
                'Composition over Inheritance'
            ],
            'Magic Methods': [
                'Constructors', 
                'Operators', 
                'Container Methods', 
                'Context Managers',
                'Comparison Methods',
                'Pickling and Serialization'
            ]
        },
        'File Handling': {
            'Text Files': [
                'Reading', 
                'Writing', 
                'Appending', 
                'Context Managers',
                'CSV Handling',
                'JSON Parsing'
            ],
            'Binary Files': [
                'Read/Write Binary', 
                'Seeking', 
                'Buffer Management', 
                'Memory Mapping',
                'Compression Techniques',
                'Serialization'
            ],
            'File Systems': [
                'Path Operations', 
                'Directory Operations', 
                'File Attributes', 
                'Temporary Files',
                'File Watching',
                'Cross-Platform File Handling'
            ]
        }
    },
    // Potential areas for expansion:
    // 1. Add more programming languages (Java, C++, Rust, Go)
    // 2. Include more specialized topics for each language
    // 3. Add advanced programming paradigms
    // 4. Include framework-specific topics
    // 5. Add performance optimization techniques
    // 6. Create sections for design patterns
};