import usersSchema from "../models/Users.model.js";
import jwt from "jsonwebtoken"
import Company from "../models/Company.model.js";
import bcrypt from "bcrypt"

export async function register(req, res) {

    try {
        const { companyname, fullname, username, phone, gender, position, password } = req.body;

        let findUser = await usersSchema.findOne({username});
        if (findUser) {
            return res.status(500).json({ message: "User already exist..." })
        } else {

            const newUser = await usersSchema.create({ companyname, fullname, username, phone, gender, position, password: bcrypt.hashSync(password, 10) });

            let findcompanyname = await Company.findOne({ companyname });

            if (findcompanyname) {
                findcompanyname.users.push(newUser._id);
                await findcompanyname.save();
            } else {
                findcompanyname = await Company.create({
                    companyname,
                    users: [newUser._id]
                });
            }

            return res.status(200).json({ message: "user created successfully", user: newUser });

        }

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

        let validatePassword = bcrypt.compareSync(password, data.password)

        //Uncomment this for password validation
        if (!validatePassword) {
            return res.status(400).json({ message: "Invalid credentials" })
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
        return res.status(500).json({ message: "Server error..." })
    }
}

export async function updatePassword(req, res) {

    const { password } = req.body
    const userId = req.user._id
    const updatePwd = bcrypt.hashSync(password, 10)

    try {
        const updatePass = await usersSchema.findByIdAndUpdate(userId, { password: updatePwd }, { new: true });

        if (!updatePass) {
            return res.status(500).json({ message: "User not found..." })
        }

        return res.status(200).json({
            message: "Password updated successfully...",
            updatePass: updatePass
        });

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


export async function deleteAccount(req, res) {

    try {
        const { companyname } = req.body
        const userId = req.user._id;
        const data = await usersSchema.findByIdAndDelete(userId)
        if (!data) {
            return res.status(500).json({ message: "User not found" })
        }

        const findUserInOrg = await Company.findOne({ companyname });
        if (findUserInOrg) {
            findUserInOrg.users.pull(userId);
            await findUserInOrg.save()
        }

        return res.status(200).json({ message: "User deleted successfully" })


    } catch (err) {
        return res.status(500).json({ message: err.message })
    }


}
