<script>
export default {
    name: 'DropdownButton'
}
</script>

<script setup>
const props = defineProps({
    centered: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);

function onClick(e) {
    e.preventDefault();
    emit('click', e);
};
</script>


<template>
    <div class="hover:bg-gray-100">
        <button
            type="button"
            class="border-0 py-2 px-4 text-sm font-normal block w-full whitespace-nowrap bg-transparent text-gray-600"
            :class="{'text-center': centered, 'text-left': !centered}"
            role="menuitem"
            v-on="$listeners"
            @click="onClick">
            <slot></slot>
        </button>
    </div>
</template>
