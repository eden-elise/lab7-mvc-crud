/** ME:
 * message structure
 * {
 *     id: string (unique)
 *     text: string
 *     isUser: boolean
 *     timestamp: number (date.now())
 *     edited: boolean (optional)
 * }
 */

class chatModel {
    constructor () {
        this.messages = []; //ME: use of array instead of object because message order matters
        this.STORAGE_KEY = "chatMessages";
        this.observers = [];

        this.loadMessages();
    }

    /**
     * add observer(called when data changes)
     * @param {Function} callback - function to call when data changes
     */
    addObserver(callback) {
        this.observers.push(callback);
    }

    /**
     * notify observers that data changed
     * passes current messages to each observer
     */
    notifyObservers() {
        this.observers.forEach(callback => {
            callback(this.messages);
        });
    }

    /**
     * load messages from local storage
     */
    loadMessages() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            this.messages = data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading messages', error);
            this.messages = [];
        }
    }

    /**
     * save messages to local storage
     * @private
     */
    _save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages));
        } catch (error) {
            console.error('Error saving messages', error);
        }
    }

    /**
     * get all messages
     * @returns {Array} - array of message objects
     */
    getAll() {
        return this.messages;
    }

    /**
     * create a new message
     * @param {string} text - the message text
     * @param {boolean} isUser - True if user, False if bot
     * @returns {object} - the created message object
     */
    createMessage(text, isUser) {
        const message = {
            id: crypto.randomUUID(), //ME: unique ID generation that is not sequential numbers
            text: text,
            isUser: isUser,
            timestamp: Date.now(),
            edited: false
        };

        this.messages.push(message);
        this._save();
        this.notifyObservers();
        return message;
    }
}
