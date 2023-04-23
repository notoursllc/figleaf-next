<script>
export default {
    name: 'Divider'
}
</script>

<script setup>
import { computed } from 'vue';
import { dividerMargins } from './constants';

const props = defineProps({
    margin: {
        type: [String, Number],
        default: 5,
        validator: (value) => dividerMargins.includes(parseInt(value, 10))
    }
});

const classNames = computed(() => {
    return [
        'border-b border-0 border-gray-300 w-auto',
        `my-${props.margin}`
    ];
});
</script>

<template>
    <hr :class="classNames">
</template>
