<template>
  <nav aria-label="breadcrumb">
    <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="this.$store.state.isRTL ? '' : ' me-sm-6'"
    >
    </ol>
  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true,
    },
    textWhite: {
      type: String,
    },
  },
};
</script>
