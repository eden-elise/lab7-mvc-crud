# Lab 7: MVC Chat Application with CRUD Operations

**COMP305 Fall 2025 - Lab 7 Assignment**  
**Author:** Eden Tripp  
**Live Demo:** https://etcomp305-lab7.netlify.app/

---

## 📖 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [How to Use](#how-to-use)
4. [Architecture Explanation](#architecture-explanation)
5. [Technical Decisions](#technical-decisions)
6. [Development Process](#development-process)
7. [Challenges and Learnings](#challenges-and-learnings)
8. [Future Improvements](#future-improvements)

---

## 🎯 Overview

This project is a chat application built using the **Model-View-Controller (MVC)** architectural pattern. It extends the simple Eliza chatbot from Lab 6 with full **CRUD (Create, Read, Update, Delete)** operations and persistent data storage using localStorage.

The application demonstrates clean separation of concerns, where data management, UI rendering, and business logic are handled by distinct, independent components.

---

## ✨ Features

### Core Chat Functionality
- 💬 Real-time chat interface with Eliza-style bot responses
- 👤 User and bot message distinction with avatars
- ⏰ Timestamps displayed in each message bubble
- 📜 Auto-scroll to latest messages
- 🎨 Nature-themed design with earthy greens and browns

### CRUD Operations
- ✏️ **Create:** Send new messages that are automatically saved
- 📖 **Read:** Load chat history from localStorage on app start
- 🔄 **Update:** Edit your own messages (marked as "edited")
- 🗑️ **Delete:** Remove individual messages with confirmation
- 🧹 **Clear All:** Delete entire chat history with confirmation

### Data Management
- 💾 **Persistence:** Messages survive page refresh via localStorage
- 📤 **Export:** Download chat history as JSON file
- 📥 **Import:** Load chat history from JSON file
- 📊 **Message Counter:** Shows total number of messages

### User Experience
- ⚠️ Confirmation dialogs for destructive actions
- 🔍 Empty state when no messages exist
- 🎨 Clean, accessible UI with proper semantic HTML
- ⌨️ Keyboard support (Enter to send messages)

---

## 🚀 How to Use

### Basic Chat
1. Type your message in the input field at the bottom
2. Press **Enter** or click the **Send** button
3. Your message appears on the right (user side)
4. The bot responds automatically after a brief delay on the left (bot side)

### Editing Messages
1. Find a message you sent (user messages only)
2. Click the **Edit** button below the message
3. Enter your new text in the prompt dialog
4. The message updates and shows an "(edited)" indicator

### Deleting Messages
1. Click the **Delete** button on any message
2. Confirm the deletion in the dialog
3. The message is removed from the chat and storage

### Managing Chat History
- **Clear All:** Click the "Clear All" button in the header to delete all messages (requires confirmation)
- **Export:** Click "Export" to download your chat history as a JSON file
- **Import:** Click "Import" to upload a previously exported JSON file

### Data Persistence
- All messages are automatically saved to browser localStorage
- Refresh the page - your messages will still be there!
- Messages persist until you clear them or clear browser data

---

## 🏗️ Architecture Explanation

This application follows the **Model-View-Controller (MVC)** architectural pattern, which separates the application into three distinct components:

### 📊 Model (`model.js`)
**Responsibility:** Data management and business rules

The Model is the single source of truth for all message data. It:
- Stores messages in memory as an array of objects
- Persists data to localStorage using JSON serialization
- Provides CRUD methods: `createMessage()`, `getAll()`, `updateMessage()`, `deleteMessage()`, `clearMessages()`
- Implements the **Observer Pattern** to notify the View when data changes
- Validates data and handles errors (e.g., corrupted localStorage data)

**Key Design Decision:** The Model knows nothing about the View or Controller. It simply manages data and notifies observers of changes.

```javascript
// Message structure:
{
  id: "uuid-generated-string",
  text: "Hello there!",
  isUser: true,
  timestamp: 1234567890123,
  edited: false
}
```

### 🎨 View (`view.js`)
**Responsibility:** UI rendering and DOM manipulation

The View handles all interaction with the DOM. It:
- Creates HTML elements using a component-based approach
- Renders messages by calling helper methods (`createMessageElement()`, `createAvatar()`, `createTimestamp()`)
- Updates the UI when the Model notifies it of changes
- Dispatches custom events for user interactions (e.g., `message-send`, `message-edit`)
- Contains NO business logic - only presentation

**Key Design Decision:** The View doesn't know about the Model directly. It renders what it's told and emits events for user actions.

### 🎮 Controller (`controller.js`)
**Responsibility:** Business logic and coordination

The Controller acts as the "traffic cop" between Model and View. It:
- Creates instances of Model and View
- Subscribes the View as an observer of the Model
- Listens for custom events from the View
- Handles user actions by calling Model methods
- Coordinates bot responses using Eliza pattern matching
- Manages import/export functionality

**Key Design Decision:** The Controller never directly manipulates the DOM (that's the View's job) and never directly manages data (that's the Model's job).

---

## 🛠️ Technical Decisions

### Why MVC?
- **Separation of Concerns:** Each component has a single, clear responsibility
- **Maintainability:** Changes to UI don't affect data logic (and vice versa)
- **Testability:** Each component can be tested independently
- **Scalability:** Easy to add new features without breaking existing code

### Observer Pattern
Instead of having the Controller manually tell the View to update after every Model change, the Model notifies all observers automatically. This:
- Decouples the Model from knowing about the View
- Allows multiple components to react to the same data change
- Makes the code more flexible and maintainable

### localStorage vs. Other Options
**Chosen:** localStorage with JSON serialization

**Why:**
- ✅ Simple to implement (no backend required)
- ✅ Data persists across sessions
- ✅ Works offline
- ✅ No authentication needed for this lab

**Trade-offs:**
- ❌ Limited to ~5-10MB of storage
- ❌ Data is per-browser (not synced across devices)
- ❌ Vulnerable to being cleared by user

**Future Migration Path:** The Model's storage methods (`_save()`, `loadFromStorage()`) are isolated, making it easy to swap localStorage for IndexedDB or a REST API later.

### Component-Style Rendering
Rather than using giant HTML template strings, the View breaks rendering into small, reusable functions:
- `createMessageElement()` - Builds a complete message
- `createAvatar()` - Creates avatar icon
- `createTimestamp()` - Formats and displays time
- `createActionButtons()` - Adds Edit/Delete controls

This approach:
- Makes code easier to read and maintain
- Allows reuse of components
- Follows the Single Responsibility Principle
- Similar to React component thinking

### UUID for Message IDs
**Chosen:** `crypto.randomUUID()` for generating unique IDs

**Why:**
- ✅ Truly unique (no collisions)
- ✅ Built into modern browsers
- ✅ No dependency on sequential numbers or timestamps
- ✅ Works even if messages are created at the exact same millisecond

### Error Handling
The application handles several error cases:
- **Corrupted localStorage:** Falls back to empty array
- **Invalid import file:** Shows error message to user
- **Missing message during edit/delete:** Fails gracefully
- **Empty message submission:** Prevented by View validation

---

## 🔨 Development Process

### Planned Approach
The lab was approached systematically by building each layer of the MVC pattern:

1. **Model First** (Data Layer)
    - Defined message structure
    - Implemented CRUD operations
    - Added localStorage persistence
    - Built observer pattern for notifications

2. **View Second** (Presentation Layer)
    - Created HTML structure in `index.html`
    - Built component-style rendering methods
    - Added event listeners that dispatch custom events
    - Styled with nature-themed CSS using CSS variables

3. **Controller Third** (Coordination Layer)
    - Connected Model and View
    - Implemented event handlers
    - Added Eliza bot response logic
    - Built import/export functionality

4. **Testing & Refinement**
    - Tested each CRUD operation
    - Verified localStorage persistence
    - Checked edge cases (empty state, corrupted data)
    - Refined UI/UX based on testing

### Git Workflow
Incremental commits were made throughout development:
- Initial setup and file structure
- Model implementation with CRUD operations
- View implementation with component rendering
- Controller implementation and event handling
- Styling and UI improvements
- Bug fixes and refinements

---

## 💭 Challenges and Learnings

### Challenge 1: Understanding the Observer Pattern
Initially, I tried having the Controller manually tell the View to re-render after every Model change. This created tight coupling and was hard to maintain.

**Solution:** Implemented the observer pattern where the Model notifies registered observers (the View) automatically when data changes. This made the code much cleaner.

**Learning:** The observer pattern is powerful for decoupling components and is used in many frameworks (like React's state management).

### Challenge 2: Timestamp Placement
I wanted timestamps inside the message bubbles at the bottom right, but initially had them outside.

**Solution:** Modified `createMessageElement()` to append the timestamp as a child of the text paragraph element, then styled it with `display: block` and `text-align: right`.

**Learning:** DOM structure and CSS work together - sometimes you need to adjust the HTML structure to achieve the desired visual layout.

### Challenge 3: Import Validation
Early versions would crash if you imported an invalid JSON file.

**Solution:** Wrapped the JSON parsing in a try-catch block and validated that the result is an array before replacing the messages.

---

## 📚 Resources Used

- Lab 6 - Eliza Chatbot (building on previous work)
- Professor's MVC examples (simple-mvc, event-bus, routing)
- Claude AI for assistance when needed and ideas for how to approach certain functions

---

## 📝 License

**MIT** <br> 
This project was created for educational purposes as part of COMP305 Fall 2025.

---

**Repository:** https://github.com/eden-elise/lab7-mvc-crud <br>
**Live Demo:** https://etcomp305-lab7.netlify.app/ <br>
**Date Completed:** 10/22/2025