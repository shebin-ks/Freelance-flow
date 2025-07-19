import Joi from "joi";
import { ReminderType } from "../enums/reminder_type.enum";

export const communicationSchema = Joi.object({

    leadId: Joi.number()
        .required()
        .messages({
            "number.base": "Lead id must be a number",
            "number.empty": "Lead id cannot be empty",
            "any.required": "Lead id cannot be null"
        }),
    communicationType: Joi.string()
        .valid(...Object.values(ReminderType))
        .messages({
            "string.empty": "",
            "any.only": `Communication type must be one of [${Object.values(ReminderType).join(", ")}]`,
        }),
    note: Joi.string()
        .min(2)
        .messages({
            "string.min": "Note must be at least 2 characters",
            "string.empty": "Note cannot be empty",
        }),
    outcome: Joi.string()
        .min(2)
        .messages({
            "string.min": "Outcome must be at least 2 characters",
            "string.empty": "Outcome cannot be empty",
        }),
    followUpNeeded: Joi.string()
        .min(2)
        .messages({
            "string.min": "Outcome must be at least 2 characters",
            "string.empty": "Outcome cannot be empty",
        }),


})