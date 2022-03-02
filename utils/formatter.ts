

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP'
})



export const formatStartingAndLastPrice = (service: any) => {
    const { priceInitial, priceFinal } = service;

    const startingPrice = formatter.format(parseInt(priceInitial, 10));
    const lastPrice = formatter.format(parseInt(priceFinal, 10));


    return {
        startingPrice,
        lastPrice
    }
}