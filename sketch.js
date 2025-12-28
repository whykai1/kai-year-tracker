// 1. List your categories here. You can add more easily!
const categories = ['Gym Sessions', 'Pub Trips', 'Meals Out', 'cuddles w/ izzy'];

const listContainer = document.getElementById('tracker-list');

/**
 * Renders the counter cards onto the screen
 */
function render() {
    listContainer.innerHTML = ''; 
    
    categories.forEach(name => {
        // Get saved value from phone memory
        const savedValue = localStorage.getItem(name) || 0;

        const card = document.createElement('div');
        card.className = 'counter-card';
        card.innerHTML = `
            <div>
                <span class="label">${name}</span>
                <span class="count">${savedValue}</span>
            </div>
            <div class="controls">
                <button class="btn minus" onclick="update('${name}', -1)">−</button>
                <button class="btn plus" onclick="update('${name}', 1)">+</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

/**
 * Updates the count and saves it to LocalStorage
 */
function update(name, change) {
    let current = parseInt(localStorage.getItem(name)) || 0;
    let newValue = Math.max(0, current + change); // Prevents negative numbers

    localStorage.setItem(name, newValue);
    render(); // Redraw the UI
}

/**
 * Clears all data from the phone
 */
function resetAll() {
    if(confirm("Are you sure you want to reset everything?")) {
        localStorage.clear();
        render();
    }
}

// Start the app for the first time
render();