##### Random User Generator #####

> _Generate random user profiles with a single click! A modern, interactive web app that fetches real-time user data and displays it beautifully._

## Overview

A sleek and interactive web application that fetches random user profiles from the [Random User API](https://randomuser.me/). Click on different icons to explore various details about each generated user, including their name, email, birthday, location, and phone number.

This project demonstrates modern **JavaScript best practices**, including:
- Async/await patterns for API calls
- Event delegation and DOM manipulation
- Skeleton loading screens for better UX
- Comprehensive error handling
- Accessible keyboard interactions
- Clean, maintainable code architecture

## Features

- **Random User Fetching** – Generates a new user profile with every click
- **Interactive Details** – Click on icons to reveal different user information (name, email, birthday, location, phone)
- **Skeleton Loading** – Smooth loading state with skeleton UI while data is being fetched
- **Error Handling** – Graceful error messages if the API request fails
- **Responsive Design** – Works beautifully on desktop, tablet, and mobile devices
- **Accessible** – Keyboard navigation support with proper ARIA attributes
- **Font Awesome Icons** – Clean, modern iconography for visual appeal

## Quick Start

1. **Clone or download the repository**
   ```bash
   git clone <your-repo-url>
   cd user-generator
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your favorite browser
   # No build tools or server setup required!
   ```

3. **Start generating!**
   - Click the "Get New User" button to fetch a random profile
   - Hover over or click the icons to see different user details
   - Enjoy exploring random users!

## Project Structure

```
user-generator/
├── index.html           # HTML structure with semantic markup
├── style.css            # Responsive styling and animations
├── user-generator.js    # Core JavaScript logic
├── README.md            # This file
└── assets/
    └── favicon.png      # Project favicon
```

## Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Styling, animations, and responsive design |
| **JavaScript (ES6+)** | Async/await, arrow functions, event handling |
| **Fetch API** | Making HTTP requests to the Random User API |
| **Font Awesome 6.5** | Icon library |

## How It Works

### Data Flow
1. User clicks the "Get New User" button
2. Loading state is triggered (skeleton UI appears)
3. Async function fetches data from `https://randomuser.me/api/`
4. User data is processed and stored in a global object
5. DOM is updated with the new user's information
6. User can interact with icons to see different details

### Key Functions
- **`getNewUser()`** – Fetches random user from API with error handling
- **`processUserData()`** – Extracts and stores user information
- **`handleIconHover()`** – Manages interactions with detail icons
- **`showLoading()` / `hideLoading()`** – Controls loading states

## Features in Detail

### Interactive Icon System
The app includes 5 interactive icons:
- **Name** – Full name display
- **Email** – Email address
- **Birthday** – Date of birth
- **Location** – Full address
- **Phone** – Phone number

Each icon is clickable/hoverable and updates the main display with the corresponding user information.

### Skeleton Loading
While data is being fetched, a skeleton screen appears to improve perceived performance and provide visual feedback.

### Error Handling
Network errors are caught gracefully with user-friendly messages, ensuring the app never crashes unexpectedly.

## Customization

### Change the API URL
```javascript
// In user-generator.js, line 1:
const API_URL = "https://randomuser.me/api/";
```

### Add More User Details
Add new properties in the HTML:
```html
<li tabindex="0" data-title="My nationality is" data-label="nationality">
    <i class="fa-solid fa-flag"></i>
</li>
```

Then update the `processUserData()` function to handle the new property.

## Learning Outcomes

This project is perfect for practicing:
- Fetch API and Promise handling
- Async/await syntax
- DOM manipulation and event listeners
- Event delegation patterns
- Error handling and try/catch blocks
- Skeleton loading patterns
- Responsive CSS design
- Accessibility best practices

## Browser Compatibility

Works in all modern browsers that support:
- Fetch API
- ES6+ JavaScript
- CSS Grid & Flexbox

## License

Open source and free to use for learning and personal projects.

## Contributing

Feel free to fork, modify, and improve! Some ideas:
- Add filters (by gender, nationality, etc.)
- Export user data as PDF or CSV
- Add dark mode theme
- Create a user history/favorites feature
- Add animations and transitions

---

If you found this helpful, consider giving it a star. Thanks for reading
