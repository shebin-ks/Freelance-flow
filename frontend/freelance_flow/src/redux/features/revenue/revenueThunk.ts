import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPayment, fetchPayments } from "../../../api/payments";
import type { AddPaymentResponse, PaymentPayload, PaymentResponse } from "./types";


export const getPayments = createAsyncThunk<
    PaymentResponse,
    void,
    { rejectValue: string }
>(
    "payments/getPayments",
    async (_, thunkApi) => {
        try {

            const response = await fetchPayments()

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const savePayment = createAsyncThunk<
    AddPaymentResponse,
    PaymentPayload,
    { rejectValue: string }
>(
    "payments/savePayment",
    async (payload, thunkApi) => {
        try {

            const response = await createPayment(payload)
            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)