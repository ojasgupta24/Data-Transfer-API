# Data-Transfer API
An API that takes an excel file as input, parses it and stores the data in the database.
## Features

- A POST route “/api/pet” to add pets from an excel file
- A GET route “/api/pet” to get all the pets in the database
- A GET route “/api/pet/<petId>” to get a specific pet (petId will be a dynamic value eg. /api/pet/abc123)
- A PATCH route “/api/pet/<petId>” to update the details of a specific pet
- A DELETE route “/api/pet/<petId>” to delete a specific pet  
  
## Columns in the excel file
1. Name
2. Type
3. Breed
4. Age

## Tech stack to be used
Node.js, Express and MongoDB using mongoose
  
 ## Setup Guide
- Clone the project  
- As this project is based on Node.js and mongoDB you have to download Node.js, Npm and MongoDB as prerequisites  
- Go the project through the terminal and install all dependencies by   
  - npm install
  - npm install -g nodemon  
 - Inside the project folder place the pets.xlsx file i.e copy and paste your excel file to this folder with it's name as pets.xlsx
 - run the server using nodemon app.js
  ## Parameters on Postman
  - Select post method on Postman to post excel data to our database
    - Write localhost:3000/api/pet in the url section         
  - Select get method on Postman to get data from our database
    - Write localhost:3000/api/pet in the url section to get all of the data in our database
    - Write localhost:3000/api/pet/:petId in the url section 
    -In path variables write key as petId and value as the id of the pet to find it in our            database      
  - Select patch method on Postman to update data with given id in our database
    - Write localhost:3000/api/pet/:petId in the url section  
    - In path variables write key as petId and value as the id of the pet   
    - In query parameters pass in the name, type, breed and age as keys and write their               respective values in order to update them in our database
  - Select delete method on Postman to delete data with given id in our database
    - Write localhost:3000/api/pet/:petId in the url section  
    - In path variables write key as petId and value as the id of the pet   
    
