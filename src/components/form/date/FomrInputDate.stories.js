import { ref } from 'vue';
import FigFormInputDate from './FormInputDate.vue';

export default {
    title: 'Components/Form/DateTime',
    component: FigFormInputDate,
    argTypes: {
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormInputDate
    },
    setup() {
        const val = ref(null);

        function onUpdate(date) {
            console.log('update', date);
        }

        function onClose(date) {
            console.log('close', date);
        }

        function onOpen(date) {
            console.log('open', date);
        }

        return {
            val,
            onUpdate,
            onClose,
            onOpen,
            args
        };
    },
    template: `
        <div>
            <fig-form-date-time
                v-bind="args"
                v-model="val"
                @update="onUpdate"
                @close="onClose"
                @open="onOpen" />

            <div class="mt-4">
                UTC: {{ val }}
            </div>
        </div>
        `
});

export const DateTime = Template.bind({});
DateTime.args = {
    clearable: true
};
