import usersSchema from "../models/Users.model.js";
import jwt from "jsonwebtoken"

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

    const { username, password } = req.body;

    usersSchema.findOne({ username }).then((data) => {
        if (!data) {
            return res.status(400).json({ message: "Username does not exist" })
        }

        let token = jwt.sign({ _id: data._id }, "secretKey", { expiresIn: '1hr' });

        res.status(200).send({
            user: {
                companyname: data.companyname,
                fullname: data.fullname,
                username: data.username,
                phone: data.phone,
                gender: data.gender,
                position: data.position,
                tasks: data.tasks
            },
            accessToke: token
        })
    }).catch((err) => {
        return res.status(500).json({ message: "Failed" })
    })

    // try {
    //     const userSchemas = await usersSchema.findOne({ username });
    //     if (!userSchemas) {
    //         return res.status(400).json({ message: "Username does not exist" })
    //     }
    //     if (userSchemas.password !== password) {
    //         return res.status(400).json({ message: "passwpord does not exist" })

    //     }

    //     let token = jwt.sign({_id : userSchemas._id}, "secretkey" , {expiresIn : '1hr'})
    //     return res.status(200).json({
    //         message: "login successfull...",
    //         user: {
    //             companyname: userSchemas.companyname,
    //             fullname: userSchemas.fullname,
    //             username: userSchemas.username,
    //             phone: userSchemas.phone,
    //             gender: userSchemas.gender,
    //             position: userSchemas.position,
    //             tasks : userSchemas.tasks
    //         }, accessToke : token
    //     })
    // } catch (err) {
    //     return res.status(500).json({ message: err.message })
    // }
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await usersSchema.getFullProfile(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "USer not found..." });
        }
        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error..." })
    }
}


