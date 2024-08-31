import Book from "../model/book.model.js";

// export const search=async(req,res)=>{
//     const input=req.query.q
//     const book= await Book.findOne({name:input})
//     if(!book){
//         return res.status(404).send({message:"Book not found",input});
//     }
//     return res.status(400).send(book);

// }

// Controller function to handle search requests
export const searchUsers = async (req, res) => {
    try {
        const name = req.query.name; // Get the query parameter 'name'
        if (!name) {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }

        // Search for users with matching names (case-insensitive)
        const users = await Book.find({ title: new RegExp(name, 'i') });

        // Log the results found
        console.log('Users found:', users);

        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
};
