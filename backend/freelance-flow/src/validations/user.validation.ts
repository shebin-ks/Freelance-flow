import Joi from "joi";
import { UserStatus } from "../enums/user_status.enum";

export const userStatusSchema = Joi.object({
    userId: Joi.number()
        .required()
        .messages({
            "number.base": "User id must be a valid number",
            "number.empty": "User id cannot be empty",
            "any.required": "User id cannot be null"
        }),
    status: Joi.string()
        .valid(...Object.values(UserStatus))
        .required()
        .messages({
            "any.required": "Status cannot be null",
            "string.empty": "",
            "any.only": `Status must be one of [${Object.values(UserStatus).join(", ")}]`,
        })
})