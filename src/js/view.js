/**
 * chatView - handles all DOM manipulation and UI
 * component based approach
 */
class chatView {
    constructor() {
        this.messagesContainer = document.getElementById("messages");
        this.inputForm = document.getElementById("chat-form");
        this.inputField = document.getElementById("message-input");
        this.messageCount = document.getElementById("message-count");

        this.exportButton = document.getElementById("export-button");
        this.importButton = document.getElementById("import-button");
        this.clearButton = document.getElementById("clear-button");
        this.fileInput = document.getElementById("file-input");

        this.setUpEventListeners()
    }

    /**
     * set up event listeners
     */
    setUpEventListeners() {
        this.inputForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = this.inputField.value.trim()

            if (text) {
                document.dispatchEvent(new CustomEvent("message-send", {
                    detail: {text}
                }));

                this.inputField.value = "";
                this.inputField.focus();
            }
        });

        this.clearButton.addEventListener("click", () => {
            if (confirm("are you sure you want to clear this message?")) {
                document.dispatchEvent(new CustomEvent("messages-clear"))
            }
        });

        this.exportButton.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("messages-export"));
        });

        this.importButton.addEventListener("click", () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                document.dispatchEvent(new CustomEvent("messages-import", {
                    detail: {file}
                }));
                this.fileInput.value = ""; //ME: reset
            }
        })
    }

    /**
     * render all messages
     * @param {Array} messages - array of message objects
     */
    render(messages) {
        this.messagesContainer.innerHTML = "";
        this.messageCount.innerHTML = "";

        if (messages.length === 0) {
            this.showEmptyState();
        } else {
            messages.forEach((message) => {
                const messageElement = this.createMessageElement(message);
                this.messagesContainer.appendChild(messageElement);
            });
            this.scrollToBottom();
        }
    }

    /**
     * show empty state
     */
    showEmptyState() {
        this.messagesContainer.innerHTML = `
        <div class="empty-state">
            <p> No messages yet! Start a conversation now</p>
        </div>
        `;
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
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * create timestamp
     * @param {number} timestamp - unix timestamp (Date.now())
     * @returns {HTMLElement}
     */
    createTimestamp(timestamp) {
        const time = document.createElement("time")
        time.className = "message-timestamp";
        const now = new Date(timestamp);
        time.textContent = now.toLocaleTimeString("en-US",{
            hour: "numeric",
            minute: "2-digit",
        });
        time.setAttribute("datetime", now.toISOString())
        return time;

    }

    /**
     * create action buttons(edit and delete)
     * @param {string} messageID
     * @returns {HTMLElement}
     */
    createActionButtons(messageID) {

    }

    /**
     * create avatar
     * @param {boolean} isUser
     * @returns {HTMLElement}
     */
    createAvatar(isUser) {
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';

        const avatarIcon = document.createElement('span');
        avatarIcon.textContent = isUser ? '😊' : '🤖';

        avatarDiv.appendChild(avatarIcon);
        return avatarDiv;
    }
}
