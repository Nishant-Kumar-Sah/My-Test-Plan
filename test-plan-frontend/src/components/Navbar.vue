<template>
    <nav class="navbar">
      <div class="left">
        <button class="hamburger" @click="$emit('toggle-sidebar')">☰</button>
        <span class="app-name">My Test Plan</span>
      </div>
              <div class="right">
          <button v-if="!isLoggedIn" class="btn btn-primary" @click="$router.push('/login')">Login</button>
          <button v-if="!isLoggedIn" class="btn btn-secondary" @click="$router.push('/signup')">Signup</button>
          <div v-if="isLoggedIn" class="user-profile">
            <div class="profile-icon" @click="toggleDropdown">
              <span class="profile-avatar">{{ getUserInitials() }}</span>
            </div>
            <div v-if="showDropdown" class="profile-dropdown">
              <div class="dropdown-item" @click="editProfile">
                <span class="dropdown-icon">👤</span>
                Edit Profile
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item" @click="handleLogout">
                <span class="dropdown-icon">🚪</span>
                Logout
              </div>
            </div>
          </div>
        </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: false,
        userData: null,
        showDropdown: false
      };
    },
    mounted() {
      this.checkAuthStatus();
      // Close dropdown when clicking outside
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
      checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userData = localStorage.getItem('user');
        
        this.isLoggedIn = isLoggedIn;
        this.userData = userData ? JSON.parse(userData) : null;
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.showDropdown = false;
        }
      },
      getUserInitials() {
        if (!this.userData) return '?';
        const firstName = this.userData.firstName || '';
        const lastName = this.userData.lastName || '';
        const jiraId = this.userData.jiraId || '';
        
        if (firstName && lastName) {
          return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
        } else if (firstName) {
          return firstName.charAt(0).toUpperCase();
        } else if (jiraId) {
          return jiraId.charAt(0).toUpperCase();
        }
        return '?';
      },
      editProfile() {
        this.showDropdown = false;
        this.$router.push('/edit-profile');
      },
      handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        this.isLoggedIn = false;
        this.userData = null;
        this.showDropdown = false;
        this.$router.push('/login');
      }
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

  .user-profile {
    position: relative;
  }

  .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ff6b35;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .profile-icon:hover {
    background-color: #e55a2b;
  }

  .profile-avatar {
    color: white;
    font-weight: 600;
    font-size: 16px;
  }

  .profile-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    min-width: 180px;
    z-index: 1001;
    border: 1px solid #e9ecef;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    cursor: pointer;
    color: #2c3e50;
    font-size: 14px;
    transition: background-color 0.2s ease;
  }

  .dropdown-item:hover {
    background-color: #f8f9fa;
  }

  .dropdown-item:first-child {
    border-radius: 8px 8px 0 0;
  }

  .dropdown-item:last-child {
    border-radius: 0 0 8px 8px;
  }

  .dropdown-icon {
    font-size: 16px;
  }

  .dropdown-divider {
    height: 1px;
    background-color: #e9ecef;
    margin: 4px 0;
  }
  </style>
  