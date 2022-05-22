export type UserEntity = {
    stripeId: string
    payments: [
        {
            name: string
            cardNumber: string
            expirationdate: string
            cvv: string
            country: string
        }
    ]
}
