// Complete bus data for all destinations
const busData = {
    "goa": [
        {
            id: "GOA-101",
            operator: "Paulo Travels",
            type: "AC Sleeper",
            departure: "Mumbai",
            arrival: "Panjim",
            departureTime: "20:00",
            arrivalTime: "06:00",
            duration: "10h",
            seats: 32,
            price: 1200,
            rating: 4.2,
            amenities: ["AC", "Charging Points", "Blanket", "Water Bottle"],
            departureCities: ["Mumbai", "Pune", "Bangalore"],
            arrivalCities: ["Panjim", "Margao", "Vasco"]
        },
        {
            id: "GOA-102",
            operator: "VRL Travels",
            type: "Non-AC Sleeper",
            departure: "Bangalore",
            arrival: "Margao",
            departureTime: "21:30",
            arrivalTime: "07:30",
            duration: "10h",
            seats: 36,
            price: 900,
            rating: 3.8,
            amenities: ["Water Bottle"],
            departureCities: ["Bangalore", "Hubli"],
            arrivalCities: ["Margao", "Panjim"]
        }
    ],
    "delhi": [
        {
            id: "DEL-201",
            operator: "Rajdhani Express",
            type: "Volvo AC",
            departure: "Jaipur",
            arrival: "Delhi",
            departureTime: "07:00",
            arrivalTime: "11:30",
            duration: "4h 30m",
            seats: 40,
            price: 600,
            rating: 4.5,
            amenities: ["AC", "TV", "Charging Points"],
            departureCities: ["Jaipur", "Agra"],
            arrivalCities: ["Delhi", "Gurgaon"]
        },
        {
            id: "DEL-202",
            operator: "Delhi Travels",
            type: "AC Seater",
            departure: "Chandigarh",
            arrival: "Delhi",
            departureTime: "22:00",
            arrivalTime: "03:30",
            duration: "5h 30m",
            seats: 45,
            price: 550,
            rating: 4.0,
            amenities: ["AC", "Water Bottle"],
            departureCities: ["Chandigarh", "Ambala"],
            arrivalCities: ["Delhi", "Noida"]
        }
    ],
    "pondicherry": [
        {
            id: "POND-301",
            operator: "Parveen Travels",
            type: "AC Semi-Sleeper",
            departure: "Chennai",
            arrival: "Pondicherry",
            departureTime: "08:00",
            arrivalTime: "11:30",
            duration: "3h 30m",
            seats: 40,
            price: 450,
            rating: 4.5,
            amenities: ["AC", "TV", "Water Bottle"],
            departureCities: ["Chennai", "Vellore"],
            arrivalCities: ["Pondicherry", "Auroville"]
        },
        {
            id: "POND-302",
            operator: "KPN Travels",
            type: "Non-AC Seater",
            departure: "Bangalore",
            arrival: "Pondicherry",
            departureTime: "22:00",
            arrivalTime: "05:00",
            duration: "7h",
            seats: 42,
            price: 600,
            rating: 3.8,
            amenities: ["Water Bottle"],
            departureCities: ["Bangalore", "Vellore"],
            arrivalCities: ["Pondicherry"]
        }
    ],
    "ahmedabad": [
        {
            id: "AHM-401",
            operator: "Shrinath Travels",
            type: "AC Sleeper",
            departure: "Mumbai",
            arrival: "Ahmedabad",
            departureTime: "22:00",
            arrivalTime: "06:30",
            duration: "8h 30m",
            seats: 30,
            price: 1100,
            rating: 4.1,
            amenities: ["AC", "Blanket", "Water Bottle"],
            departureCities: ["Mumbai", "Surat"],
            arrivalCities: ["Ahmedabad", "Gandhinagar"]
        },
        {
            id: "AHM-402",
            operator: "Gujarat Travels",
            type: "Non-AC Sleeper",
            departure: "Udaipur",
            arrival: "Ahmedabad",
            departureTime: "21:00",
            arrivalTime: "03:00",
            duration: "6h",
            seats: 36,
            price: 700,
            rating: 3.9,
            amenities: ["Water Bottle"],
            departureCities: ["Udaipur", "Mount Abu"],
            arrivalCities: ["Ahmedabad"]
        }
    ],
    
    
};

// DOM Elements
const busCardsContainer = document.getElementById('bus-cards-container');
const destinationTitle = document.getElementById('destination-title');
const destinationSubtitle = document.getElementById('destination-subtitle');
const departureFilter = document.getElementById('departure-filter');
const arrivalFilter = document.getElementById('arrival-filter');
const operatorFilter = document.getElementById('operator-filter');
const priceSort = document.getElementById('price-sort');
const ratingSort = document.getElementById('rating-sort');

// Get destination from URL
function getDestination() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination')?.toLowerCase();
    
    // If no destination parameter, show all buses
    if (!destination) {
        return 'all';
    }
    
    if (!busData[destination]) {
        console.warn(`Invalid destination: ${destination}. Showing all buses`);
        return 'all';
    }
    
    return destination;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const destination = getDestination();
    console.log(`Loading buses for: ${destination}`);
    
    const destinationNames = {
        'goa': 'Goa',
        'delhi': 'Delhi',
        'pondicherry': 'Pondicherry',
        'ahmedabad': 'Ahmedabad',
        'all': 'India'
    };
    
    destinationTitle.textContent = destination === 'all' 
        ? 'Buses Across India' 
        : `Buses to ${destinationNames[destination] || destination}`;
    
    destinationSubtitle.textContent = destination === 'all'
        ? 'Showing all available bus routes across India'
        : `Showing all available bus routes to ${destinationNames[destination] || destination}`;
    
    displayBuses(destination);
    populateFilters(destination);
    
    departureFilter.addEventListener('change', () => filterBuses(destination));
    arrivalFilter.addEventListener('change', () => filterBuses(destination));
    operatorFilter.addEventListener('change', () => filterBuses(destination));
    priceSort.addEventListener('change', () => sortBuses(destination));
    ratingSort.addEventListener('change', () => sortBuses(destination));
});

// Display buses for selected destination
function displayBuses(destination, busesToShow = null) {
    let buses = [];
    
    if (destination === 'all') {
        // Show all buses from all destinations
        buses = Object.values(busData).flat();
    } else {
        buses = busesToShow || busData[destination] || [];
    }
    
    busCardsContainer.innerHTML = '';
    
    if (buses.length === 0) {
        busCardsContainer.innerHTML = '<div class="no-results">No buses found matching your criteria</div>';
        return;
    }
    
    buses.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'bus-card';
        card.innerHTML = `
            <div class="bus-card-header">
                <span class="bus-operator">${bus.operator}</span>
                <span class="bus-type">${bus.type}</span>
                <span class="bus-id">${bus.id}</span>
            </div>
            <div class="bus-card-body">
                <div class="bus-route">
                    <div class="route-city">
                        <h3>${bus.departure}</h3>
                        <p>${bus.departureTime}</p>
                    </div>
                    <div class="route-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="route-city">
                        <h3>${bus.arrival}</h3>
                        <p>${bus.arrivalTime}</p>
                    </div>
                </div>
                <div class="bus-details">
                    <div class="detail-item">
                        <h4>Duration</h4>
                        <p>${bus.duration}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Seats</h4>
                        <p>${bus.seats}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Bus No.</h4>
                        <p>${bus.id}</p>
                    </div>
                </div>
                <div class="bus-amenities">
                    <h4>Amenities:</h4>
                    <div class="amenities-list">
                        ${bus.amenities.map(amenity => 
                            `<span class="amenity-item"><i class="fas fa-check"></i> ${amenity}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="bus-card-footer">
                    <div class="bus-price">
                        ₹${bus.price}<span>per seat</span>
                    </div>
                    <div class="bus-rating">
                        <div class="rating-stars">
                            ${getStarRating(bus.rating)}
                        </div>
                        <span class="rating-value">${bus.rating}</span>
                    </div>
                    <button class="book-btn" onclick="bookBus('${bus.id}')">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>
        `;
        busCardsContainer.appendChild(card);
    });
}

// Populate filter dropdowns
function populateFilters(destination) {
    const buses = destination === 'all' 
        ? Object.values(busData).flat() 
        : busData[destination] || [];
    
    const departureCities = new Set();
    const arrivalCities = new Set();
    const operators = new Set();
    
    buses.forEach(bus => {
        bus.departureCities.forEach(city => departureCities.add(city));
        bus.arrivalCities.forEach(city => arrivalCities.add(city));
        operators.add(bus.operator);
    });
    
    departureFilter.innerHTML = '<option value="">Departure City</option>';
    Array.from(departureCities).sort().forEach(city => {
        departureFilter.innerHTML += `<option value="${city}">${city}</option>`;
    });
    
    arrivalFilter.innerHTML = '<option value="">Arrival City</option>';
    Array.from(arrivalCities).sort().forEach(city => {
        arrivalFilter.innerHTML += `<option value="${city}">${city}</option>`;
    });
    
    operatorFilter.innerHTML = '<option value="">Bus Operator</option>';
    Array.from(operators).sort().forEach(operator => {
        operatorFilter.innerHTML += `<option value="${operator}">${operator}</option>`;
    });
}

// Filter buses based on selected filters
function filterBuses(destination) {
    const departureCity = departureFilter.value;
    const arrivalCity = arrivalFilter.value;
    const operator = operatorFilter.value;
    
    let busesToFilter = destination === 'all' 
        ? Object.values(busData).flat() 
        : busData[destination] || [];
    
    const filteredBuses = busesToFilter.filter(bus => {
        const matchesDeparture = !departureCity || bus.departureCities.includes(departureCity);
        const matchesArrival = !arrivalCity || bus.arrivalCities.includes(arrivalCity);
        const matchesOperator = !operator || bus.operator === operator;
        
        return matchesDeparture && matchesArrival && matchesOperator;
    });
    
    displayBuses(destination, filteredBuses);
}

// Sort buses
function sortBuses(destination) {
    const priceSortValue = priceSort.value;
    const ratingSortValue = ratingSort.value;
    
    let busesToSort = destination === 'all' 
        ? [...Object.values(busData).flat()] 
        : [...busData[destination]];
    
    if (priceSortValue === 'low-high') {
        busesToSort.sort((a, b) => a.price - b.price);
    } else if (priceSortValue === 'high-low') {
        busesToSort.sort((a, b) => b.price - a.price);
    }
    
    if (ratingSortValue === 'high-low') {
        busesToSort.sort((a, b) => b.rating - a.rating);
    } else if (ratingSortValue === 'low-high') {
        busesToSort.sort((a, b) => a.rating - b.rating);
    }
    
    displayBuses(destination, busesToSort);
}

// Helper function for star ratings
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return (
        '<i class="fas fa-star"></i>'.repeat(fullStars) +
        '<i class="fas fa-star-half-alt"></i>'.repeat(halfStar) +
        '<i class="far fa-star"></i>'.repeat(emptyStars)
    );
}

// Book bus function
function bookBus(busId) {
    alert(`Booking bus ${busId}. This would redirect to booking page in a real application.`);
    // In a real app: window.location.href = `booking.html?busId=${busId}`;
}