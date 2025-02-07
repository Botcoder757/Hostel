import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";

const prisma = new PrismaClient();

export async function create_user(req, res) {
    const { email, phone, name, password } = req.body;

    // Validate input fields
    if (!email || !phone || !name || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email" });
    }

    // Optionally, specify a locale if needed
    if (!validator.isMobilePhone(phone, 'any')) {
        return res.status(400).json({ error: "Invalid phone number" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create the user in the database
        const user = await prisma.users.create({
            data: {
                email,
                phone,
                name,
                password: hashedPassword
            }
        });

        console.log(user);

        // Return a single object in json response
        return res.status(201).json({ 
            message: "User created successfully", 
            user 
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
