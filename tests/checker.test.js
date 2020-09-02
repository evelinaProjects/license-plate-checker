const {
    isPublic,
    isMilitaryOrLaw,
    isOther,
    isGas,
    isEmptyText,
    isNotValidText,
    check
} = require('../util/checkText');

test('Public transportation vehicles', () => {
    expect(isPublic('1231211')).toBeFalsy();
    expect(isPublic('1231225')).toBeTruthy();
    expect(isPublic('1231226')).toBeTruthy();
})

test('Other', () => {
    expect(isOther('1234500'.split(''))).toBeTruthy();
    expect(isOther('1234585'.split(''))).toBeTruthy();
    expect(isOther('1234586'.split(''))).toBeTruthy();
    expect(isOther('1234587'.split(''))).toBeTruthy();
    expect(isOther('1234589'.split(''))).toBeTruthy();
    
    expect(isOther('12345600'.split(''))).toBeFalsy();
    expect(isOther('12345685'.split(''))).toBeFalsy();
    expect(isOther('12345686'.split(''))).toBeFalsy();
    expect(isOther('12345687'.split(''))).toBeFalsy();
    expect(isOther('12345689'.split(''))).toBeFalsy();

    expect(isOther('123400'.split(''))).toBeFalsy();
    expect(isOther('123485'.split(''))).toBeFalsy();
    expect(isOther('123486'.split(''))).toBeFalsy();
    expect(isOther('123487'.split(''))).toBeFalsy();
    expect(isOther('123489'.split(''))).toBeFalsy();
    

    expect(isOther('12d3400'.split(''))).toBeFalsy();
    expect(isOther('12d3485'.split(''))).toBeFalsy();
    expect(isOther('12d3486'.split(''))).toBeFalsy();
    expect(isOther('12d3487'.split(''))).toBeFalsy();
    expect(isOther('123d489'.split(''))).toBeFalsy();

})
test('operated by gas', () => {
    expect(isGas('1111111'.split(''))).toBeTruthy();
    expect(isGas('11110111'.split(''))).toBeTruthy();

    expect(isGas('7'.split(''))).toBeFalsy();

    expect(isGas('1111T111'.split(''))).toBeFalsy();

    expect(isGas('1111t111'.split(''))).toBeFalsy();

})
test('Military or law enforcement vehicles', () => {

    expect(isMilitaryOrLaw('z'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('Z'.split(''))).toBeTruthy();


    expect(isMilitaryOrLaw('1b'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('1b'.split(''))).toBeTruthy();
    
    expect(isMilitaryOrLaw('123a12'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('a12312'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('12312a'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('123A12'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('A12312'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('12312A'.split(''))).toBeTruthy();

    expect(isMilitaryOrLaw('1t21y2'.split(''))).toBeTruthy();
    expect(isMilitaryOrLaw('1T21Y2'.split(''))).toBeTruthy();

    expect(isMilitaryOrLaw('123122'.split(''))).toBeFalsy();
    expect(isMilitaryOrLaw('1'.split(''))).toBeFalsy();

})

test('Empty text', () => {
    expect(isEmptyText('')).toBeTruthy();
    expect(isEmptyText('1')).toBeFalsy();
    expect(isEmptyText('b')).toBeFalsy();
    expect(isEmptyText('12324v')).toBeFalsy();
    
})

test('isNotValidText', () => {
    expect(isNotValidText('123:122'.split(''))).toBeTruthy();
    expect(isNotValidText('123/122'.split(''))).toBeTruthy();
    expect(isNotValidText('12*3122'.split(''))).toBeTruthy();
    expect(isNotValidText('1231[22'.split(''))).toBeTruthy();
    expect(isNotValidText('1231]22'.split(''))).toBeTruthy();

    expect(isNotValidText('123bA22'.split(''))).toBeFalsy();

})

test('check', () => {
    expect(check('')).toEqual({category:'Empty text', decision: 'prohibited' });
    expect(check('123:569')).toEqual({category:'Not valid text', decision: 'prohibited' });
    expect(check('/123569')).toEqual({category:'Not valid text', decision: 'prohibited' });
    expect(check('/123569')).toEqual({category:'Not valid text', decision: 'prohibited' });
    expect(check('1234525')).toEqual({category:'Public transportation vehicles', decision: 'prohibited' });
    expect(check('1234526')).toEqual({category:'Public transportation vehicles', decision: 'prohibited' });
    expect(check('123425')).toEqual({category:'Public transportation vehicles', decision: 'prohibited' });
    expect(check('123426')).toEqual({category:'Public transportation vehicles', decision: 'prohibited' });
    expect(check('123456M')).toEqual({category:'Military or law enforcement vehicles', decision: 'prohibited' });
    expect(check('d23456')).toEqual({category:'Military or law enforcement vehicles', decision: 'prohibited' });
    expect(check('123h456')).toEqual({category:'Military or law enforcement vehicles', decision: 'prohibited' });
    expect(check('1102111')).toEqual({category:'Gas operated vehicles', decision: 'prohibited' });
    expect(check('11002111')).toEqual({category:'Gas operated vehicles', decision: 'prohibited' });
    expect(check('9234500')).toEqual( {category:'Other vehicles', decision: 'prohibited' } );
    expect(check('1238585')).toEqual( {category:'Other vehicles', decision: 'prohibited' } );
    expect(check('1634586')).toEqual( {category:'Other vehicles', decision: 'prohibited' } );
    expect(check('1234587')).toEqual( {category:'Other vehicles', decision: 'prohibited' } );
    expect(check('4234589')).toEqual( {category:'Other vehicles', decision: 'prohibited' } );


    expect(check('14234500')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('14234585')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('14234586')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('14234587')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('14234688')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('14234589')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );

    expect(check('777')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
    expect(check('123456789')).toEqual( {category:'Regular vehicles', decision: 'allowed' } );
})