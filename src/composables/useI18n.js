export default function useI18n() {

    const numberFormats = {
        'en-US': {
            currency: {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol'
            },
            decimal: {
                style: 'decimal',
                // minimumFractionDigits: 2,
                // maximumFractionDigits: 2,
            },
            percent: {
                style: 'percent',
                useGrouping: true
            }
        }
    };

    const dateTimeFormats = {
        'en-US': {
            short: {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            },
            long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
                // second: 'numeric',
                // timeZoneName: 'short',
            }
        }
    };

    return {
        numberFormats,
        dateTimeFormats
    }
}
