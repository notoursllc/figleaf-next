<script>
export default {
    name: 'Canvas'
}
</script>

<script setup>
import '../../src/assets/css/tailwind.css';
import FigIconSprite from '../../src/components/icon/SvgSprite.vue';
</script>

<template>
    <div>
        <fig-icon-sprite />
        <slot />
    </div>
</template>
