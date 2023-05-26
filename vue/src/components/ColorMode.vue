<script lang="ts" setup>
const ICONS = {
  system: 'i-carbon-cloud-alerting',
  light: 'i-carbon-sun',
  dark: 'i-carbon-moon'
}

const { colorMode } = window

const iconClasses = shallowRef(ICONS[colorMode.value])

function toggleMode() {
  colorMode.toggle()
  iconClasses.value = ICONS[colorMode.value]
}
</script>

<template>
  <i role="button" title="toggle color mode" aria-label="toggle color mode" :class="iconClasses" @click="toggleMode" />
</template>
