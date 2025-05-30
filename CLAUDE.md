# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start live development server (opens src/index.html)
- `npm install` - Install dependencies (live-server)
- Open `src/index.html` directly in browser for simple testing

## Project Architecture

This is a client-side JavaScript mind mapping application using the vis.js network library. The architecture follows a modular component-based design:

### Core Components

**MindMap.js** - Main application class that manages the vis.js network instance, handles node/edge data sets, and provides methods for CRUD operations on the mind map. Uses global `vis` object loaded from CDN.

**main.js** - Application entry point that initializes the MindMap component and sets up all UI event listeners. Handles toolbar interactions and coordinates between UI and MindMap logic.

**ui.js** - Handles UI-specific interactions like shape submenu, theme toggling, and customization panels. Communicates with main.js through custom DOM events.

### Key Architectural Patterns

- **Global vis.js Library**: The vis-network library is loaded globally via script tag, not as an ES6 module
- **Event-Driven Communication**: UI components communicate with the main app through custom DOM events (`shapeChange`, `customizeNode`)
- **LocalStorage Persistence**: Mind maps can be saved/loaded using browser localStorage with JSON serialization
- **Double-click Creation**: Primary interaction pattern is double-clicking to create nodes (either on empty canvas or existing nodes)

### Data Flow

1. User interactions trigger events in main.js
2. main.js calls methods on MindMap instance
3. MindMap updates vis.js DataSets (nodes/edges)
4. vis.js network automatically re-renders
5. UI state changes dispatch custom events back to main.js

### Styling & Theming

- CSS is split between `style.css` (main styles) and `theme.css` (dark/light themes)
- Theme switching modifies `body.dark-theme` class
- Dynamic grid background adjusts with zoom level
- Portuguese UI text throughout the application