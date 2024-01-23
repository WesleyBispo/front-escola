const isValidFloat = (value) => {
    const number = Number(value);
    return (
        !isNaN(number) &&
        Number.isFinite(number) &&
        /^[+-]?([0-9]*[.])?[0-9]+$/.test(value)
    );
};

export default isValidFloat;
