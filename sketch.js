/* sketch.js */

// 1. ADD YOUR NEW CATEGORIES HERE
const defaultCategories = ['Gym Sessions', 'Pub Trips', 'Meals Out', 'Cinema', 'nights out', 'pints', 'friends seen', 'holidays', 'coffees', ];

// 2. LOAD DATA (and merge with defaults)
let savedData = JSON.parse(localStorage.getItem('kaiTracker')) || {};

// Ensure every category in our list exists in the data object
defaultCategories.forEach(cat => {
    if (savedData[cat] === undefined) {
        savedData[cat] = 0;
    }
});

const listContainer = document.getElementById('tracker-list');

// 3. THE RENDER FUNCTION (The "Draw")
function render() {
    listContainer.innerHTML = ''; 
    
    // We loop through the data and create the cards
    for (const [name, value] of Object.entries(savedData)) {
        const card = document.createElement('div');
        card.className = 'counter-card';
        card.innerHTML = `
            <div>
                <span class="label">${name}</span>
                <span class="count">${value}</span>
            </div>
            <div class="controls">
                <button class="btn minus" onclick="update('${name}', -1)">−</button>
                <button class="btn plus" onclick="update('${name}', 1)">+</button>
            </div>
        `;
        listContainer.appendChild(card);
    }
    
    // Save to browser memory
    localStorage.setItem('kaiTracker', JSON.stringify(savedData));
}

// 4. THE UPDATE FUNCTION
function update(name, change) {
    savedData[name] = Math.max(0, savedData[name] + change);
    render();
}

function resetAll() {
    if(confirm("Wipe all data?")) {
        localStorage.clear();
        location.reload(); // This clears the memory and restarts
    }
}

// Initial "Setup"
render();