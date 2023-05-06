import { reactive, ref } from 'vue';
import { FigAddressForm } from '../../../index.js';

export default {
    title: 'Components/AddressForm',
    component: FigAddressForm,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigAddressForm
    },
    setup() {
        const form = reactive({
            countryCodeAlpha2: null,
            firstName: 'testfirstname',
            lastName: null,
            streetAddress: null,
            extendedAddress: null,
            city: null,
            state: null,
            postalCode: null,
            company: null,
            phone: null,
            email: null,
            is_gift: false
        });

        const formIsInvalid = ref(true);

        function onInvalid(val) {
            formIsInvalid.value = val;
        }

        return {
            args,
            form,
            formIsInvalid,
            onInvalid
        };
    },
    template: `
        <div>
            <fig-address-form v-model="form" v-bind="attrs" @invalid="onInvalid" />

            <div class="pt-6">
                <div>FORM: {{ form }}</div>
                <div>FORM IS INVALID: {{ formIsInvalid }}</div>
            </div>
        </div>
    `
});

export const AddressForm = Template.bind({});
AddressForm.args = {
    // required: ['lastName'],
    rowSpacing: 1,
    cellSpacing: 2
};

