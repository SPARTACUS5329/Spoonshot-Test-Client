# Spoonshot Test Client Side

Deployed version (bugs): [https://spartacus5329.github.io/Spoonshot-Test-Client/](https://)

**Steps to run on local**

-   `git clone https://github.com/SPARTACUS5329/Spoonshot-Test-Client.git`
-   `cd into the cloned directory`
-   `npm install`
-   `npm start`
-   `open the provided link in the terminal`

**Make sure the server is running (refer** [https://github.com/spartacus5329/Spoonshot-Test-Server](https://)**)**

## Functionality

1. Search for books by `title` and/or `author` (Google Books API is not consistent with outputs)
    1. Testing done with `title="Harry Potter"` and `author="J K Rowling"` (for working case)
    2. Example of error case is `title="Zero to One"` and `author="Peter Thiel"`
2. `Select` the books and add `stock` in the input field
3. `Golden outlined` books indicate presence in the inventory
4. Click `Add` to add the selections to the inventory
5. Switch to `inventory` using the Switch to see current inventory (the user might have to refresh the page)
6. Similar updations can be done on the inventory page where the updates would indicate the current state of the inventory
