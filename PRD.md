Project: Quote Keeper with Firebase Authentication & Firestore

Features Overview

    1.	Firebase Authentication:
    •	Allow users to sign up/sign in using Google authentication.
    •	Each user can manage their own collection of quotes.
    2.	Firebase Firestore Database:
    •	Store quotes in a Firestore collection linked to the authenticated user.
    •	Each user will have their own separate collection of quotes.
    3.	CRUD Operations:
    •	Create: Add a new quote with a text, author, and optional category.
    •	Read: Fetch and display the user’s quotes from Firestore.
    •	Update: Edit an existing quote.
    •	Delete: Remove a quote from the database.
    4.	Extra Features:
    •	Favorite Quotes: Allow users to mark quotes as favorites.
    •	Search & Filter: Search for quotes by text, author, or category.
    •	Personalization: Users can toggle between light and dark modes.

Tech Stack
React next js, Typescript, Lucide React, App Router,  Shadcn, Tailwind, Firebase (Authentication & Firestore)

Design Requirements:

Brand Colors: 

Use Tailwind colors and give the UI a Retro feel. It must be modern yet look retro style in the color and typography style.
1. Project Overview

Project Name: Quote Keeper

Description:

The Quote Keeper app allows users to manage their personal collection of quotes with the ability to add, edit, delete, favorite, search, and categorize quotes. The app uses Firebase Authentication for secure access, and Firebase Firestore for data storage. The design will have a retro feel using Tailwind’s colors and typography.

2. Key Objectives

    •	Enable users to securely sign in and manage their own collection of quotes.
    •	Provide seamless CRUD operations for adding, reading, updating, and deleting quotes.
    •	Allow users to mark favorite quotes and filter/search through their collection.
    •	Offer a personalized UI experience with light and dark modes.
    •	Use modern web technologies with a retro design aesthetic.

3. Features Overview

3.1 Firebase Authentication

    •	Functionality:
    •	Users can sign up/sign in using Google Authentication.
    •	Each user has their own personalized dashboard and access to their own quotes.
    •	Components:
    •	AuthProvider.tsx: Context to handle authentication state.
    •	Login.tsx: Google sign-in and sign-out functionality.
    •	Firebase Authentication SDK.

3.2 Firebase Firestore Database

    •	Functionality:
    •	Store quotes in a Firestore collection linked to each authenticated user.
    •	Each user has their own separate collection of quotes.
    •	Components:
    •	Firestore CRUD functions in firestore.tsx.

3.3 CRUD Operations

    •	Create: Add a new quote with fields: text, author, and optional category.
    •	Read: Fetch and display quotes from Firestore on the user’s dashboard.
    •	Update: Edit an existing quote.
    •	Delete: Remove a quote from the database.
    •	Components:
    •	QuoteForm.tsx: Handles adding and editing quotes.
    •	QuoteList.tsx: Displays a list of quotes.
    •	QuoteCard.tsx: Displays individual quote details.

3.4 Extra Features

    •	Favorites:
    •	Users can mark/unmark quotes as favorites.
    •	Filter quotes to show only favorites.
    •	FavoritesFilter.tsx: Filter component for viewing favorite quotes.
    •	Search & Filter:
    •	Search quotes by text, author, or category.
    •	Filter quotes by category using dropdown options.
    •	SearchBar.tsx & CategoryFilter.tsx.
    •	Personalization:
    •	Toggle between light and dark mode.
    •	Store user preference in local storage.
    •	ThemeToggle.tsx: Component for theme switching.

4. Design Requirements

4.1 Branding & Visual Style

    •	Color Scheme: Use Tailwind’s color palette with a retro vibe.
    •	Primary: #fbbf24 (Amber)
    •	Accent: #4b5563 (Cool Gray)
    •	Background (Dark Mode): #1f2937 (Gray-800)
    •	Background (Light Mode): #f3f4f6 (Gray-100)
    •	Typography: Retro-inspired fonts.
    •	Headers: Use a bold retro font style.
    •	Body Text: Use a modern, clean font like Inter for readability.

4.2 UI Components

    •	Navigation Bar:
    •	Links to Dashboard, Favorites, Add Quote, Profile, and Sign Out.
    •	Responsive design with a collapsible menu on mobile.
    •	Dashboard:
    •	Card layout displaying each quote with options to edit, delete, or favorite.
    •	Quote Form:
    •	Input fields for quote text, author, and category.
    •	Save and Cancel buttons.
    •	Dark/Light Mode Toggle:
    •	Positioned in the header for quick access.

5. Technical Requirements

5.1 Tech Stack

    •	Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS, Lucide React, shadcn
    •	Backend: Firebase (Authentication, Firestore)
    •	Tools: Vercel for deployment, GitHub for version control

5.2 Database Structure (Firestore)

Collection: quotes
Field	Type	Description
userId	string	Unique ID of the user
quote	string	The quote text
author	string	Author of the quote
category	string	Category (e.g., Motivation, Life)
favorite	boolean	Whether the quote is marked as favorite
createdAt	timestamp	Timestamp of when the quote was added

6. Pages Structure

6.1 Pages Overview
Page	Description	Components Used
/	Home page with Google sign-in	Login.tsx
/dashboard	User’s dashboard showing all quotes	Dashboard.tsx, QuoteList.tsx
/favorites	Displays only favorite quotes	FavoritesFilter.tsx
/add-quote	Form to add a new quote	QuoteForm.tsx
/edit-quote/:id	Edit quote based on the ID	QuoteForm.tsx

7. Component Breakdown

7.1 Authentication Components

    •	Login.tsx: Handles Google sign-in/sign-out.
    •	AuthProvider.tsx: Manages user authentication context.

7.2 Dashboard Components

    •	Dashboard.tsx: Displays all user quotes.
    •	QuoteCard.tsx: Displays each quote with actions (edit, delete, favorite).

7.3 CRUD Components

    •	QuoteForm.tsx: Form for adding/editing quotes.
    •	QuoteList.tsx: Lists all quotes fetched from Firestore.

7.4 Extra Components

    •	SearchBar.tsx: Allows users to search quotes.
    •	CategoryFilter.tsx: Filters quotes by category.
    •	FavoritesFilter.tsx: Filters to show only favorite quotes.
    •	ThemeToggle.tsx: Switch between light and dark modes.

8. User Stories

    1.	Authentication:
    •	As a user, I want to sign in with my Google account to manage my quotes securely.
    •	As a user, I want my quotes to be saved in my personal account.
    2.	CRUD Operations:
    •	As a user, I want to add new quotes with text, author, and category.
    •	As a user, I want to update or delete existing quotes.
    •	As a user, I want to mark quotes as favorites.
    3.	Search & Filter:
    •	As a user, I want to search for specific quotes by text or author.
    •	As a user, I want to filter my quotes by category or favorites.
    4.	Theming:
    •	As a user, I want to toggle between light and dark modes.

9. Non-Functional Requirements

    •	Performance: The app should load quickly and handle CRUD operations efficiently.
    •	Scalability: The app should scale with multiple users and increasing data.
    •	Security: Use Firebase Authentication to secure user data.
    •	Accessibility: Ensure the app is keyboard and screen reader accessible.

