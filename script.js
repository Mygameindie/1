// Function to start the game by redirecting to game.html

function startGame() {
    
    console.log("Game starting..."); // Confirm startGame function trigger
    document.getElementById("mainMenu").style.display = "none";
    
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("controls").style.display = "block";
}
    
    window.location.href = "game.html"; // Redirect to the game page
}

// Keep track of items currently displayed by category
const currentItems = {};

// Categories that can't be removed (e.g., eyes and mouth)
const nonRemovableCategories = ['BoyLeftEye', 'GirlLeftEye', 'BoyRightEye', 'GirlRightEye', 'BoyMouth', 'GirlMouth'];

// Default items for non-removable categories (eyes and mouth)
const defaultItems = {
    'BoyLeftEye': 'BoyLeftEye1.png',
    'GirlLeftEye': 'GirlLeftEye1.png',
    'BoyRightEye': 'BoyRightEye1.png',
    'GirlRightEye': 'GirlRightEye1.png',
    'BoyMouth': 'BoyMouth1.png',
    'GirlMouth': 'GirlMouth1.png'
};

// Default visible items that can be removed (Underpants, Girl Bra, Panties, Boy Body Hat, Boy Socks)
const defaultRemovableItems = {
    'Underpants': 'Underpants1.png',
    'Panties': 'Panties1.png',
    'GirlBra': 'GirlBra1.png',
    'BoyBodyHat': 'BoyBodyHat1.png',
    'BoySocks': 'BoySocks1.png'
};

// Mapping items to each category with items 1 through 10 and z-indexes
const categoryItems = {
    'BoyLeftEye': { images: Array.from({length: 10}, (_, i) => `BoyLeftEye${i + 1}.png`), zIndex: 'z-index-1' },
    'GirlLeftEye': { images: Array.from({length: 10}, (_, i) => `GirlLeftEye${i + 1}.png`), zIndex: 'z-index-1' },
    'BoyRightEye': { images: Array.from({length: 10}, (_, i) => `BoyRightEye${i + 1}.png`), zIndex: 'z-index-1' },
    'GirlRightEye': { images: Array.from({length: 10}, (_, i) => `GirlRightEye${i + 1}.png`), zIndex: 'z-index-1' },
    'BoyMouth': { images: Array.from({length: 10}, (_, i) => `BoyMouth${i + 1}.png`), zIndex: 'z-index-1' },
    'GirlMouth': { images: Array.from({length: 10}, (_, i) => `GirlMouth${i + 1}.png`), zIndex: 'z-index-1' },
    'BoyExpression': { images: Array.from({length: 10}, (_, i) => `BoyExpression${i + 1}.png`), zIndex: 'z-index-1' },
    'GirlExpression': { images: Array.from({length: 10}, (_, i) => `GirlExpression${i + 1}.png`), zIndex: 'z-index-1' },
    'BoySocks': { images: Array.from({length: 10}, (_, i) => `BoySocks${i + 1}.png`), zIndex: 'z-index-2' },
    'GirlSocks': { images: Array.from({length: 10}, (_, i) => `GirlSocks${i + 1}.png`), zIndex: 'z-index-2' },
    'BoyBodyHat': { images: Array.from({length: 10}, (_, i) => `BoyBodyHat${i + 1}.png`), zIndex: 'z-index-2' },
    'GirlBodyHat': { images: Array.from({length: 10}, (_, i) => `GirlBodyHat${i + 1}.png`), zIndex: 'z-index-2' },
    'BoyBra': { images: Array.from({length: 10}, (_, i) => `BoyBra${i + 1}.png`), zIndex: 'z-index-3' },
    'GirlBra': { images: Array.from({length: 10}, (_, i) => `GirlBra${i + 1}.png`), zIndex: 'z-index-3' },
    'Underpants': { images: Array.from({length: 10}, (_, i) => `Underpants${i + 1}.png`), zIndex: 'z-index-3' },
    'Panties': { images: Array.from({length: 10}, (_, i) => `Panties${i + 1}.png`), zIndex: 'z-index-3' },
    'BoyBoxers': { images: Array.from({length: 10}, (_, i) => `BoyBoxers${i + 1}.png`), zIndex: 'z-index-3' },
    'GirlBoxers': { images: Array.from({length: 10}, (_, i) => `GirlBoxers${i + 1}.png`), zIndex: 'z-index-3' },
    'BoySweatshirt': { images: Array.from({length: 10}, (_, i) => `BoySweatshirt${i + 1}.png`), zIndex: 'z-index-4' },
    'GirlSweatshirt': { images: Array.from({length: 10}, (_, i) => `GirlSweatshirt${i + 1}.png`), zIndex: 'z-index-4' },
    'BoyShoes': { images: Array.from({length: 10}, (_, i) => `BoyShoes${i + 1}.png`), zIndex: 'z-index-5' },
    'GirlShoes': { images: Array.from({length: 10}, (_, i) => `GirlShoes${i + 1}.png`), zIndex: 'z-index-5' },
    'BoyPants': { images: Array.from({length: 10}, (_, i) => `BoyPants${i + 1}.png`), zIndex: 'z-index-5' },
    'GirlPants': { images: Array.from({length: 10}, (_, i) => `GirlPants${i + 1}.png`), zIndex: 'z-index-5' },
    'BoyTop': { images: Array.from({length: 10}, (_, i) => `BoyTop${i + 1}.png`), zIndex: 'z-index-4' },
    'GirlTop': { images: Array.from({length: 10}, (_, i) => `GirlTop${i + 1}.png`), zIndex: 'z-index-4' },
    'BoyDress': { images: Array.from({length: 10}, (_, i) => `BoyDress${i + 1}.png`), zIndex: 'z-index-4' },
    'GirlDress': { images: Array.from({length: 10}, (_, i) => `GirlDress${i + 1}.png`), zIndex: 'z-index-4' },
    'BoyAccessories': { images: Array.from({length: 10}, (_, i) => `BoyAccessories${i + 1}.png`), zIndex: 'z-index-6' },
    'GirlAccessories': { images: Array.from({length: 10}, (_, i) => `GirlAccessories${i + 1}.png`), zIndex: 'z-index-6' },
    'BoyJacket': { images: Array.from({length: 10}, (_, i) => `BoyJacket${i + 1}.png`), zIndex: 'z-index-7' },
    'GirlJacket': { images: Array.from({length: 10}, (_, i) => `GirlJacket${i + 1}.png`), zIndex: 'z-index-7' }
};

// Load items for the selected category and display buttons
function loadCategoryItems() {
    const category = document.getElementById('category').value;
    const itemButtons = document.getElementById('itemButtons');
    
    // Clear previous items
    itemButtons.innerHTML = '';

    // Load items from the selected category
    
    if (!categoryItems[category]) return; // Category check to prevent errors
    const items = categoryItems[category].images;
    
    const zIndexClass = categoryItems[category].zIndex;

    items.forEach((item, index) => {
        const button = document.createElement('button');
        button.innerText = `${category} Item ${index + 1}`;
        button.onclick = () => toggleItem(`images/${item}`, zIndexClass, category);
        itemButtons.appendChild(button);
    });
}

// Toggle item display on the character
function toggleItem(itemSrc, zIndexClass, category) {
    const outfitContainer = document.getElementById('outfitContainer');
    
    // Check if the category is non-removable
    if (nonRemovableCategories.includes(category)) {
        wearItem(itemSrc, zIndexClass, category); // Replace item without removal
    } else {
        // Toggle item display: remove if already worn, add if not
        if (currentItems[category]) {
            currentItems[category].remove();
            currentItems[category] = null;
        } else {
            wearItem(itemSrc, zIndexClass, category);
        }
    }
}

// Wear a new item and manage previous items for the category
function wearItem(itemSrc, zIndexClass, category) {
    const outfitContainer = document.getElementById('outfitContainer');
    
    // Remove conflicting items if wearing a dress
    if (category === 'BoyDress' || category === 'GirlDress') {
        ['BoyTop', 'GirlTop', 'BoyPants', 'GirlPants', 'BoySweatshirt', 'GirlSweatshirt'].forEach(removeCategoryItem);
    }

    // Remove previous item from the same category, if it exists
    if (currentItems[category]) {
        currentItems[category].remove();
    }

    // Create and apply the new item
    const newItem = document.createElement('img');
    newItem.src = itemSrc;
    newItem.classList.add(zIndexClass);

    // Store and append the item
    currentItems[category] = newItem;
    outfitContainer.appendChild(newItem);
}

// Helper function to remove an item from a specific category
function removeCategoryItem(category) {
    if (currentItems[category]) {
        currentItems[category].remove();
        currentItems[category] = null;
    }
}

// Initialize non-removable items (eyes and mouth) on page load
function initializeNonRemovableItems() {
    Object.keys(defaultItems).forEach(category => {
        const itemSrc = `images/${defaultItems[category]}`;
        const zIndexClass = categoryItems[category].zIndex;
        wearItem(itemSrc, zIndexClass, category);
    });
}

// Initialize default visible items that can be removed on page load
function initializeDefaultRemovableItems() {
    Object.keys(defaultRemovableItems).forEach(category => {
        const itemSrc = `images/${defaultRemovableItems[category]}`;
        const zIndexClass = categoryItems[category].zIndex;
        wearItem(itemSrc, zIndexClass, category);
    });
}

// Initialize game state on load
window.onload = () => {
    loadCategoryItems();
    initializeNonRemovableItems();
    initializeDefaultRemovableItems();
};
document.addEventListener('DOMContentLoaded', () => {
    initializeNonRemovableItems();
    initializeDefaultRemovableItems();
    loadCategoryItems();
});
