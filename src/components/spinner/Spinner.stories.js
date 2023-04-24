import FigSpinner from './Spinner.vue';

export default {
    title: 'Components/Spinner',
    component: FigSpinner,
    argTypes: {
        width: {
            control: {
                type: 'number'
            }
        },

        strokeWidth: {
            control: {
                type: 'number'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSpinner
    },
    setup() {
        return { args };
    },
    template: `
        <fig-spinner v-bind="args" />
    `
});

export const Spinner = Template.bind({});
// Spinner.storyName = 'icon on the left';
Spinner.args = {};
