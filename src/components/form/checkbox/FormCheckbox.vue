<script>
export default {
    name: 'FormCheckbox'
}
</script>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    value: {},

    checkedValue: {},

    uncheckedValue: {},

    disabled: {
        type: Boolean,
        default: false
    },

    readonly: {
        type: Boolean
    }
});

const emit = defineEmits(['input']);

const isChecked = ref(null);
const checkedValueSet = computed(() => props.checkedValue !== undefined);
const uncheckedValueSet = computed(() => props.uncheckedValue !== undefined);

function onChange(e) {
    isChecked.value = e.target.checked;

    if(isChecked.value && checkedValueSet.value) {
        emitInput(props.checkedValue);
    }
    else if(!isChecked.value && uncheckedValueSet.value) {
        emitInput(props.uncheckedValue);
    }
    else {
        emitInput(isChecked.value);
    }
}

function emitInput(val) {
    emit('input', val);
}

watch(
    () => props.value,
    (newVal) => {
        if(checkedValueSet.value && newVal === props.checkedValue) {
            isChecked.value = true;
        }
        else if(uncheckedValueSet.value && newVal === props.uncheckedValue) {
            isChecked.value = false;
        }
        else {
            isChecked.value = newVal;
        }
    },
    { immediate: true }
);
</script>


<template>
    <label class="inline-flex items-center">
        <input
            type="checkbox"
            class="form-checkbox fig-form-control"
            v-bind="$attrs"
            @change="onChange"
            v-model="isChecked">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
