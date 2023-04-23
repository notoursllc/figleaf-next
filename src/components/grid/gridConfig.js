// widths: https://tailwindcss.com/docs/width
const FRACTIONS = [
    '1/2',
    '1/3',
    '2/3',
    '1/4',
    '2/4',
    '3/4',
    '1/5',
    '2/5',
    '3/5',
    '4/5',
    '1/6',
    '2/6',
    '3/6',
    '4/6',
    '5/6',
    '1/12',
    '2/12',
    '3/12',
    '4/12',
    '5/12',
    '6/12',
    '7/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    'full',
    ''
];

// https://tailwindcss.com/docs/padding
const GAPS = [
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '20',
    '24',
    '28',
    '32',
    '36',
    '40',
    '44',
    '48',
    '52',
    '56',
    '60',
    '64',
    '72',
    '80',
    '96',
    'px',
    ''
];


module.exports.fractions = FRACTIONS;
module.exports.gaps = GAPS;

module.exports.getWhiteListClasses = function() {
    const whitelist = [];

    ['xl', 'lg', 'md', 'sm', 'default'].forEach((size) => {
        FRACTIONS.forEach(fraction => {
            const base = `w-${fraction}`;

            whitelist.push(
                size === 'default'
                    ? base
                    : `${size}:${base}`
            );
        });

        GAPS.forEach(gap => {
            const basePx = `px-${gap}`;
            const baseMy = `my-${gap}`;

            whitelist.push(
                size === 'default'
                    ? (basePx, baseMy)
                    : (`${size}:${basePx}`, `${size}:${baseMy}`)
            );
        });
    });

    return whitelist;
};
