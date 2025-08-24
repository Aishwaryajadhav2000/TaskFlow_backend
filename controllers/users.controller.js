import usersSchema from "../models/Users.model.js"

export async function register(req, res) {

    try {
        const { companyname, fullname, username, phone, gender, position, password } = req.body

        const newUser = await usersSchema.create({ companyname, fullname, username, phone, gender, position, password });

        return res.status(200).json({ message: "user created successfully", user: newUser })

    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

export async function login(req, res) {

    const { username, password } = req.body

    try {


        const userSchemas = await usersSchema.findOne({ username });

        if (!userSchemas) {
            return res.status(400).json({ message: "Username does not exist" })
        }
        if (userSchemas.password !== password) {
            return res.status(400).json({ message: "passwpord does not exist" })

        }
        return res.status(200).json({
            message: "login successfull...",
            user: {
                companyname: userSchemas.companyname,
                fullname: userSchemas.fullname,
                username: userSchemas.username,
                phone: userSchemas.phone,
                gender: userSchemas.gender,
                position: userSchemas.position
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

