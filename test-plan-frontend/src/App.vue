<template>
  <div id="app">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar :isOpen="sidebarOpen" @nav-change="handleNavChange" @toggle-sidebar="toggleSidebar" />
    <div class="container" :class="{ 'sidebar-open': sidebarOpen }">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import './assets/main.css'

const sidebarOpen = ref(false)
const currentPage = ref('all-plans')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleNavChange = (page) => {
  currentPage.value = page
  console.log('Navigating to:', page)
  // Here you can add routing logic or state management
}
</script>

<style scoped>
#app {
  position: relative;
}

.container {
  /* No margin adjustment needed - content will maintain full width */
}
</style>
