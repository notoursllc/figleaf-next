import { ref } from 'vue';
import { FigSizeButtons } from '../../../index.js';

export default {
    title: 'Components/SizeButtons',
    component: FigSizeButtons,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSizeButtons
    },
    setup() {
        const selected = ref({});

        return {
            args,
            selected
        };
    },
    template: `
        <div>
            <fig-size-buttons
                v-model="selected"
                v-bind="args" />

            <div class="mt-4">SELECTED: {{ selected }}</div>
        </div>
    `
});

export const SizeButtons = Template.bind({});
SizeButtons.args = {
    skus: [
        { label: 'W 9-12, M 8.5-12', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 1 },
        { label: 'W 11-12, M 11-12', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 2 },
        { label: 'M', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 3 },
        { label: 'L', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 4 },
        { label: 'XL', inventory_count: 0, visible_if_no_inventory: true, disabled: false, id: 5 },
        { label: 'XXL', inventory_count: 0, visible_if_no_inventory: false, disabled: false, id: 6 }
    ]
};

