import Joi from "joi";
import { ReminderType } from "../enums/reminder_type.enum";

export const reminderSchema = Joi.object({

    leadId: Joi.number()
        .required()
        .messages({
            "number.base": "Lead id must be a number",
            "number.empty": "Lead id cannot be empty",
            "any.required": "Lead id cannot be null"
        }),
    reminderType: Joi.string()
        .valid(...Object.values(ReminderType))
        .messages({
            "string.empty": "",
            "any.only": `Reminder type must be one of [${Object.values(ReminderType).join(", ")}]`,
        }),
    reminderAt: Joi.string()
        .isoDate()
        .required()
        .messages({
            "string.isoDate": "Reminder date must be in ISO 8601 format (e.g., 2025-07-10T14:30:00Z)",
            "string.empty": "Reminder date cannot be empty",
            "any.required": "Reminder date is required",
        }),
    note: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "Note must be at least 2 characters",
            "string.empty": "Note cannot be empty",
            "any.required": "Note cannot be null",
        }),


})