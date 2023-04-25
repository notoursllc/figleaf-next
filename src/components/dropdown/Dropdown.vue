
<script>
// this component was heavily influenced by:
// https://raw.githubusercontent.com/coreui/coreui-vue/master/src/components/dropdown/CDropdown.vue
// https://coreui.io/vue/docs/components/dropdown.html

import { ref, computed, watch, onMounted } from 'vue';
import { createPopper } from '@popperjs/core';
import vNodes from '../vnodes/VNodes.vue';
import useDropdown from './useDropdown.js';
import { onClickOutside, onKeyStroke } from '@vueuse/core'; // https://vueuse.org/core/onKeyStroke/#onkeystroke

const { dropdownProps } = useDropdown();

export default {
    name: 'Dropdown',

    components: {
        vNodes
    },

    props: {
        ...dropdownProps
    },

    emits: ['selected'],

    expose: ['show', 'hide'],

    setup(props, { emit, slots }) {
        let popper = null;
        const visible = ref(false);
        const popperContainer = ref(null);
        const popperTarget = ref(null);
        const arrow = ref(null);
        const menu = ref(null);
        const dropdownButtonValues = new Map();

        function isType(vnode, name) {
            return vnode?.type?.name === name;
        }

        function isDropdownButton(vnode) {
            return isType(vnode, 'DropdownButton');
        }

        function isDropdownDivider(vnode) {
            return isType(vnode, 'DropdownDivider');
        }

        /**
         * Get the 'value' prop from the DropdownButton vnode if it exists,
         * otherwise set the value to the current size of the Map object
         * @param {*} vnode
         */
        function setDropdownButtonValue(vnode) {
            if (isDropdownButton(vnode)) {
                dropdownButtonValues.set(
                    vnode,
                    vnode?.props?.hasOwnProperty('value') ? vnode.props.value : dropdownButtonValues.size
                );
            }
        }

        const dropdownItems = computed(() => {
            const items = [];

            function processVnode(vnode) {
                if (isDropdownButton(vnode) || isDropdownDivider(vnode)) {
                    items.push(vnode);

                    if (isDropdownButton(vnode)) {
                        setDropdownButtonValue(vnode);
                    }
                }
            }

            if (slots.default) {
                slots.default().forEach((child) => {
                    if (child.children && child.children instanceof Array) {
                        child.children.forEach(processVnode);
                    }
                    else {
                        processVnode(child);
                    }
                });
            }

            return items;
        });


        const canShowDropdown = computed(() => {
            let canShow = false;
            let items = dropdownItems.value;

            /*
            * Making sure the list contains at least one DropdownButton.
            *
            * I tried simply returning dropdownButtonValues.size > 0, but
            * that didnt work for some reason.
            */
            for (let i=0, l=items.length; i < l; i++) {
                if (isDropdownButton(items[i])) {
                    canShow = true;
                    break;
                }
            }

            return canShow;
        });

        const defaultPopperOptions = computed(() => {
            return {
                strategy: 'fixed',
                placement: props.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: props.offset
                        }
                    },
                    {
                        name: 'flip',
                        enabled: props.flip
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            padding: 10
                        }
                    },
                    {
                        name: 'arrow',
                        options: {
                            enabled: true,
                            element: arrow.value
                        }
                    }
                ]
            };
        });

        const ariaAttrs = computed(() => {
            return {
                'aria-expanded': visible.value ? 'true' : 'false',
                'aria-haspopup': 'true'
            };
        });

        function removePopper() {
            if (popper) {
                popper.destroy();
            }
            popper = null;
        }

        function buildPopper() {
            removePopper();

            if (props.disabled) {
                visible.value = false;
                return;
            }

            popper = createPopper(
                popperTarget.value,
                menu.value,
                props.customPopperOptions || defaultPopperOptions.value
            );
        }

        function setDisplay(isVisible) {
            return isVisible ? buildPopper() : removePopper();
        }

        function toggle(e) {
            e?.preventDefault();
            visible.value = !visible.value;
            setDisplay(visible.value);
        }

        function hide() {
            visible.value = false;
            setDisplay(false);
        }

        function onDropdownItemClick(vnode) {
            if (isDropdownButton(vnode)) {
                emit('selected', dropdownButtonValues.get(vnode));
                hide();
            }
        }

        function checkClick(e) {
            if (slots.toggler() && e.target?.parentElement?.contains(e.target)) {
                toggle(e);
            }
        }

        onMounted(() => {
            if(canShowDropdown.value) {
                onClickOutside(popperContainer.value, hide);
                onKeyStroke('Escape', hide, { target: document });
            }
        });

        return {
            popperContainer,
            visible,
            checkClick,
            hide,
            ariaAttrs,
            popperTarget,
            arrow,
            menu,
            dropdownItems,
            canShowDropdown,
            onDropdownItemClick,
        };
    }
};
</script>


<template>
    <div ref="popperContainer" class="fig-dropdown">
        <template v-if="canShowDropdown">
            <div
                ref="popperTarget"
                class="leading-none"
                @click="checkClick"><slot name="toggler" :aria-attrs="ariaAttrs"></slot></div>
            <div
                ref="menu"
                class="shadow-tight bg-white text-base z-50 float-left py-2 list-none text-left rounded mt-1"
                :class="{'hidden': !visible, 'block': visible}">
                <div ref="arrow" class="arrow"></div>
                <v-nodes
                    v-for="(vnode, idx) in dropdownItems" :key="idx"
                    :vnodes="vnode"
                    @click="(e) => { e.preventDefault(); onDropdownItemClick(vnode) }" />
            </div>
        </template>
    </div>
</template>


<style scoped>
.fig-dropdown {
    @apply relative inline-flex align-middle;
}

/* https://popper.js.org/docs/v2/tutorial/#arrow */
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

.arrow::before {
  content: '';
  transform: rotate(45deg);
  background: #fff;
}

[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
</style>
