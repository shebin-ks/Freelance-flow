import Joi from "joi";

export const paymentSchema = Joi.object({

    leadId: Joi.number()
        .required()
        .messages({
            "number.base": "Lead id must be a number",
            "number.empty": "Lead id cannot be empty",
            "any.required": "Lead id cannot be null"
        }),
    amount: Joi.number()
        .greater(0)
        .required()
        .messages({
            "number.greater": "Amount must be greater than 0",
            "number.base": "Amount must be a number",
            "number.empty": "Amount cannot be empty",
            "any.required": "Amount cannot be null"
        }),

    note: Joi.string()
        .min(2)
        .messages({
            "string.min": "Note must be at least 2 characters",
            "string.empty": "Note cannot be empty",
            "any.required": "Note cannot be null",
        }),
    createdAt: Joi.string()
        .isoDate()
        .required()
        .messages({
            "string.isoDate": "Created date must be in ISO 8601 format (e.g., 2025-07-10T14:30:00Z)",
            "string.empty": "Created date cannot be empty",
            "any.required": "Created date is required",
        }),

})