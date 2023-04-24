<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import isObject from 'lodash.isobject';
import { email, required } from 'vuelidate/lib/validators';
import FigFormText from '../form/text/FormText';
import FigFormGroup from '../form/group/FormGroup';
import FigButton from '../button/Button';
import FigSelectCountry from '../selectCountry/SelectCountry';
import FigSelectStateProvince from '../selectStateProvince/SelectStateProvince';
import FigIcon from '../icon/FigIcon';
import FigIconLabel from '../iconLabel/IconLabel';
import FigFormSelectNative from '../form/selectNative/FormSelectNative.vue';
import FigTooltip from '../tooltip/Tooltip.vue';
import FigRequired from '../form/Required.vue';
import FigOverlay from '../overlay/Overlay.vue';

import {
    addressFormRequiredProps,
    addressFormInputSizes,
    addressFormRowSpacing
} from './constants';

Vue.use(Vuelidate);


export default {
    name: 'AddressForm',

    props: {
        value: {
            type: Object,
            required: true
        },

        stripe: {
            type: Object,
            required: true
        },

        required: {
            type: Array,
            default() {
                return Object.keys(addressFormRequiredProps);
            }
            // default: Object.keys(addressFormRequiredProps)
        },

        inputSize: {
            type: String,
            default: addressFormInputSizes.lg,
            validator: (value) => Object.keys(addressFormInputSizes).includes(value)
        },

        hidePhone: {
            type: Boolean
        },

        hideEmail: {
            type: Boolean
        },

        hideGift: {
            type: Boolean
        },

        rowSpacing: {
            type: [Number, String],
            default: 1,
            validator: (value) => addressFormRowSpacing.includes(parseInt(value, 10))
        },

        cellSpacing: {
            type: [Number, String],
            default: 2,
            validator: (value) => addressFormRowSpacing.includes(parseInt(value, 10))
        }
    },

    components: {
        FigButton,
        FigFormText,
        FigFormGroup,
        FigSelectCountry,
        FigSelectStateProvince,
        FigIcon,
        FigIconLabel,
        FigFormSelectNative,
        FigTooltip,
        FigRequired,
        FigOverlay
    },

    data: function() {
        return {
            addressFormLoading: true,
            form: {
                firstName: null,
                lastName: null,
                streetAddress: null,
                extendedAddress: null,
                city: null,
                state: null,
                postalCode: null,
                countryCodeAlpha2: null,
                phone: null,
                email: null,
                is_gift: false
            },
            showExtraInputs: false
        };
    },

    validations: function() {
        return this.validationObject;
    },

    computed: {
        rowClasses() {
            return `flex flex-wrap -mx-${this.cellSpacing}`;
        },

        oneColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing}`;
        },

        twoColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing} sm:w-1/2`;
        },

        threeColCellClasses() {
            return `w-full mb-${this.rowSpacing} px-${this.cellSpacing} sm:w-1/3`;
        },

        requiredProps() {
            const reqd = [ ...this.required ];

            if(this.hidePhone && reqd.includes('phone')) {
                reqd.splice(reqd.indexOf('phone'), 1);
            }

            if(this.hideEmail && reqd.includes('email')) {
                reqd.splice(reqd.indexOf('email'), 1);
            }

            return reqd;
        },

        validationObject() {
            const baseValidation = {};

            for (let prop in this.form) {
                if (this.requiredProps.includes(prop)) {
                    baseValidation[prop] = { required };
                }
            }

            baseValidation.email = this.requiredProps.includes('email') ? {...baseValidation.email, email } : { email };

            return {
                form: baseValidation
            };
        }
    },

    methods: {
        canShowValidationMsg(attr) {
            if(!this.$v.form.hasOwnProperty(attr) || !this.$v.form[attr].$dirty) {
                return false;
            }

            const attrValidations = this.validationObject.form[attr];
            let canShow = false;

            if(isObject(attrValidations)) {
                Object.keys(attrValidations).forEach((key) => {
                    if(!this.$v.form[attr][key]) {
                        canShow = true;
                    }
                });
            }

            return canShow;
        },

        inputState(attr) {
            if(!this.$v.form[attr] || !this.$v.form[attr].$dirty) {
                return null;
            }

            switch(attr) {
                case 'email':
                    return !this.$v.form.email.email ? false : null;

                default:
                    if(!this.$v.form[attr].required) {
                        return false;
                    }
                    return null;
            }
        },

        async initAddressForm() {
            const elements = this.stripe.elements({
                loader: 'always',
                // locale: '' // https://edge.stripe.com/docs/js/appendix/supported_locales?type=cvc_update
                appearance: {
                    // theme: 'stripe',
                    // variables: {
                    //     colorPrimary: '#0570de',
                    //     colorBackground: '#ffffff',
                    //     colorBackgroundDeemphasize10: 'red',
                    //     colorText: '#30313d',
                    //     colorDanger: '#df1b41',
                    //     fontFamily: 'Ideal Sans, system-ui, sans-serif',
                    //     spacingUnit: '4px',
                    //     borderRadius: '4px',
                    // }
                    theme: 'none',
                    rules: {
                        '.Tab': {
                            border: '1px solid #E0E6EB',
                            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
                        },

                        '.Tab:hover': {
                            color: 'var(--colorText)',
                        },

                        '.Tab--selected': {
                            borderColor: '#E0E6EB',
                            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
                        },

                        '.Input': {
                            border: '1px solid #cccccc',
                            borderRadius: '2px',
                        },
                        '.Input--invalid': {
                            boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
                        },
                    }
                }
            });

            // https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options
            const addressElement = elements.create('address', {
                mode: 'shipping',
                autocomplete: {
                    mode: 'automatic'
                },
                blockPoBox: true,
                fields: {
                    phone: 'always',
                    // email: 'always',
                },
                validation: {
                    phone: {
                        required: 'always',
                    },
                    // email: {
                    //     required: 'always',
                    // },
                },
                display: {
                    name: 'split'
                },
                defaultValues: {
                    // name: 'Jane Doe',
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    phone: this.form.phone,
                    address: {
                        line1: this.form.streetAddress,
                        line2: this.form.extendedAddress,
                        city: this.form.city,
                        state: this.form.state,
                        postal_code: this.form.postalCode,
                        country: this.form.countryCodeAlpha2,
                    }
                }
            });

            addressElement.mount("#address-element");
            this.addressFormLoading = false;

            addressElement.on('change', (event) => {
                console.log("ON CHANGE", event)

                if(event.value.address.line1) {
                    this.showExtraInputs = true;
                }

                if (event.complete) {
                    // Extract potentially complete address
                    const address = event.value.address;
                    this.form.firstName = event.value.firstName;
                    this.form.lastName = event.value.lastName;
                    this.form.phone = event.value.phone;

                    this.form.streetAddress = address.line1;
                    this.form.extendedAddress = address.line2;
                    this.form.city = address.city;
                    this.form.state = address.state;
                    this.form.postalCode = address.postal_code;
                    this.form.countryCodeAlpha2 = address.country;

                    this.$emit('input', this.form);

                    this.$emit(
                        'invalid',
                        this.$v.form.$invalid ? true : false
                    );
                }
                else {
                    this.$emit('invalid', true);
                }
            })
        }
    },

    mounted() {
        this.initAddressForm();
    },

    watch: {
        '$v.form.$invalid': {
            handler: function(newVal) {
                this.$emit('invalid', newVal);
            },
            immediate: true
        },

        'value': {
            handler: function(newVal) {
                console.log("VAL WATCH", newVal)
                if(newVal) {
                    for(let prop in this.form) {
                        if(newVal.hasOwnProperty(prop)) {
                            this.form[prop] = newVal[prop];
                        }
                    }
                }

            },
            immediate: true
        }
    }
};
</script>

<template>
    <div>

        <fig-overlay :show="addressFormLoading">
            <div id="address-element" class="mb-2"></div>
        </fig-overlay>

        <!-- email -->
        <template v-if="showExtraInputs">
            <div v-if="!hideEmail">
                <fig-form-group>
                    <template v-slot:label>
                        <span class="fig-address-label">{{ $t('Email') }}</span>
                        <!-- <fig-required /> -->
                    </template>

                    <fig-form-text
                        v-model.trim="form.email"
                        type="email"
                        :size="inputSize"
                        @input="(val) => { $v.form.email.$touch() }"
                        :state="inputState('email')" />

                    <template v-slot:error v-show="canShowValidationMsg('email')">
                        <div v-if="$v.form.email.hasOwnProperty('required') && !$v.form.email.required">{{ $t('Required') }}</div>
                        <div v-if="!$v.form.email.email">{{ $t('Please enter a valid email address.') }}</div>
                    </template>
                </fig-form-group>
            </div>

            <div class="pt-2" v-if="!hideGift">
                <fig-form-group :stacked="false">
                    <template v-slot:label>
                        <fig-icon-label>
                            <template v-slot:left>
                                <fig-icon
                                    icon="gift"
                                    :height="22"
                                    :width="22"
                                    :stroke-width="1.5" />
                            </template>
                            {{ $t('Is this order a gift?') }}
                        </fig-icon-label>
                    </template>
                    <div class="pl-2">
                        <fig-form-select-native
                            v-model.trim="form.is_gift"
                            :options="[
                                { label: $t('No'), value: false },
                                { label: $t('Yes'), value: true }
                            ]" />

                        <fig-tooltip :centered="false">
                            <template v-slot:toggler>
                                <div class="pl-1">
                                    <fig-icon
                                        icon="info-circle"
                                        :height="20"
                                        :width="20" />
                                </div>
                            </template>
                            {{ $t('is_gift_tooltip') }}
                        </fig-tooltip>
                    </div>
                </fig-form-group>
            </div>
        </template>

    </div>
</template>


<style scoped>
.fig-address-label {
    @apply  text-gray-600 text-sm;
}
</style>
