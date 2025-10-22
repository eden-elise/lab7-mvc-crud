import ChatModel from './model.js';
import ChatView from './view.js';
import { getBotResponse } from 'eliza.js';

/**
 * chatController - coordinates between Model and View
 * handles all user interactions and business logic
 */
class ChatController {
    constructor() {
        this.model = new ChatModel();
        this.view = new ChatView();

        this.init();
    }

    /**
     * initialize the controller
     */
    init() {
        this.model.addObserver((messages) => {
            this.view.render(messages);
        });

        this.setupEventListeners();

        this.view.render(this.model.getAll());
    }

    /**
     * setup event listeners for custom events from view
     */
    setupEventListeners() {
        document.addEventListener('message-send', (e) => {
            this.handleMessageSend(e.detail.text);
        });

        document.addEventListener('message-edit', (e) => {
            this.handleMessageEdit(e.detail.id);
        });

        document.addEventListener('message-delete', (e) => {
            this.handleMessageDelete(e.detail.id);
        });

        document.addEventListener('messages-clear', () => {
            this.handleMessagesClear();
        });

        document.addEventListener('messages-export', () => {
            this.handleExport();
        });

        document.addEventListener('messages-import', (e) => {
            this.handleImport(e.detail.file);
        });
    }

    /**
     * handle sending a new message
     * @param {string} text - User's message text
     */
    handleMessageSend(text) {
        // TODO: Implement this

    }

    /**
     * handle editing a message
     * @param {string} id - Message ID to edit
     */
    handleMessageEdit(id) {
        // TODO: Implement this

    }

    /**
     * handle deleting a message
     * @param {string} id - Message ID to delete
     */
    handleMessageDelete(id) {
        // TODO: Implement this
    }

    /**
     * handle clearing all messages
     */
    handleMessagesClear() {
        // TODO: Implement this
    }

    /**
     * handle exporting chat history to JSON file
     */
    handleExport() {
        // TODO: Implement this
    }

    /**
     * handle importing chat history from JSON file
     * @param {File} file - the JSON file to import
     */
    handleImport(file) {
        // TODO: Implement this
    }
}

export default ChatController;