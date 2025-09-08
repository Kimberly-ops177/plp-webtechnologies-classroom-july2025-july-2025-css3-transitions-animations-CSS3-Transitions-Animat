/* ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES ===== */

// Global variables for travel application state (demonstrating global scope)
let bookingTimeout = null;
let favoriteDestinations = new Set(); // Using Set for unique favorites
let bookedDestinations = new Map(); // Using Map for booking details

// Travel destinations data (global scope)
let destinationsData = [
    {
        id: 1,
        title: 'Santorini',
        country: 'Greece',
        description: 'Breathtaking sunsets, white-washed buildings, and crystal-clear waters make this Greek island paradise unforgettable.',
        price: '$899',
        image: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        features: ['Sunset Views', 'Beach Resort', 'Historic Sites'],
        rating: 4.9,
        weather: 'sunny'
    },
    {
        id: 2,
        title: 'Swiss Alps',
        country: 'Switzerland',
        description: 'Majestic mountain peaks, pristine lakes, and charming alpine villages offer the perfect escape for nature lovers.',
        price: '$1,299',
        image: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
        features: ['Mountain Views', 'Ski Resort', 'Adventure Sports'],
        rating: 4.8,
        weather: 'snow'
    },
    {
        id: 3,
        title: 'Tokyo',
        country: 'Japan',
        description: 'A vibrant metropolis where ancient traditions blend seamlessly with cutting-edge technology and incredible cuisine.',
        price: '$1,099',
        image: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 50%, #ff8a80 100%)',
        features: ['City Life', 'Cultural Sites', 'Amazing Food'],
        rating: 4.7,
        weather: 'clear'
    },
    {
        id: 4,
        title: 'Bali',
        country: 'Indonesia',
        description: 'Tropical paradise with lush rice terraces, ancient temples, pristine beaches, and a rich cultural heritage.',
        price: '$799',
        image: 'linear-gradient(45deg, #a8ff78 0%, #78ffd6 50%, #56ccf2 100%)',
        features: ['Tropical Beach', 'Temples', 'Spa Retreats'],
        rating: 4.6,
        weather: 'tropical'
    },
    {
        id: 5,
        title: 'Machu Picchu',
        country: 'Peru',
        description: 'Ancient Incan citadel high in the Andes mountains, offering mystical ruins and breathtaking panoramic views.',
        price: '$1,199',
        image: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #896ba7 100%)',
        features: ['Historic Ruins', 'Hiking Trails', 'Adventure'],
        rating: 4.9,
        weather: 'mountain'
    },
    {
        id: 6,
        title: 'Maldives',
        country: 'Maldives',
        description: 'Luxurious overwater bungalows, pristine coral reefs, and crystal-clear turquoise waters in this tropical paradise.',
        price: '$1,599',
        image: 'linear-gradient(45deg, #84fab0 0%, #8fd3f4 50%, #5aa7f2 100%)',
        features: ['Luxury Resort', 'Water Sports', 'Private Beach'],
        rating: 4.8,
        weather: 'tropical'
    }
];

/* ===== FUNCTIONS DEMONSTRATING PARAMETERS AND RETURN VALUES ===== */

/**
 * Creates a destination card with specified data and animations
 * @param {Object} destination - Destination data object
 * @param {number} index - Card index for staggered animations
 * @returns {HTMLElement} - Created destination card element
 */
function createDestinationCard(destination, index) {
    // Local scope variables for card creation
    const card = document.createElement('div');
    const cardImage = document.createElement('div');
    const priceTag = document.createElement('div');
    const cardContent = document.createElement('div');
    const title = document.createElement('h3');
    const country = document.createElement('p');
    const description = document.createElement('p');
    const features = document.createElement('div');
    const actions = document.createElement('div');
    
    // Set up card structure with classes
    card.className = 'destination-card';
    card.dataset.destinationId = destination.id;
    
    // Configure card image with dynamic background
    cardImage.className = 'card-image';
    cardImage.style.background = destination.image;
    
    // Price tag setup
    priceTag.className = 'price-tag';
    priceTag.textContent = destination.price;
    
    // Add weather effects for certain destinations
    if (destination.weather === 'snow') {
        addWeatherEffect(cardImage, 'snow');
    }
    
    // Assemble image section
    cardImage.appendChild(priceTag);
    
    // Content section setup
    cardContent.className = 'card-content';
    title.className = 'destination-title';
    title.textContent = destination.title;
    
    country.className = 'destination-country';
    country.textContent = destination.country;
    
    description.className = 'destination-description';
    description.textContent = destination.description;
    
    // Features section
    features.className = 'card-features';
    destination.features.forEach(feature => {
        const featureTag = document.createElement('span');
        featureTag.className = 'feature-tag';
        featureTag.textContent = feature;
        features.appendChild(featureTag);
    });
    
    // Action buttons
    actions.className = 'card-actions';
    const bookBtn = createActionButton('book-btn action-btn', '✈️ Book Now', () => {
        bookDestination(destination.id, destination.title);
    });
    const favoriteBtn = createActionButton('favorite-btn action-btn', '❤️ Favorite', () => {
        toggleFavorite(destination.id, destination.title);
    });
    
    actions.appendChild(bookBtn);
    actions.appendChild(favoriteBtn);
    
    // Assemble complete card
    cardContent.appendChild(title);
    cardContent.appendChild(country);
    cardContent.appendChild(description);
    cardContent.appendChild(features);
    cardContent.appendChild(actions);
    
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    
    // Add click event for card details (demonstrating closure)
    card.addEventListener('click', function(event) {
        // Prevent action if clicking on buttons
        if (!event.target.closest('.action-btn')) {
            showDestinationDetails(destination);
        }
    });
    
    return card;
}

/**
 * Creates an action button with specified properties
 * @param {string} className - CSS classes for the button
 * @param {string} text - Button text content
 * @param {Function} clickHandler - Function to call on click
 * @returns {HTMLButtonElement} - Created button element
 */
function createActionButton(className, text, clickHandler) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

/**
 * Calculates staggered animation delay for smooth entrance effects
 * @param {number} index - Element index
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} increment - Delay increment per index
 * @returns {number} - Calculated delay value
 */
function calculateStaggerDelay(index, baseDelay = 0, increment = 150) {
    return baseDelay + (index * increment);
}

/**
 * Applies animation class with optional delay and auto-removal
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - Animation class name
 * @param {number} delay - Delay before animation starts
 * @param {number} duration - Duration before class removal
 */
function applyAnimationWithDelay(element, animationClass, delay = 0, duration = 3000) {
    setTimeout(() => {
        element.classList.add(animationClass);
        
        // Auto-remove animation class after duration
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }, delay);
}

/**
 * Validates destination ID and returns destination data
 * @param {number} destinationId - ID to validate
 * @returns {Object|null} - Destination object or null if not found
 */
function getDestinationById(destinationId) {
    return destinationsData.find(dest => dest.id === destinationId) || null;
}

/**
 * Generates random booking confirmation number
 * @param {number} length - Length of confirmation number
 * @returns {string} - Generated confirmation number
 */
function generateConfirmationNumber(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Adds weather effects to card images
 * @param {HTMLElement} cardElement - Card image element
 * @param {string} weatherType - Type of weather effect
 */
function addWeatherEffect(cardElement, weatherType) {
    if (weatherType === 'snow') {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-effect';
        
        // Create multiple snowflakes
        for (let i = 0; i < 10; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snow';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 3 + 's';
            snowflake.style.animationDuration = (Math.random() * 2 + 2) + 's';
            weatherDiv.appendChild(snowflake);
        }
        
        cardElement.appendChild(weatherDiv);
    }
}

/* ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT ===== */

/**
 * Initializes the travel destinations gallery
 */
function initializeDestinationsGallery() {
    const gallery = document.getElementById('destinationsGallery');
    
    // Clear existing content
    gallery.innerHTML = '';
    
    // Create destination cards with staggered entrance animations
    destinationsData.forEach((destination, index) => {
        const card = createDestinationCard(destination, index);
        gallery.appendChild(card);
        
        // Add entrance animation with calculated delay
        const delay = calculateStaggerDelay(index, 200);
        setTimeout(() => {
            card.style.animation = 'slideInFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }, delay);
    });
}

/**
 * Animates all destination cards with specified animation type
 * @param {string} animationType - Type of animation to apply
 */
function animateAllDestinations(animationType) {
    const cards = document.querySelectorAll('.destination-card');
    
    // Clear any existing animation timeouts
    if (bookingTimeout) {
        clearTimeout(bookingTimeout);
    }
    
    cards.forEach((card, index) => {
        const delay = calculateStaggerDelay(index, 0, 100);
        applyAnimationWithDelay(card, animationType, delay);
    });
    
    // Show appropriate notification
    if (animationType === 'favorite') {
        showNotification('All destinations added to favorites! ❤️', 'favorite');
    } else if (animationType === 'booking') {
        showNotification('Booking all adventures! ✈️', 'success');
    }
}

/**
 * Books a specific destination with animation effects
 * @param {number} destinationId - ID of destination to book
 * @param {string} destinationName - Name of destination for confirmation
 */
function bookDestination(destinationId, destinationName) {
    const card = document.querySelector(`[data-destination-id="${destinationId}"]`);
    const destination = getDestinationById(destinationId);
    
    if (!destination) {
        console.error('Destination not found:', destinationId);
        return;
    }
    
    // Add booking animation to card
    card.classList.add('booking');
    
    // Show booking overlay
    const overlay = document.getElementById('bookingOverlay');
    overlay.classList.add('active');
    
    // Simulate booking process with timeout
    setTimeout(() => {
        // Hide overlay
        overlay.classList.remove('active');
        
        // Add booked state to card
        card.classList.remove('booking');
        card.classList.add('booked');
        
        // Store booking details
        const confirmationNumber = generateConfirmationNumber();
        bookedDestinations.set(destinationId, {
            destination: destinationName,
            confirmationNumber: confirmationNumber,
            bookingDate: new Date().toLocaleDateString()
        });
        
        // Show success notification
        showNotification(`${destinationName} booked! Confirmation: ${confirmationNumber}`, 'success');
        
        // Remove booked state after delay
        setTimeout(() => {
            card.classList.remove('booked');
        }, 3000);
        
    }, 2500); // Simulate 2.5 second booking process
}

/**
 * Toggles favorite status for a destination
 * @param {number} destinationId - ID of destination
 * @param {string} destinationName - Name for notification
 */
function toggleFavorite(destinationId, destinationName) {
    const card = document.querySelector(`[data-destination-id="${destinationId}"]`);
    
    if (favoriteDestinations.has(destinationId)) {
        // Remove from favorites
        favoriteDestinations.delete(destinationId);
        card.classList.remove('favorite');
        showNotification(`${destinationName} removed from favorites`, 'favorite');
    } else {
        // Add to favorites
        favoriteDestinations.add(destinationId);
        card.classList.add('favorite');
        showNotification(`${destinationName} added to favorites! ❤️`, 'favorite');
        
        // Auto-remove favorite animation after delay
        setTimeout(() => {
            card.classList.remove('favorite');
        }, 4000);
    }
}

/**
 * Shows booking demonstration with multiple effects
 */
function showBookingDemo() {
    const overlay = document.getElementById('bookingOverlay');
    overlay.classList.add('active');
    
    // Simulate longer booking process for demo
    setTimeout(() => {
        overlay.classList.remove('active');
        showNotification('Demo booking completed! Ready to travel! 🌍', 'success');
        
        // Animate random cards as "booked"
        const cards = document.querySelectorAll('.destination-card');
        const randomCards = Array.from(cards).sort(() => 0.5 - Math.random()).slice(0, 2);
        
        randomCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('booked');
                setTimeout(() => card.classList.remove('booked'), 2000);
            }, index * 500);
        });
        
    }, 3000);
}

/**
 * Resets all animations and states
 */
function resetAllAnimations() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.classList.remove('booking', 'booked', 'favorite');
        card.style.animation = '';
    });
    
    // Clear stored data
    favoriteDestinations.clear();
    bookedDestinations.clear();
    
    // Clear timeouts
    if (bookingTimeout) {
        clearTimeout(bookingTimeout);
        bookingTimeout = null;
    }
    
    showNotification('All animations reset! Ready for new adventures! 🔄', 'success');
}

/**
 * Shows travel tips modal with CSS animations
 */
function showTravelModal() {
    const modal = document.getElementById('travelModal');
    modal.classList.add('active');
}

/**
 * Closes travel tips modal
 */
function closeTravelModal() {
    const modal = document.getElementById('travelModal');
    modal.classList.remove('active');
}

/**
 * Shows destination details in modal (bonus feature)
 * @param {Object} destination - Destination data to display
 */
function showDestinationDetails(destination) {
    // Create dynamic modal content for destination details
    const modal = document.getElementById('travelModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close-btn" onclick="closeTravelModal()">&times;</span>
        <h2>🌟 ${destination.title}, ${destination.country}</h2>
        <div style="height: 200px; background: ${destination.image}; border-radius: 15px; margin: 20px 0;"></div>
        <p><strong>Price:</strong> ${destination.price} per person</p>
        <p><strong>Rating:</strong> ⭐ ${destination.rating}/5.0</p>
        <p style="margin: 20px 0; line-height: 1.6;">${destination.description}</p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
            ${destination.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button class="btn adventure" onclick="bookDestination(${destination.id}, '${destination.title}'); closeTravelModal();">✈️ Book Now</button>
            <button class="btn" onclick="toggleFavorite(${destination.id}, '${destination.title}'); closeTravelModal();">❤️ Add to Favorites</button>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Shows notification with specified message and type
 * @param {string} message - Notification message
 * @param {string} type - Notification type for styling
 */
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // Auto-hide notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

/**
 * Utility function to get random element from array
 * @param {Array} array - Array to select from
 * @returns {*} - Random element from array
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Calculates total cost for multiple destinations
 * @param {Array} destinationIds - Array of destination IDs
 * @returns {number} - Total cost in dollars
 */
function calculateTotalCost(destinationIds) {
    return destinationIds.reduce((total, id) => {
        const destination = getDestinationById(id);
        if (destination) {
            // Extract numeric value from price string (e.g., "$899" -> 899)
            const price = parseInt(destination.price.replace(/[^0-9]/g, ''));
            return total + price;
        }
        return total;
    }, 0);
}

/* ===== EVENT LISTENERS AND INITIALIZATION ===== */

// Initialize the travel gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDestinationsGallery();
    
    // Add keyboard shortcuts for travel actions
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        
        switch(key) {
            case 'escape':
                closeTravelModal();
                break;
            case 'r':
                resetAllAnimations();
                break;
            case 'f':
                animateAllDestinations('favorite');
                break;
            case 'b':
                animateAllDestinations('booking');
                break;
            case 't':
                showTravelModal();
                break;
        }
    });
    
    // Close modal when clicking backdrop
    document.getElementById('travelModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeTravelModal();
        }
    });
    
    // Prevent notification clicks from closing
    document.getElementById('notification').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

/* ===== DEMONSTRATION OF SCOPE CONCEPTS ===== */

// Global scope variables
var globalTravelMessage = "Welcome to Wanderlust Travel!";
let currentUser = null; // Could store user session data
const BOOKING_TIMEOUT_DURATION = 2500; // Constant for booking simulation

/**
 * Demonstrates various JavaScript scope concepts
 */
function demonstrateTravelScopes() {
    // Function scope
    var functionScopedBooking = "Booking in progress...";
    let blockScopedUser = "Travel enthusiast";
    const COMPANY_NAME = "Wanderlust Travel Co.";
    
    // Nested function demonstrating closure
    function processBooking(destinationName) {
        // Can access outer function variables (closure)
        console.log("Processing:", functionScopedBooking);
        console.log("For:", blockScopedUser);
        console.log("Company:", COMPANY_NAME);
        
        // Local to inner function
        let confirmationStatus = "Confirmed";
        
        // Return object with booking details
        return {
            destination: destinationName,
            status: confirmationStatus,
            user: blockScopedUser,
            company: COMPANY_NAME
        };
    }
    
    return processBooking; // Return function (closure)
}

// Example of different function types
const bookingCalculator = function(basePrice, taxRate = 0.08) {
    const tax = basePrice * taxRate;
    return basePrice + tax; // Return calculated total
};

// Arrow function for discount calculation
const applyDiscount = (price, discountPercent) => {
    const discount = price * (discountPercent / 100);
    return price - discount;
};

// Initialize and log travel system
console.log("🌍 Wanderlust Travel System Initialized!");
console.log(`💰 Sample booking calculation: ${bookingCalculator(899)} (including tax)`);
console.log(`🎫 With 10% discount: ${applyDiscount(bookingCalculator(899), 10).toFixed(2)}`);

/* ===== ADDITIONAL UTILITY FUNCTIONS FOR TRAVEL FEATURES ===== */

/**
 * Filters destinations by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} - Filtered destinations array
 */
function filterDestinationsByPrice(minPrice, maxPrice) {
    return destinationsData.filter(destination => {
        const price = parseInt(destination.price.replace(/[^0-9]/g, ''));
        return price >= minPrice && price <= maxPrice;
    });
}

/**
 * Sorts destinations by rating
 * @param {boolean} ascending - Sort order (true for ascending, false for descending)
 * @returns {Array} - Sorted destinations array
 */
function sortDestinationsByRating(ascending = false) {
    return [...destinationsData].sort((a, b) => {
        return ascending ? a.rating - b.rating : b.rating - a.rating;
    });
}

/**
 * Gets user's booking history
 * @returns {Array} - Array of booking objects
 */
function getBookingHistory() {
    const history = [];
    bookedDestinations.forEach((booking, destinationId) => {
        const destination = getDestinationById(destinationId);
        if (destination) {
            history.push({
                ...booking,
                destinationDetails: destination
            });
        }
    });
    return history;
}

/**
 * Calculates average rating of favorite destinations
 * @returns {number} - Average rating or 0 if no favorites
 */
function calculateAverageFavoriteRating() {
    if (favoriteDestinations.size === 0) return 0;
    
    let totalRating = 0;
    favoriteDestinations.forEach(destinationId => {
        const destination = getDestinationById(destinationId);
        if (destination) {
            totalRating += destination.rating;
        }
    });
    
    return totalRating / favoriteDestinations.size;
}