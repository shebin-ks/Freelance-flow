import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddPaymentResponse, PaymentResponse, PaymentState } from "./types";
import { getPayments, savePayment } from "./revenueThunk";
import { clearRedux } from "../clearReducer";

const initialState: PaymentState = {
    payments: [],

    paymentsStatus: 'idle',
    paymentsError: null,

    addPaymentStatus: 'idle',
    addPaymentError: null,

    totalRevenue: 0,
    thisMonth: 0,
    totalTransactions: 0
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(clearRedux, () => initialState)

            // ------ CREATE PAYMENTS -----------
            .addCase(
                savePayment.pending,
                (state) => {
                    state.addPaymentStatus = 'loading'
                    state.addPaymentError = null
                }
            )
            .addCase(
                savePayment.fulfilled,
                (state, action: PayloadAction<AddPaymentResponse>) => {

                    const newPayment = action.payload.payment;
                    state.payments.unshift(newPayment);

                    state.addPaymentStatus = 'succeeded';

                    state.totalRevenue += newPayment.amount;
                    state.totalTransactions++;

                    const createdDate = new Date(newPayment.createdAt);
                    const now = new Date();

                    if (
                        createdDate.getMonth() === now.getMonth() &&
                        createdDate.getFullYear() === now.getFullYear()
                    ) {
                        state.thisMonth += newPayment.amount;
                    }
                }
            )
            .addCase(
                savePayment.rejected,
                (state, action) => {
                    state.addPaymentStatus = 'failed'
                    state.addPaymentError = action.payload as string || 'Failed to add Payment'
                }
            )

            // ---- GET ALL PAYMENTS ---------
            .addCase(
                getPayments.pending,
                (state) => {
                    state.paymentsStatus = 'loading'
                    state.paymentsError = null
                }
            )
            .addCase(
                getPayments.fulfilled,
                (state, action: PayloadAction<PaymentResponse>) => {
                    state.payments = action.payload.payments
                    state.paymentsStatus = 'succeeded'

                    state.totalRevenue = state.payments.reduce((sum, p) => sum + p.amount, 0)
                    state.totalTransactions = state.payments.length

                    const now = new Date()
                    const thisMonth = now.getMonth()
                    const thisYear = now.getFullYear()


                    state.thisMonth = state.payments
                        .filter(p => {
                            const createdDate = new Date(p.createdAt)
                            return (
                                createdDate.getMonth() === thisMonth &&
                                createdDate.getFullYear() === thisYear
                            );
                        })
                        .reduce((sum, p) => sum + p.amount, 0)
                }
            )
            .addCase(
                getPayments.rejected,
                (state, action) => {
                    state.paymentsStatus = 'failed'
                    state.paymentsError = action.payload as string || 'Failed to load Payments'
                }
            )
    }

})

export default paymentSlice.reducer