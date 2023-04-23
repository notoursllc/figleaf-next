export default function useDropdown() {
    const dropdownProps = {
        placement: {
            type: String,
            validator: (position) => {
                return [
                    '',
                    'top-end',
                    'top',
                    'top-start',
                    'bottom-end',
                    'bottom',
                    'bottom-start',
                    'right-start',
                    'right',
                    'right-end',
                    'left-start',
                    'left',
                    'left-end'
                ].includes(position);
            },
            default: 'bottom-start'
        },

        show: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        offset: {
            type: Array,
            default: () => [0, 8]
        },

        flip: {
            type: Boolean,
            default: true
        },

        customPopperOptions: {
            type: Object,
            default: null
        }
    }

    return {
        dropdownProps
    }
}
