
import Book from '../models/bookModel.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, imageUrl, description, price } = req.body;

    // Validate required fields
    if (!title || !author || !imageUrl || !description || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate price format
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    const newBook = await Book.create({
      title: title.trim(),
      author: author.trim(),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      price: parseFloat(price)
    });

    res.status(201).json(newBook);

  } catch (error) {
    console.error('Error creating book:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }

    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    if (!books.length) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books);

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
};