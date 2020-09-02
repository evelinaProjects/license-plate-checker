const isPublic = plateNumber => plateNumber.endsWith('26') || plateNumber.endsWith('25');

const isOther = arr => {
    const plateNumber = arr.join("");
    const OnlyDigits = !arr.some(char => char.charCodeAt(0) < '0'.charCodeAt(0) || char.charCodeAt(0) > '9'.charCodeAt(0));
    if (OnlyDigits && plateNumber.length === 7) {
        return plateNumber.endsWith('85') || plateNumber.endsWith('86') || plateNumber.endsWith('86') || plateNumber.endsWith('87')
            || plateNumber.endsWith('88') || plateNumber.endsWith('89') || plateNumber.endsWith('00')
    } 
    else 
        return false;
}

const isGas = arr => {
    const OnlyDigits = !arr.some(char => char.charCodeAt(0) < '0'.charCodeAt(0) || char.charCodeAt(0) > '9'.charCodeAt(0));
    if (OnlyDigits && (arr.length === 7 || arr.length === 8)) {
        const sum = arr.reduce((acc, curr) => acc + parseInt(curr), 0)
        return sum % 7 === 0 ? true : false;
    } 
    else 
        return false;
}

const isMilitaryOrLaw = arr => {
    return arr.some(char => {
        return char.toUpperCase().charCodeAt(0) >= 'A'.charCodeAt(0) && char.toUpperCase().charCodeAt(0) <= 'Z'.charCodeAt(0)
    })
}

const isEmptyText = plateNumber => {
     return plateNumber.length < 1
}

const isNotValidText = arr =>  arr.some(char => char.charCodeAt(0) < 48 || ( char.charCodeAt(0) > 57 && char.toUpperCase() < 'A') || char.toUpperCase() > 'Z')

const check = plateNumber => {
    return isEmptyText(plateNumber) ? {category:'Empty text', decision: 'prohibited' } :
    isNotValidText(plateNumber.split('')) ? {category:'Not valid text', decision: 'prohibited' } :
    isPublic(plateNumber) ? {category:'Public transportation vehicles', decision: 'prohibited' } :
    isMilitaryOrLaw(plateNumber.split('')) ? {category:'Military or law enforcement vehicles', decision: 'prohibited' } :
    isOther(plateNumber.split('')) ? {category:'Other vehicles', decision: 'prohibited' } :
    isGas(plateNumber.split('')) ? {category:'Gas operated vehicles', decision: 'prohibited' } :
    {category:'Regular vehicles', decision: 'allowed' }
}

module.exports = {
    isOther,
    isPublic,
    isMilitaryOrLaw,
    isGas,
    isEmptyText,
    isNotValidText,
    check
};
