import Book from "../model/book.model.js";

export const search=async(req,res)=>{
    const input=req.query.q
    const book= await Book.findOne({name:input})
    if(!book){
        return res.status(404).send({message:"Book not found",input});
    }
    return res.status(400).send(book);
    
}