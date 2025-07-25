<template>
  <div class="pdf-wrapper">
    <embed :src="pdfSrc" width="100%" height="800px" type="application/pdf" />
  </div>
</template>
<script lang="ts" setup>
const { pdfSrc } = defineProps<{
  pdfSrc: string;
}>();
</script>
<style lang="scss" scoped></style>
