<script setup lang="ts">
import { useStore } from '@/store/store'


const store = useStore()
</script>

<template>
  <div id="app">
    <main>
      <router-view /> 
    </main>
  </div>
</template>
