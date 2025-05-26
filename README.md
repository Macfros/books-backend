# Books Backend

This is the backend for the **Books** application. It is a Node.js project.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Macfros/books-backend.git
cd books-backend

### 2. Install node modules
npm install

### 3. IRun the project
npm start



###  API Endpoints
1. POST http://localhost:5000/api/auth/signup - ### Signup on the app 
    request body - 
    {
    "username": "JohnDoe",
    "password": "Password@123"
    }

2. POST http://localhost:5000/api/auth/login - ### Login into the app and ge token
    request Body-
    {
        "username": "JohnDoe",
        "password": "Password@123"
    }

3. GET http://localhost:5000/api/books?limit=5&page=1&author=harper - ##GetBooks with pagination and filters

4. POST http://localhost:5000/api/books - ###post new book
    request Body - 
        {
            "title":"48 Laws of Power",
            "author": "Robert Greene",
            "genre": "Self Help",
            "description": "Self Help book by Robert Greene"
        }

5. GET http://localhost:5000/api/books/id -- ##Get Book by ID


6. POST http://localhost:5000/api/books/:id/reviews  -- ### post review 
    {
  "rating": 4,
  "comment": "Loved the world-building!"
    }


7. PUT http://localhost:5000/api/books/reviews/:id -- ### update review 
    request body- 
    {
    "rating": 5,
    "comment": "Updated my opinion after re-reading. It's a masterpiece!"
    }


8. DELETE http://localhost:5000/api/books/reviews/:id --### delete review 





DATABASE SCHEMA:
The database used is MongoDB
We have three collections 
1. Books
    | Field           | Type   | Required |
    | --------------- | ------ | -------- |
    | `title`         | String | ✅ Yes    |
    | `author`        | String | ✅ Yes    |
    | `genre`         | String | ✅ Yes    |
    | `description`   | String | ❌ No     |
    | `averageRating` | Number | ❌ No     |
    | `createdAt`     | Date   | ✅ Auto   |

2. Reviews
    | Field       | Type            | Required |
    | ----------- | --------------- | -------- |
    | `bookId`    | ObjectId (Book) | ✅ Yes    |
    | `userId`    | ObjectId (User) | ✅ Yes    |
    | `rating`    | Number (1–5)    | ✅ Yes    |
    | `comment`   | String          | ❌ No     |
    | `createdAt` | Date            | ✅ Auto   |
    | `updatedAt` | Date            | ✅ Auto   |

3. Users 
    | Field      | Type   | Required | Unique |
    | ---------- | ------ | -------- | ------ |
    | `username` | String | ✅ Yes    | ✅ Yes  |
    | `password` | String | ✅ Yes    | ❌ No   |


