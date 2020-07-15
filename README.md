# RestAPI Tasks 

This API allow you create a new account and login with your credentials. After that you can test the Task CRUD, you can list, create, update and delete a task. Also, if you are an administrator you have access to User CRUD. 

This API it was develop with typescript, node and mongodb. And implement express to hanlde routes, jsonwebtoken and passport library to validate all request of the users and authentication. 

In the root folder you will find a insomnia.collection.json to add all routes to the API but you can use any rest client that you want.  

# Proyect Initialization

## Installation

Use the package manager "NPM" to install all dependencies.  

```bash
npm i
```

## Create .config file

```python
You must create a .config file on a config folder, in this folder you'll find a .config.example.
```

## Run Aplication
There are two commands to run the API. 

```python
npm start or npm run dev 
```

## Technologies: 
```python
MongoDb to save de data. 
Express framework to handle all routes. 
Async/Await for handler async functions. 
Winston for log system. 
Passport-jwt and JsonWebToken for authentication system. 
```

## API ENDPOINTS

## LOGIN 

This enpoints allow you create and validate your credentials to test the API. 

http://localhost:3000/signup/ 

```python
POST SIGNUP: This method create a new user with email and password. 
```

http://localhost:3000/login/

```python
POST SIGNIN: this method check your credentials (email and password) and create a token that it will use to validate all user requests. 
```

## TASK 

'http://localhost:3000/tasks/ 

```python
GET LIST: list all tasks storage on the db. 
GET_BY_ID: get a tasks for ID. 
POST CREATE: this method allow you create a new task. 
PUT UPDATE: If the taks exist update all fields. 
DELETE REMOVE: Remove a taks for id.  
```

## USER 

This endpoints only are available if you are an administrator. 

'http://localhost:3000/users/ 

```python
GET LIST: list all users. 
GET_BY_ID: get a user for ID. 
POST CREATE: this method allow you create a new User, if role inst specified for default it will USER. 
PUT UPDATE: Allow you to update an User.  
DELETE REMOVE: Remove an User.  
```
