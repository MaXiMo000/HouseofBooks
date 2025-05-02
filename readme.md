⚙️ Setup and Installation
Clone the repository:

bash

git clone https://github.com/MaXiMo000/HouseofBooks.git
cd HouseofBooks
Install dependencies:

bash

# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
Configure environment variables:

Create a .env file in the backend directory and add the following:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string


bash

# Start backend server
cd backend
npm start

# Start frontend development server
env
VITE_BACKEND_URL = your deployed backend url or localhost url
VITE_CONTACT_KEY = from emailjs
VITE_CONTACT_SERVICE = from emailjs
VITE_CONTACT_TEMPLATE = from emailjs
cd ../frontend
npm start
The application will be accessible

# Save json data for books in mongo like this
eg: (
    {   id: 3,
        name: "J.K. Rowling",
        title: "Harry Potter and the Sorcerer's Stone",
        price: 10.99,
        category: "Fantasy",
        image: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg"
    }
)

📌 Future Enhancements
Book Reading Feature: Implement an in-browser book reader to allow users to read books online.

Enhanced Search: Integrate advanced search and filtering options.

Payment Integration: Add payment gateway for purchasing books.

User Reviews: Enable users to leave reviews and ratings for books.

🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

📄 License
This project is open-source and available under the MIT License.
