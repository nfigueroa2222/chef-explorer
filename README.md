# chef-explorer

to run react app
npm start

to add react router
npm install react-router-dom@6

To use mySQL on Ubuntu 
sudo apt install mysql-server
sudo service mysql status (confirm that mySQL is running)
    - Modify /etc/mysql/mysql.conf.d/mysql.cnf and add under [my-sql] ->  bind-address = 127.0.0.1
    - sudo systemctl restart mysql.service (so changes take effect)
    - sudo service mysql status (Check to see if running again)
    - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; -> put this into mysql terminal to setup root user perms
    - Create database and tables in terminal and don't forget to specify the database using "use"

To use mysql with express backend setup
npm install mysql2 to use sql 
npm install express to setup a server
npm install cors -> this is needed as middleware to allow the react front end app to use the express back end

npm install body-parser