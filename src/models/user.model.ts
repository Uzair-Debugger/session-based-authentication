import sequelize from "../config/dbConfig.js";
import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

interface UserAttributes{
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id">{}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id!:number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },

    {
        sequelize,
        modelName: "User",
        tableName: "users"
    }
);

export default User;