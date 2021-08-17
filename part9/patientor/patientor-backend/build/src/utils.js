"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/* TYPE ASSERTIONS */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
/* CHECK FIELD TYPES */
const ensureString = (field) => {
    if (!field || !isString(field)) {
        throw new Error('field is not string');
    }
    return field;
};
const ensureDate = (field) => {
    if (!field || !isString(field) || !isDate(field)) {
        throw new Error('invalid or missing date');
    }
    return field;
};
const ensureGender = (field) => {
    if (!field || !isGender(field)) {
        throw new Error('invalid or missing gender');
    }
    return field;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: ensureString(name),
        dateOfBirth: ensureDate(dateOfBirth),
        ssn: ensureString(ssn),
        gender: ensureGender(gender),
        occupation: ensureString(occupation)
    };
    return newPatient;
};
exports.default = toNewPatient;
