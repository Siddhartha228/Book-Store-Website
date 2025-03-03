import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";
import { User } from "./user/User.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  book_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Delivered', 'Not Delivered'),
    defaultValue: 'Pending',
  },
});

// Define associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

(async () => {
  try {
    await Order.sync();
    console.log("Order table created successfully");
  } catch (error) {
    console.error("Unable to create Order table:", error);
  }
})();

export default Order;