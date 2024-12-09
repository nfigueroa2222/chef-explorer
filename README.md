# chef-explorer

## Structure of chef-explorer

### Root
    server.js
        - Uses express to host the backend and connect routes to the MySQL database
        - Uses cors as middleware to allow the frontend to use backend routes
        - Uses body-parser to parse the incoming json data
        - /register route
            - Uses the user information to query the database to see if the user is present
            - Inserts the user into the database
        - /login route
            - Uses the user information to query the database and checks if the information matches 
        - /logout route 
            - Destroys the session memory related to the user
    
    /public 
        - Contains the images used throughout the app. This is not in an images folder because the gh-pages script does not work correctly if it is in a folder.
        index.html
            - Where the react elements will be rendered to

    /src
        App.js
            - Establishes the routes for the application 
            - Dynamically creates recipe page routes
        App.css 
            - Sets general styles across all app components.
        index.js
            - Establishes the router for the App
            - Entry point for the application
        /models
            recipes.json
                - Contains the recipe information
        /pages 
            AccountPage.js
                - Defines the page layout for the account page
            Home.js
                - Defines the page layout for the home page
            RecipePage.js
                - Accepts props related to a recipe to dynamically create a the recipe page layout
                - Type checks the props
            Recipes.js
                - Defines the page layout for the all recipes page
        /scripts
            AccountSetup.js
                - Validates form input and provides feedback to the user
                - Utilizes the localStorage cache in the browser for user login status
                - Handles the user register and login by sending a post request to the backend which queries the database and returns a response
            Footer.js
                - Places the footer section at the bottom of the page
            Header.js
                - Offers a mobile and computer header style by compressing the nav links into a hamburger symbol for smaller screens
                - Updates the user name in the header based on the localStorage
            PreviewItem.js
                - Defines a PreviewItem component that accepts props related to a recipe to display a preview card
                - Links the PreviewItem component to the associated RecipePage route
                - Type checks the props
            RecipeGallery.js
                - Sorts and pulls the 8 most recent recipes from recipes.json file
                - Creates a carousel to display the extracted recipes
            RecipesList.js
                - Dynamically creates PreviewItem components
        /css
            AccountSetup.css
                - Styles the account page to offer the user a styled form to enter account details
                - Provides responsive interactions
                - Offers a pop up for status messages
                - Works with smaller screens
            Footer.css
                - Styles the footer section 
            Header.css
                - Provides responsive interactions with the nav links
                - Works with smaller screens
                - Styles the header section
            PreviewItem.css
                - Provides a responsive and interactive card for the PreviewItem component
                - Formats the image so there is no distortion 
            RecipeGallery.css
                - Uses a carousel to display the most recent recipes
                - Works with smaller screens by offering scroll snapping 
                - Styles the carousel for multiple browser types 
                - Responsive and interactive styling for the carousel and its contents
            RecipeList.css
                - Uses a grid layout to display the PreviewItem components
                - Works with smaller screens
            RecipePage.css
                - Styles the recipe page so that the text and image are organized on the page
                - Works with smaller screens by switching the display to a grid 
                - Formats the image without distortion


## Running chef-explorer
To run React Based Front End 
- npm start

To run Express Backend With MySQL
- Ensure that the SQL server is running
- node server.js

## Setup Information
### To add react router
- npm install react-router-dom@6

### To use MySQL on Ubuntu Local Server
sudo apt install mysql-server
sudo service mysql status (confirm that mySQL is running)
- Modify /etc/mysql/mysql.conf.d/mysql.cnf and add under [my-sql] ->  bind-address = 127.0.0.1
- sudo systemctl restart mysql.service (so changes take effect)
- sudo service mysql status (Check to see if running again)
- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; -> put this into mysql terminal to setup root user perms
- Create database and tables in terminal and don't forget to specify the database using "use"

### To use MySQL with Express backend setup
- npm install mysql2 to use sql 
- npm install express to setup a server
- npm install cors -> this is needed as middleware to allow the react front end app to use the express back end

### To parse the JSON data on request 
- npm install body-parser

### To deploy to gh-pages
- npm install gh-pages --save-dev
- To set up deployment branch -> Launch the script, npm run predeploy 
- npm run deploy -> Launches the script, to push to the gh-pages deployment branch
- Use HashRouter instead of BrowserRouter since BrowserRouter is not supported 
- The deployment script does not load images in the images folder, needs to be in same directory as index.html
