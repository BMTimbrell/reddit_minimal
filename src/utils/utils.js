//Get difference from today's date
export const getDateDifference = date => {
    let seconds = (Date.now() / 1000) - date;
    let years = Math.floor(seconds / 31536000);
    let months = Math.floor(seconds / 2628000);
    let weeks = Math.floor(seconds / 604800);
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60);

    if (makeTimeCreatedString(years, 'year')) return makeTimeCreatedString(years, 'year');
    if (makeTimeCreatedString(months, 'month')) return makeTimeCreatedString(months, 'month');
    if (makeTimeCreatedString(weeks, 'week')) return makeTimeCreatedString(weeks, 'week');
    if (makeTimeCreatedString(days, 'day')) return makeTimeCreatedString(days, 'day');
    if (makeTimeCreatedString(hours, 'hour')) return makeTimeCreatedString(hours, 'hour');
    if (makeTimeCreatedString(minutes, 'minute')) return makeTimeCreatedString(minutes, 'minute');
    return `${seconds} seconds ago.`;
};

const makeTimeCreatedString = (number, unit) => {
    if (number > 1) return `${number} ${unit}s ago`;
    else if (number === 1) return `${number} ${unit} ago.`;
    else return '';
};

export const roundThousand = number => {
    let fraction = number / 1000;
    if (fraction < 1) return number;
    if (fraction % 1 === 0) return `${fraction}k`;
    fraction = Math.floor(fraction) + Math.round(fraction % 1 * 10) / 10;
    return `${fraction}k`;
}