<template>
    <nav class="navbar">
      <div class="left">
        <button class="hamburger" @click="$emit('toggle-sidebar')">☰</button>
        <span class="app-name">My Test Plan</span>
      </div>
      <div class="right">
        <button v-if="!isLoggedIn" @click="login">Login</button>
        <button v-else @click="logout">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: false, // Replace with real auth logic later
      };
    },
    methods: {
      toggleSidebar() {
        console.log("Toggle sidebar");
      },
      login() {
        this.isLoggedIn = true;
      },
      logout() {
        this.isLoggedIn = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    color: #2c3e50;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    box-sizing: border-box;
    min-height: 60px;
  }
  
  .left {
    display: flex;
    align-items: center;
  }
  
  .hamburger {
    font-size: 24px;
    background: none;
    border: none;
    color: #2c3e50;
    margin-right: 15px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    outline: none;
  }
  
  .hamburger:hover {
    background-color: #f8f9fa;
  }
  
  .hamburger:active {
    background-color: #e9ecef;
  }
  
  .app-name {
    font-size: 20px;
    font-weight: bold;
  }
  
  .right {
    display: flex;
    align-items: center;
  }
  
  .right button {
    background-color: #ff6b35;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    margin-left: 10px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .right button:hover {
    background-color: #e55a2b;
  }
  </style>
  