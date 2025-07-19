import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ApiError } from "./error.handler.middleware";


export const validateBody = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {

    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        const message = error.details.map((d) => d.message).join(", ")
        throw new ApiError(message, 400)
    }

    next()

}