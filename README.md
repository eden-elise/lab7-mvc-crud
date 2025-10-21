# lab7-mvc-crud
COMP305 Fall 2025 Lab 7 assignment

Author: Eden Tripp

Projected working plan: 
* Start with Model
  * Model = The data itself(the message object with the text, timestamp, id, who sent it)
    * Store messages in memory(array)
    * create new messages (with unique ID, timestamp, etc)
    * save to local storage
    * load from local storage
    * get all messages
    * delete a message
    * update a message
    * clear messages
* View
  * View = Handle all DOM manipulation and rendering 
    * render messages:
      * message container
      * individual messages
        * avatar
        * text
        * timestamp
        * edited indicator
        * edit button
        * delete button
    * render controls
      * input form(text&send button)
      * clear all messages
      * export chat
      * import chat
      * message count display
      * empty state
    * handle UI state:
      * scroll to bottom when new messages arrives
      * show/hide edit mode
      * confirmation dialogs for destructive actions