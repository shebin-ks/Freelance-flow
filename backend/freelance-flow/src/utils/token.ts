import jwt from "jsonwebtoken";
import { ApiError } from "../middlewares/error.handler.middleware";



const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const INVITE_SECRET = process.env.INVITE_SECRET
const PASSWORD_RESET_SECRET = process.env.PASSWORD_RESET_SECRET



// ----- Access Token -----
export const generateAccessToken = (payload: Object) => {

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })

}


export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (err) {
        throw new ApiError("Invalid or expired access token", 400);
    }
}

// ----- Invite Token -----

export const generateInviteToken = (payload: Object) => {

    return jwt.sign(payload, INVITE_SECRET, { expiresIn: '7d' })

}
export const verifyInviteToken = (token: string) => {

    try {
        return jwt.verify(token, process.env.INVITE_SECRET);
    } catch (err) {
        throw new ApiError("Invalid or expired invite token", 400);
    }

}


// ----- Refresh Token -----

export const generateRefreshToken = (payload: Object) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
}


export const verifyRefreshToken = (token: string) => {
     try {
    return jwt.verify(token, REFRESH_SECRET)
    } catch (err) {
        throw new ApiError("Invalid or expired refresh token", 400);
    }
}


// ----- Password Reset Token -----


export const generatePasswordResetToken = (payload: Object) => {
    return jwt.sign(payload, PASSWORD_RESET_SECRET, { expiresIn: '15min' })
}


export const verifyPasswordResetToken = (token: string) => {
     try {
    return jwt.verify(token, PASSWORD_RESET_SECRET)
    } catch (err) {
        throw new ApiError("Invalid or expired password reset token", 400);
    }
}