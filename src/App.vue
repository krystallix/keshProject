<script setup lang="ts">
import { useStore } from '@/stores/store'
import Toaster from '@/components/ui/toast/Toaster.vue'

const store = useStore()
</script>

<template>
  <Toaster />
  <div id="app">
    <main>
      <router-view /> 
    </main>
  </div>
</template>
