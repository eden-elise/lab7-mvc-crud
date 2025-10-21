/**
 * chatView - handles all DOM manipulation and UI
 * component based approach
 */
class chatView {
    constructor() {
        this.messagesContainer = null;
        this.inputForm = null;
        this.inputField = null;
        this.messageCountDisplay = null;
        this.init()
    }
    init() {
        //DOM structure
    }

    /**
     * render all messages
     * @param {Array} messages - array of message objects
     */
    render(messages) {
        //render all messages
    }

    /**
     * create a single message element
     * @param {Object} message - message object
     * @returns {HTMLElement} the message element
     */
    createMessageElement(message) {

    }

    /**
     * scroll to bottom
     */
    scrollToBottom() {

    }

    /**
     * creat timestamp
     * @param {number} timestamp - unix timestamp (Date.now())
     * @returns {HTMLElement}
     */
    createTimestamp(timestamp) {
        const time = document.createElement("time")
        time.className = "message-timestamp";
        const now = timestamp;
        time.textContent = now.toLocaleTimeString("en-US",{
            hour: "numeric",
            minute: "2-digit",
        });
        time.setAttribute("datatime", now.toISOString())
        return time;

    }

    /**
     * create action buttons(edit and delete)
     * @param {string} messageID
     * @returns {HTMLElement}
     */
    createActionButtons(messageID) {

    }
}
