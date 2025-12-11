const API_URL = "https://randomuser.me/api/";

const userCard = document.getElementById("card");
const userPhoto = document.getElementById("user_photo");
const userTitle = document.getElementById("user_title");
const userValue = document.getElementById("user_value");
const valuesList = document.getElementById("values_list");
const btn = document.getElementById("btn");
const skeleton = document.getElementById("skeleton");
const statusArea = document.getElementById("statusArea");
const statusText = document.getElementById("status");
const loader = document.getElementById("loader");

let currentUserData = {};
let isLoading = false;

/**
 * Process the user object received from the API, stores it, and updates the initial DOM
 * @param {Object} user "results[0]" object from API response
 */
function processUserData(user) {
    currentUserData = user;
    const fullName = `${user.name.first} ${user.name.last}`;
    userPhoto.src = user.picture.large;
    userPhoto.alt = `${user.name.title} ${fullName} profile picture`;

    userTitle.textContent = "Hi, My name is";
    userValue.textContent = fullName;

    const nameIconLi = valuesList.querySelector('[data-label="name"]');

    if (nameIconLi) {
        updateActiveIcon(nameIconLi);
    }
}

/**
 * Fetches a new random user from the API, handles loading states, processes the received data, and manages potential errors.
 */
async function getNewUser() {
    if(isLoading) return;

    isLoading = true;
    showLoading();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const httpError = new Error(`HTTP Error: ${response.status}`);
            httpError.status = response.status;
            httpError.url = API_URL;

            throw httpError;
        }

        const data = await response.json();

        processUserData(data.results[0]);
        hideLoading();
    } catch (e) {
        console.error("Error fetching user data:", e);
        showError("Failed to load user data. Check your connection and try again.");
    } finally {
        isLoading = false;
    }
}

/**
 * Event handler for icon hovering with mouse, responsible for delegation, data extraction, and updating the active state and user details.
 * @param {Event} e The mouseover event object.
 */
const handleIconHover = (e) => {
    const targetLi = e.target.closest("li");

    if (!targetLi) return;

    const dataLabel = targetLi.dataset.label;
    const dataTitle = targetLi.dataset.title;

    if (dataLabel) {
        const dataValue = extractUserData(dataLabel);

        userTitle.textContent = dataTitle;
        userValue.textContent = dataValue;

        updateActiveIcon(targetLi);
    }
};

/**
 * Event handler for keyboard navigation on icon list items.
 * Responds to Enter and Space keys to activate icons.
 * @param {KeyboardEvent} e The keyboard event object.
 */
const handleIconKey = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();

    const targetLi = e.target.closest("li");

    if (!targetLi) return;

    const dataLabel = targetLi.dataset.label;
    const dataTitle = targetLi.dataset.title;

    if (dataLabel) {
        const dataValue = extractUserData(dataLabel);

        userTitle.textContent = dataTitle;
        userValue.textContent = dataValue;

        updateActiveIcon(targetLi);
    }
};

/**
 * Retrieves the specific data value from the currentUserData object based on the label.
 * Handles nested and complex data structures (like name and location).
 * @param {string} label The data-label (e.g. "name", "email").
 * @returns {string} The formatted value to be displayed.
 */
const extractUserData = (label) => {
    const user = currentUserData;

    if (!user || Object.keys(user).length === 0) {
        return "Data not found";
    }

    switch (label) {
        case "name":
            return `${user.name?.first ?? "N/A"} ${user.name?.last ?? "N/A"}`;
        
        case "location":
            const street = `${user.location?.street?.number ?? "N/A"} ${user.location?.street?.name ?? "N/A"}`;
            return street;

        case "birthday":
            if (!user.dob?.date) return "N/A";
            const birthDate = new Date(user.dob.date);
            return birthDate.toLocaleDateString("en-US");
        
        case "email":
            return user.email ?? "N/A";

        case "phone":
            return user.phone ?? "N/A";

        default:
            return "Data not found";
    }
};

// Cache DOM elements that don't change
const iconElements = valuesList.querySelectorAll("li");

/**
 * Manages the "active" CSS class on the icon list items.
 * @param {HTMLElement} targetLi The <li> element that should be set as active.
 */
const updateActiveIcon = (targetLi) => {
    iconElements.forEach(icon => {
        icon.classList.remove("active");
    });

    targetLi.classList.add("active");
}

/**
 * Shows the skeleton loading placeholder with a spinner overlay.
 */
const showLoading = () => {
    userCard.classList.add("hidden");
    skeleton.classList.remove("hidden");
    statusArea.classList.remove("hidden");
    loader.classList.remove("hidden");
    statusText.textContent = "";
};

/**
 * Hides the skeleton and spinner, shows the user card content
 */
const hideLoading = () => {
    skeleton.classList.add("hidden");
    statusArea.classList.add("hidden");
    loader.classList.add("hidden");
    userCard.classList.remove("hidden");
};

/**
 * Displays an error message and hides the user card content.
 * @param {string} message The error message to display.
 */
const showError = (message) => {
    statusArea.classList.remove("hidden");

    userCard.classList.add("hidden");

    statusText.textContent = message;

    loader.classList.add("hidden");
};

getNewUser();

btn.addEventListener("click", getNewUser);

valuesList.addEventListener("mouseover", handleIconHover);
valuesList.addEventListener("keydown", handleIconKey);