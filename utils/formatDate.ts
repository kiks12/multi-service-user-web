

// this function formats a date datatype into a string - 'YYYY-MM-DD'
export const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const _date = date.getDate();


    return `${year}-${month}-${_date}`;
}



export const formatStringToDate = (date: string) => {
    const dateElements = date.split('-');

    const year = parseInt(dateElements[0], 10);
    const month = parseInt(dateElements[1], 10) - 1;
    const _date = parseInt(dateElements[2], 10);

    const thisDate = new Date();
    thisDate.setFullYear(year, month, _date);

    return thisDate; 
}
