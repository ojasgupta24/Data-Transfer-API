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
