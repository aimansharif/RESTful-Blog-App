# RESTful-Blog-App

A Full Stack NodeJS blog application created using RESTful and ExpressJS

Frontend: SemanticUI, HTML, CSS, Bootstrap, Embedded JavaSript
Backend: MongoDB, NodeJS, ExpressJS (Server-side routing), Heroku

Steps to run the application

1) Clone the git repo locally

```
git clone .....
```

2) Download and install NodeJS on your computer: https://nodejs.org/en/

3) After installing NodeJS, run these following commands from the command-line or git bash in the cloned repository

```
npm install express --save
npm install body-parser --save
npm install mongoose --save
npm install express-sanitizer --save
```

It is also possible to install all the required libraries on the same line by using <space between names> and doing --save

4) Download and install MongoDB, start the mongoDB server and run the application carry out these steps: 

- connect to the local MongoDB by doing an export from the command line
<name-of-db> in this case: restful-blog-app (any custom name is okay)

```
export DATABASEURL=mongodb://localhost:27017/<name-of-db>
```

-Now you can run the application by doing: 

```node app.js```

It is also possible to use Mongo Atlas or cloud cluster if you wish to do so

5) Install nodemon so that each time it is not required to run node app.js when you change something in the code, automatically refreshes the server each time you save the file you are working on by running this command: 

```npm install nodemon --save```

Experiment playing around with the application! 
