import FigDivider from './Divider.vue';

export default {
    title: 'Components/Divider',
    component: FigDivider,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDivider
    },
    setup() {
        return { args };
    },
    template: '<fig-divider v-bind="args" />'
});

export const Divider = Template.bind({});
Divider.args = {};

