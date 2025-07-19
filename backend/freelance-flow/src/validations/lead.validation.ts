import Joi from "joi";
import { LeadStatus } from "../enums/lead_status.enum";

export const leadSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Name cannot be empty",
            "any.required": "Name cannot be null",
            "string.min": "Name must be atleast 2 characteres"
        }),
    email: Joi.string()
        .email()
        .messages({
            "string.email": "Email must be valid"
        }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/) 
        .messages({
            "string.pattern.base": "Phone must be a valid 10-digit number",
            "string.empty": "Phone cannot be empty",
        }),
    leadCompanyName: Joi.string()
        .messages({
            "string.empty": "Lead company name cannot be empty"
        }),
    purpose: Joi.string()
        .required()
        .messages({
            "string.empty": "Purpose cannot be empty",
            "any.required": "Purpose cannot be null",
        })

})

export const leadStatusSchema = Joi.object({
    leadId: Joi.number()
        .required()
        .messages({
            "number.base": "Lead id must be a valid number",
            "number.empty": "Lead id cannot be empty",
            "any.required": "Lead id cannot be null"
        }),
    status: Joi.string()
        .valid(...Object.values(LeadStatus))
        .required()
        .messages({
            "any.required": "Status cannot be null",
            "string.empty": "",
            "any.only": `Status must be one of [${Object.values(LeadStatus).join(", ")}]`,
        })
})
