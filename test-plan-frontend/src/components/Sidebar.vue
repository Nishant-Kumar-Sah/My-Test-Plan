<template>
    <div class="sidebar" :class="{ open: isOpen }">
      <div class="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#" class="sidebar-link" :class="{ active: activeItem === 'all-plans' }" @click="navigateTo('all-plans', '/test-plans')">
          <span class="icon">📋</span>
          <span class="text">All Test Plans</span>
        </a></li>
        <li><a href="#" class="sidebar-link" :class="{ active: activeItem === 'create-plan' }" @click="navigateTo('create-plan', '/test-plans')">
          <span class="icon">➕</span>
          <span class="text">Create Test Plan</span>
        </a></li>
        <!-- Settings link commented out until dashboard is created -->
        <!-- <li><a href="#" class="sidebar-link" :class="{ active: activeItem === 'settings' }" @click="navigateTo('settings', '/dashboard')">
          <span class="icon">⚙️</span>
          <span class="text">Settings</span>
        </a></li> -->
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isOpen'],
    data() {
      return {
        activeItem: 'all-plans' // Default active item
      }
    },
    methods: {
      setActiveItem(item) {
        this.activeItem = item
        // Emit event to parent component for navigation
        this.$emit('nav-change', item)
      },
      navigateTo(item, route) {
        console.log('Navigating to:', route)
        this.setActiveItem(item)
        
        // Check if router is available
        if (this.$router) {
          this.$router.push(route)
        } else {
          console.error('Router not available')
          // Fallback to window.location
          window.location.href = route
        }
        
        // Close sidebar after navigation
        this.$emit('toggle-sidebar')
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: white;
    color: #2c3e50;
    padding: 20px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-right: 1px solid #e9ecef;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .sidebar-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
  }
  
  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar-menu li {
    margin: 8px 0;
  }
  
  .sidebar-link {
    color: #2c3e50;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-weight: 500;
  }
  
  .sidebar-link .icon {
    width: 24px;
    margin-right: 12px;
    font-size: 16px;
    text-align: center;
  }
  
  .sidebar-link .text {
    flex: 1;
  }
  
  .sidebar-link:hover {
  background-color: #f8f9fa;
  color: #ff6b35;
  text-decoration: none;
}
  
  .sidebar-link.active {
  background-color: #eff0f1;
  color: #2c3e50;
  border-left: 3px solid #ff6b35;
}
  
  .sidebar-link.active:hover {
    background-color: #e9ecef;
    color: #2c3e50;
  }
  </style>
  