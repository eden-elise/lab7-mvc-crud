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
    notifyObserver() {
        this.observers.forEach(callback => {
            callback(this.messages);
        });
    }
}
