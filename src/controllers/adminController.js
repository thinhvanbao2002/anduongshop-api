import Joi from "joi";
import jwt from "jsonwebtoken";
import adminService from "../service/adminService.js";

const Schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(3).label('Password'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).label('Confirm Password'),
    email: Joi.string().email().label('Email'),
    phone: Joi.string().min(10).label('Phone Number'),
});

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error(`Input is require`);
        }
        const validationInput = Schema.validate({ username, password });
        if (validationInput.error) {
            const errorMessages = validationInput.error.details.map((error) => error.message);
            throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
        }

        const response = await adminService.login({ username, password });

        const token = jwt.sign({ data: response }, process.env.JWT_SECRET, { expiresIn: '30 days' })

        return res.status(200).json(
            {
                status: "OK",
                data: response,
                token: token
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}

const getPersonnal = async (req, res) => {
    try {
        const perPage = 3;
        let page = req.query.page || 1;
        page = Math.max(page, 1);
        const response = await adminService.getPersonnal({ page, perPage });
        return res.status(200).json(
            {
                status: "OK",
                data: response
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}

const searchPersonnal = async (req, res) => {
    try {
        const perPage = 3;
        let page = req.query.page || 1;
        page = Math.max(page, 1);
        let keyword = req.query.keyword || "";
        const response = await adminService.searchPersonnal({ perPage, page, keyword });
        return res.status(200).json(
            {
                status: "OK",
                data: response
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}

const createPersonnal = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, fullName, phone } = req.body;
        if (!username || !email || !password || !confirmPassword || !fullName || !phone) {
            throw new Error("The input is required!");
        }

        const validationInput = Schema.validate({ username, email, password, confirmPassword, phone });
        if (validationInput.error) {
            const errorMessages = validationInput.error.details.map((error) => error.message);
            throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
        }

        const response = await adminService.createPersonnal({ username, email, password, confirmPassword, fullName, phone })

        return res.status(200).json(
            {
                status: "OK",
                data: response
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}


const updatePersonnal = async (req, res) => {
    try {
        const { fullName, email, phone } = req.body;
        const idPersonnal = req.params.id;

        if (!idPersonnal || !fullName || !email || !phone) {
            throw new Error("The input is required!");
        }

        const validationInput = Schema.validate({ email, phone });
        if (validationInput.error) {
            const errorMessages = validationInput.error.details.map((error) => error.message);
            throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
        }

        const response = await adminService.updatePersonnal({ idPersonnal, fullName, email, phone });

        return res.status(200).json(
            {
                status: "OK",
                data: response
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}

const deletePersonnal = async (req, res) => {
    try {
        const idPersonnal = req.params.id;
        if (!idPersonnal) {
            throw new Error('User ID is required');
        }

        const response = await adminService.deletePersonnal({idPersonnal});

        return res.status(200).json(
            {
                status: "OK",
                data: response
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                status: "ERR",
                error: error.message
            }
        )
    }
}


export default {
    login,
    getPersonnal,
    searchPersonnal,
    createPersonnal,
    updatePersonnal,
    deletePersonnal

}