const toggleMenuBtn = document.getElementById('toggle-menu');
const menuItems = document.getElementById('menu-items');

toggleMenuBtn.addEventListener('click', function () {
    menuItems.classList.toggle('hidden');
});





document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.adzuna.com/v1/api/jobs/gb/search/1';
    const appId = '66b0a28c';
    const appKey = '56c984538e5f9d3537474676d1cd6304';

    const jobRolesContainer = document.getElementById('jobRolesContainer');
    const locationsContainer = document.getElementById('locationsContainer');
    const selectedCriteriaContainer = document.getElementById('selectedCriteria');
    const jobCardsContainer = document.getElementById('jobCardsContainer');

    let selectedCriteria = [];

    // Fetch job roles and locations from API
    async function fetchJobData() {
        try {
            const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
            const data = await response.json();

            const jobRoles = new Set();
            const locations = new Set();

            data.results.forEach(job => {
                jobRoles.add(job.title); // Use job title as job role
                locations.add(job.location.display_name); // Use full location address
            });

            // Display job roles and locations as selectable boxes
            displayCriteria(jobRolesContainer, Array.from(jobRoles));
            displayCriteria(locationsContainer, Array.from(locations));

        } catch (error) {
            console.error('Error fetching job data:', error);
        }
    }

    // Display job roles or locations as selectable boxes
    function displayCriteria(container, items) {
        container.innerHTML = '';
        items.forEach(item => {
            const box = createBox(item);
            box.classList.add('criteria-box'); // Apply criteria-box styling
            container.appendChild(box);
        });
    }

    // Create a selectable box with remove functionality
    // Create a selectable box without the remove functionality
    function createBox(item) {
        const box = document.createElement('div');
        box.textContent = item;
        box.classList.add('criteria-box'); // Apply criteria-box styling
        box.addEventListener('click', () => {
            toggleCriteria(item);
        });

        return box;
    }


    // Toggle selected criteria (add/remove from selectedCriteria array)
    function toggleCriteria(criteria) {
        const index = selectedCriteria.indexOf(criteria);
        if (index === -1) {
            // Add criteria to selected array
            selectedCriteria.push(criteria);
        } else {
            // Remove criteria from selected array
            selectedCriteria.splice(index, 1);
        }

        // Re-render selected criteria container
        displaySelectedCriteria();
        // Fetch jobs based on selected criteria
        fetchJobs();
    }

    // Display selected criteria in the selectedCriteriaContainer
    function displaySelectedCriteria() {
        selectedCriteriaContainer.innerHTML = '';
        selectedCriteria.forEach(criteria => {
            const box = createBox(criteria);
            box.classList.add('selected-box'); // Apply selected-box styling
            selectedCriteriaContainer.appendChild(box);
        });
    }

    // Fetch and display job cards based on selected criteria
    async function fetchJobs() {
        try {
            const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
            const data = await response.json();

            const filteredJobs = data.results.filter(job => {
                return selectedCriteria.includes(job.title) && selectedCriteria.includes(job.location.display_name);
            });

            // Display job cards
            displayJobCards(filteredJobs);

        } catch (error) {
            console.error('Error fetching job cards:', error);
        }
    }

    // Display job cards in the container
    function displayJobCards(jobs) {
        jobCardsContainer.innerHTML = '';
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card'); // Apply job-card styling
            jobCard.innerHTML = `
                <h2>${job.title}</h2> <br />
                <p><strong>Company:</strong> ${job.company.display_name}</p><br />
                <p><strong>Location:</strong> ${job.location.display_name}</p><br />
                <p><strong>Salary:</strong> ${job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : 'Not specified'}</p><br />
                <p><strong>Description:</strong> ${job.description}</p>
            `;
            jobCardsContainer.appendChild(jobCard);
        });
    }

    // Initialize the application
    fetchJobData();
});





function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ja,en', // Specify languages: 'ja' for Japanese and 'en' for English
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Use a simple dropdown layout
        autoDisplay: false // Do not display the widget automatically
    }, 'google_translate_element');
}






function makeElementDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    // Handle touch and mouse events for dragging
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag);

    // Function to handle start of dragging
    function startDrag(event) {
        isDragging = true;
        offsetX = (event.type === 'mousedown') ? event.offsetX : event.touches[0].clientX - element.offsetLeft;
        offsetY = (event.type === 'mousedown') ? event.offsetY : event.touches[0].clientY - element.offsetTop;

        // Prevent default behavior to avoid selecting text or scrolling during drag
        event.preventDefault();
    }

    // Handle movement during dragging
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('touchmove', dragElement);

    // Function to handle element movement
    function dragElement(event) {
        if (isDragging) {
            const x = (event.type === 'mousemove') ? event.clientX - offsetX : event.touches[0].clientX - offsetX;
            const y = (event.type === 'mousemove') ? event.clientY - offsetY : event.touches[0].clientY - offsetY;

            // Update element's position
            element.style.left = x + 'px';
            element.style.top = y + 'px';
        }
    }

    // Handle end of dragging
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Function to handle end of dragging
    function endDrag() {
        isDragging = false;
    }
}

// Call the draggable function on the translate element
const translateElement = document.getElementById('google_translate_element');
makeElementDraggable(translateElement);




// document.addEventListener('DOMContentLoaded', () => {
//     const apiUrl = 'https://api.adzuna.com/v1/api/jobs/gb/search/1';
//     const appId = '66b0a28c';
//     const appKey = '56c984538e5f9d3537474676d1cd6304';

//     const jobRolesContainer = document.getElementById('jobRolesContainer');
//     const locationsContainer = document.getElementById('locationsContainer');
//     const selectedCriteriaContainer = document.getElementById('selectedCriteria');
//     const jobCardsContainer = document.getElementById('jobCardsContainer');

//     // Fetch job roles and locations from API
//     async function fetchJobData() {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             const jobRoles = new Set();
//             const locations = new Set();

//             data.results.forEach(job => {
//                 jobRoles.add(job.category.label);
//                 const locationParts = job.location.display_name.split(', ');
//                 if (locationParts.length > 1) {
//                     locations.add(locationParts[1]);
//                 }
//             });

//             // Display job roles and locations as selectable boxes
//             displayCriteria(jobRolesContainer, Array.from(jobRoles));
//             displayCriteria(locationsContainer, Array.from(locations));

//         } catch (error) {
//             console.error('Error fetching job data:', error);
//         }
//     }

//     // Display job roles or locations as selectable boxes
//     function displayCriteria(container, items) {
//         container.innerHTML = '';
//         items.forEach(item => {
//             const box = document.createElement('div');
//             box.classList.add('criteria-box');
//             box.textContent = item;
//             box.addEventListener('click', () => {
//                 toggleCriteria(item);
//             });
//             container.appendChild(box);
//         });
//     }

//     // Toggle selected criteria
//     function toggleCriteria(criteria) {
//         const existingCriteria = Array.from(selectedCriteriaContainer.children).map(child => child.textContent);
//         if (existingCriteria.includes(criteria)) {
//             // Remove criteria
//             const index = existingCriteria.indexOf(criteria);
//             selectedCriteriaContainer.removeChild(selectedCriteriaContainer.children[index]);
//         } else {
//             // Add criteria
//             const box = document.createElement('div');
//             box.classList.add('selected-box');
//             box.textContent = criteria;
//             selectedCriteriaContainer.appendChild(box);
//         }

//         // Fetch jobs based on selected criteria
//         fetchJobs();
//     }

//     // Fetch and display job cards based on selected criteria
//     async function fetchJobs() {
//         // Extract selected criteria
//         const selectedCriteria = Array.from(selectedCriteriaContainer.children).map(child => child.textContent);

//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             const filteredJobs = data.results.filter(job => {
//                 const jobLocation = job.location.display_name.split(', ')[1];
//                 return selectedCriteria.includes(job.category.label) && selectedCriteria.includes(jobLocation);
//             });

//             // Display job cards
//             displayJobCards(filteredJobs);

//         } catch (error) {
//             console.error('Error fetching job cards:', error);
//         }
//     }

//     // Display job cards in the container
//     function displayJobCards(jobs) {
//         jobCardsContainer.innerHTML = '';
//         jobs.forEach(job => {
//             const jobCard = document.createElement('div');
//             jobCard.classList.add('job-card');
//             jobCard.innerHTML = `
//                 <h2>${job.title}</h2>
//                 <p><strong>Company:</strong> ${job.company.display_name}</p>
//                 <p><strong>Location:</strong> ${job.location.display_name}</p>
//                 <p><strong>Salary:</strong> ${job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : 'Not specified'}</p>
//                 <p><strong>Description:</strong> ${job.description}</p>
//             `;
//             jobCardsContainer.appendChild(jobCard);
//         });
//     }

//     // Initialize the application
//     fetchJobData();
// });
























// Better version

// document.addEventListener('DOMContentLoaded', () => {
//     const apiUrl = 'https://api.adzuna.com/v1/api/jobs/gb/search/1';
//     const appId = '66b0a28c';
//     const appKey = '56c984538e5f9d3537474676d1cd6304';

//     const jobRoleSelect = document.getElementById('jobRoleSelect');
//     const locationSelect = document.getElementById('locationSelect');
//     const jobCardsContainer = document.getElementById('jobCardsContainer');

//     // Function to fetch job data from API based on selected job role and location
//     async function fetchJobs(jobRole, location) {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             // Filter jobs based on selected job title and location
//             const jobs = data.results.filter(job => {
//                 const jobLocation = job.location.display_name;
//                 return job.title === jobRole && jobLocation.includes(location);
//             });

//             // Clear previous job cards
//             jobCardsContainer.innerHTML = '';

//             // Display job cards for the selected job title and location
//             if (jobs.length > 0) {
//                 jobs.forEach(job => {
//                     const jobCard = document.createElement('div');
//                     jobCard.classList.add('job-card');
//                     jobCard.innerHTML = `
//                         <h2>${job.title}</h2>
//                         <p><strong>Company:</strong> ${job.company.display_name}</p>
//                         <p><strong>Location:</strong> ${job.location.display_name}</p>
//                         <p><strong>Salary:</strong> ${job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : 'Not specified'}</p>
//                         <p><strong>Description:</strong> ${job.description}</p>
//                     `;
//                     jobCardsContainer.appendChild(jobCard);
//                 });
//             } else {
//                 jobCardsContainer.innerHTML = '<p>No jobs found matching the selected criteria.</p>';
//             }

//         } catch (error) {
//             console.error('Error fetching jobs:', error);
//             jobCardsContainer.innerHTML = '<p>An error occurred while fetching jobs. Please try again later.</p>';
//         }
//     }

//     // Function to fetch and populate job roles in dropdown
//     async function fetchJobRoles() {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             // Extract unique job titles from API response
//             const jobTitles = [...new Set(data.results.map(job => job.title))];

//             // Populate job role dropdown
//             jobTitles.forEach(title => {
//                 const option = document.createElement('option');
//                 option.value = title;
//                 option.textContent = title;
//                 jobRoleSelect.appendChild(option);
//             });

//         } catch (error) {
//             console.error('Error fetching job titles:', error);
//         }
//     }

//     // Function to fetch and populate location options in dropdown
//     async function fetchLocations() {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             // Extract unique locations from API response
//             const locations = [...new Set(data.results.map(job => job.location.display_name))];

//             // Populate location dropdown
//             locations.forEach(location => {
//                 const option = document.createElement('option');
//                 option.value = location;
//                 option.textContent = location;
//                 locationSelect.appendChild(option);
//             });

//         } catch (error) {
//             console.error('Error fetching locations:', error);
//         }
//     }

//     // Event listener for job role select dropdown
//     jobRoleSelect.addEventListener('change', () => {
//         const selectedRole = jobRoleSelect.value;
//         const selectedLocation = locationSelect.value;
//         if (selectedRole && selectedLocation) {
//             fetchJobs(selectedRole, selectedLocation); // Fetch jobs based on job title and location
//         } else {
//             jobCardsContainer.innerHTML = ''; // Clear job cards container if no job title or location selected
//         }
//     });

//     // Event listener for location select dropdown
//     locationSelect.addEventListener('change', () => {
//         const selectedRole = jobRoleSelect.value;
//         const selectedLocation = locationSelect.value;
//         if (selectedRole && selectedLocation) {
//             fetchJobs(selectedRole, selectedLocation); // Fetch jobs based on job title and location
//         } else {
//             jobCardsContainer.innerHTML = ''; // Clear job cards container if no job title or location selected
//         }
//     });

//     // Call functions to fetch job titles and locations
//     fetchJobRoles();
//     fetchLocations();
// });










































// Perfect code
// document.addEventListener('DOMContentLoaded', () => {
//     const apiUrl = 'https://api.adzuna.com/v1/api/jobs/gb/search/1';
//     const appId = '66b0a28c';
//     const appKey = '56c984538e5f9d3537474676d1cd6304';

//     const jobRoleSelect = document.getElementById('jobRoleSelect');
//     const jobCardsContainer = document.getElementById('jobCardsContainer');

//     // Function to fetch job titles from API and populate dropdown
//     async function fetchJobTitles() {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             // Extract all job titles from API response
//             const jobTitles = data.results.map(job => job.title);

//             // Use a Set to get unique job titles
//             const uniqueJobTitles = [...new Set(jobTitles)];

//             // Clear previous options in dropdown
//             jobRoleSelect.innerHTML = '';

//             // Add default option as instructional message
//             const defaultOption = document.createElement('option');
//             defaultOption.value = '';
//             defaultOption.textContent = 'Select a job role...';
//             jobRoleSelect.appendChild(defaultOption);

//             // Populate dropdown with unique job titles
//             uniqueJobTitles.forEach(title => {
//                 const option = document.createElement('option');
//                 option.value = title; // Use job title as option value
//                 option.textContent = title; // Display job title in dropdown
//                 jobRoleSelect.appendChild(option); // Append option to dropdown
//             });

//             // Add event listener to job role select dropdown
//             jobRoleSelect.addEventListener('change', () => {
//                 const selectedTitle = jobRoleSelect.value;
//                 if (selectedTitle) {
//                     fetchJobCards(selectedTitle); // Fetch job cards for selected title
//                 } else {
//                     jobCardsContainer.innerHTML = ''; // Clear job cards container if no title selected
//                 }
//             });

//         } catch (error) {
//             console.error('Error fetching job titles:', error);
//         }
//     }

//     // Function to fetch and display job cards based on selected job title
//     async function fetchJobCards(jobTitle) {
//         try {
//             const response = await fetch(`${apiUrl}?app_id=${appId}&app_key=${appKey}`);
//             const data = await response.json();

//             // Filter jobs based on selected job title
//             const jobs = data.results.filter(job => job.title === jobTitle);

//             // Clear previous job cards
//             jobCardsContainer.innerHTML = '';

//             // Display job cards for the selected job title
//             jobs.forEach(job => {
//                 const jobCard = document.createElement('div');
//                 jobCard.classList.add('job-card');
//                 jobCard.innerHTML = `
//                     <h2>${job.title}</h2>
//                     <p><strong>Company:</strong> ${job.company.display_name}</p>
//                     <p><strong>Location:</strong> ${job.location.display_name}</p>
//                     <p><strong>Salary:</strong> ${job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : 'Not specified'}</p>
//                     <p><strong>Description:</strong> ${job.description}</p>
//                 `;
//                 jobCardsContainer.appendChild(jobCard);
//             });

//         } catch (error) {
//             console.error('Error fetching job cards:', error);
//         }
//     }

//     // Call function to fetch job titles and populate dropdown
//     fetchJobTitles();
// });
