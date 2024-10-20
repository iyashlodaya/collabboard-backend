import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string;
  public otp!: string;
  public token?: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Add method to validate password
  public validatePassword = async (inputPassword: string): Promise<boolean> => {
    return bcrypt.compare(inputPassword, this.password);
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING(6), // Could be an integer or string, depending on your use case
      allowNull: true,
      comment: "One-Time Password for verification",
    },
    token: {
      type: DataTypes.STRING, // For JWT or other authentication tokens
      allowNull: true,
    },
  },
  {
    sequelize, // passing the sequelize instance
    tableName: "users",
    timestamps: true, // Enable timestamps
    underscored: true, // Use underscored naming convention
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
