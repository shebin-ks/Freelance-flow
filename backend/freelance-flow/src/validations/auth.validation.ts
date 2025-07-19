import Joi, { object } from "joi";
import { UserRole } from "../enums/user_role.enum";

export const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "Name must be atleast 2 characters",
            "string.empty": "Name cannot be empty",
            "any.required": "Name cannot be null",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be valid",
            "any.required": "Email cannot be null",
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password cannot be null",
        }),
    companyName: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Company name cannot be empty",
            "string.min": "Company name must be at least 2 characters",
            "any.required": "Company name cannot be null",
        })
});



export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be valid",
            "any.required": "Email cannot be null",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password cannot be null",
        }),
})


export const inviteSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be valid",
            "any.required": "Email cannot be null",
        }),
    name: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "Name must be at least 2 characters",
            "string.empty": "Name cannot be empty",
            "any.required": "Name cannot be null",
        }),
    role: Joi.string()
        .valid(...Object.values(UserRole))
        .required()
        .messages({
            "any.only": `Role must be one of [${Object.values(UserRole).join(", ")}]`,
            "any.required": "Role cannot be null",
            "string.empty": ""
        }),


})


export const passwordResetSchema = Joi.object({
    token: Joi.string()
        .required()
        .messages({
            "string.empty": "Token cannot be empty",
            "any.required": "Token cannot be null",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password cannot be null",
        }),
})

