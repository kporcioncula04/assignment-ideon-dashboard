# React + Vite Assignment - Ideon App
This repository provides a minimal setup for building a React application using Vite with hot module replacement (HMR) and basic ESLint configurations. Vite ensures fast builds, efficient HMR, and an overall excellent development experience with React.

## Project Setup
This project uses the following plugins and tools:

Vite: For fast and optimized development.
React: The popular JavaScript library for building user interfaces.
@vitejs/plugin-react: Enables Fast Refresh and JSX support via Babel.
ESLint: Provides linting rules to maintain code quality.
Netlify: for fast build and deploy

## Installation
To get started with the project, ensure you have Node.js installed. Then follow the steps below:

### 1. Clone the Repository
```bash
git clone https://github.com/kporcioncula04/assignment-ideon-dashboard.git
```

### 2. Install Dependencies
Navigate to the project folder and install the necessary dependencies:
```bash
cd assignmen-ideon-dashboard
npm install
```
### 3. Run the Development Server
Once the installation is complete, you can run the app locally using Vite’s development server:
```bash
npm run dev
```
By default, the app will be running at http://localhost:5173. Vite offers fast HMR for a seamless development experience.
### 4. Build for Production
To build the project for production, run the following command:
```bash
npm run build
```
This will create an optimized build in the dist/ directory.
### 5. Preview the Production Build
To preview the production build locally, you can use the following command:
```bash
npm run preview
```

## To view the deployed app visit:
```
https://ideon-dashboard-assignment.netlify.app/coveragePeriods
```

## Challenges and Tradeoffs
#### Challenge: 
Implementing the main filter drawer and table functionality had some challenges, particularly in the design and functionality requirements. The filter drawer needed to be flexible to handle multiple filter options while ensuring ease of use. Also, the table needed to respond dynamically to user input, updating the data in real-time as filters were applied. The process required careful consideration of both the technical implementation and maintaining a seamless user experience, which made it a complex task to ensure both aspects were fully aligned.

#### Tradeoffs:
Due to time constraints, my focuse was primarily on developing the table and drawer functionalities, ensuring they worked smoothly with the design because of this some additional features of the table, such as advanced sorting, export button, search from the main dashboard, pagination enhancements, were not fully implemented yet. These will be addressed in future iterations to improve overall functionality and user experience.

## Future Todos
- **SideNav**: 
  - Fix icons.
- **Customer Dashboard**: 
  - Implement export functionality.
- **Table**: 
  - Implement search functionality.
  - Add filter function count.
  - Design and show applied filters.
  - Display "none" when no results are found.
- **Drawer**: 
  - Clean up functionality and design.

## Project Structure
Here's an overview of the project structure:
```
.
├── public          # Static assets (icons, images)
├── src             # React components and app source files
│   ├── assets      # Static assets for your app
│   ├── components  # Reusable components
|    |--CustomTable.jsx 
|    |--FilterDrawer.jsx
|    |--FilterApply.jsx
|    |--FilterSaved.jsx
│   ├── data        # Mock data for columns and rows
|    |--columnsHeader.js 
|    |--mockData.js
│   ├── scenes      # Each Route should to create each dashboard scene 
|    |--coveragePeriods
|      |--index.js 
|      |--index.css
|    |-- customerDashboard
|      |--index.js 
|      |--index.css
|    |-- global
|      |--SideNav.js 
|      |--TopNav.js
│   ├── App.jsx     # Main component of the app
│   ├── index.css   # Global CSS of the app
│   ├── App.jsx     # Main component of the app
│   ├── themes.jsx  # Global Themes of the app
│   ├── main.jsx    # Entry point for Vite
├── .eslintrc.js    # ESLint configuration
├── index.html      # HTML entry point
├── package.json    # Project dependencies and scripts
└── vite.config.js  # Vite configuration
```

# Available Scripts
In the project directory, you can run the following scripts:
```bash
npm run dev: Runs the app in development mode.
npm run build: Builds the app for production.
npm run preview: Previews the built production app locally.
npm run lint: Lints the code to ensure adherence to ESLint rules.
```

