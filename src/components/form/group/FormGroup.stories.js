import { ref } from 'vue';
import FigFormGroup from './FormGroup.vue';
import FigFormText from '../text/FormText.vue';

export default {
    title: 'Components/Form/Group',

    component: FigFormGroup,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormGroup,
        FigFormText
    },
    setup() {
        const inputVal = ref(null);

        return {
            inputVal,
            args
        };
    },
    template: `
        <fig-form-group v-bind="args">
            <template v-slot:label>First name</template>
            <fig-form-text v-model="inputVal" />
        </fig-form-group>
    `
});

export const FormGroup = Template.bind({});
FormGroup.args = {};
