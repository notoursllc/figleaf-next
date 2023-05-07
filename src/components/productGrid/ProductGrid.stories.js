import { FigProductGrid } from '../../../index.js';

export default {
    title: 'Components/ProductGrid',
    component: FigProductGrid,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigProductGrid
    },
    setup() {
        return { args };
    },
    template: `
        <fig-product-grid v-bind="args">
            <template v-slot:default="slotProps">
                <div style="border:1px solid red; padding: 20px">{{ slotProps.data }}</div>
            </template>
        </fig-product-grid>
    `
});

export const ProductGrid = Template.bind({});
ProductGrid.args = {
    products: [
        { id: 1, title: 'product 1' },
        { id: 2, title: 'product 2' },
        { id: 3, title: 'product 3' },
        { id: 4, title: 'product 4' }
    ]
};

