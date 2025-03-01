
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Title cannot be empty"
      }
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Author cannot be empty"
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: "Invalid image URL format"
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Description cannot be empty"
      }
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Price must be a valid number"
      },
      min: {
        args: [0],
        msg: "Price must be a positive value"
      }
    }
  }
}, {
  tableName: 'books',
  timestamps: true
});

export default Book;