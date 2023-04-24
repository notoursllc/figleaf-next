import { ref } from 'vue';
import FigModal from './Modal.vue';
import { modalSizes } from './constants';

export default {
    title: 'Components/Modal',

    component: FigModal,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(modalSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigModal
    },
    setup() {
        const storymodal = ref(null);

        function showModal() {
            storymodal.value.show();
        }

        return {
            args,
            storymodal,
            showModal
        };
    },
    template: `
        <div>
            <fig-modal v-bind="$props" ref="storymodal">
                <template v-slot:header>modal header</template>
                modal content
            </fig-modal>

            <div class="mt-4">
                <a @click="showModal">Show modal</a>
            </div>
        </div>
    `
});

export const Modal = Template.bind({});
Modal.args = {
    size: modalSizes.xl
};

