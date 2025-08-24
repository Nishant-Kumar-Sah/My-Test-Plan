<template>
  <div class="edit-profile-page">
    <div class="page-container">
      <div class="page-header">
        <button class="back-btn" @click="$router.go(-1)">
          ← Back
        </button>
        <h1>Edit Profile</h1>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">JIRA ID</label>
              <div class="field-value disabled">{{ formData.jiraId }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">First Name</label>
              <input 
                v-model="formData.firstName" 
                type="text" 
                class="field-input" 
                placeholder="Enter your first name"
              />
            </div>

            <div class="field-group">
              <label class="field-label">Last Name</label>
              <input 
                v-model="formData.lastName" 
                type="text" 
                class="field-input" 
                placeholder="Enter your last name"
              />
            </div>

            <div class="field-group">
              <label class="field-label">Email</label>
              <input 
                v-model="formData.email" 
                type="email" 
                class="field-input" 
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="field-group">
              <label class="field-label">New Password</label>
              <input 
                v-model="formData.newPassword" 
                type="password" 
                class="field-input" 
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>
        </div>



        <div class="page-actions">
          <button type="button" class="btn btn-secondary" @click="$router.go(-1)">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleUpdateProfile" :disabled="isLoading">
            {{ isLoading ? 'Updating...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      isLoading: false,
      formData: {
        jiraId: '',
        firstName: '',
        lastName: '',
        email: '',
        newPassword: ''
      }
    }
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.formData = {
          jiraId: user.jiraId || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          newPassword: ''
        };
      } else {
        // Redirect to login if no user data
        this.$router.push('/login');
      }
    },
    async handleUpdateProfile() {
      this.isLoading = true;

      try {
        // Here you would typically make an API call to update the user
        console.log('Update profile data:', {
          jiraId: this.formData.jiraId,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          newPassword: this.formData.newPassword || undefined
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update localStorage with new data
        const updatedUserData = {
          jiraId: this.formData.jiraId,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        // Show success message
        alert('Profile updated successfully!');
        
        // Go back to previous page
        this.$router.go(-1);
      } catch (error) {
        console.error('Update profile error:', error);
        alert('Failed to update profile. Please try again.');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.edit-profile-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 60px 40px;
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.back-btn {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: #e9ecef;
}

.page-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.profile-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.profile-section {
  padding: 40px;
  border-bottom: 1px solid #e9ecef;
}

.profile-section:last-child {
  border-bottom: none;
}

.profile-section h2 {
  margin: 0 0 25px 0;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 20px;
}

.field-group {
  margin-bottom: 0;
}

.field-group:last-child {
  margin-bottom: 0;
}

.field-label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
}

.field-value {
  padding: 16px 0;
  color: #333;
  font-size: 16px;
  border-bottom: 2px solid #e9ecef;
  text-align: left;
}

.field-value.disabled {
  color: #6c757d;
  font-style: italic;
}

.field-input {
  width: 100%;
  padding: 16px 0;
  border: none;
  border-bottom: 2px solid #e9ecef;
  font-size: 16px;
  background: transparent;
  color: #333;
  transition: border-bottom-color 0.2s ease;
  text-align: left;
}

.field-input:focus {
  outline: none;
  border-bottom-color: #ff6b35;
}

.field-input::placeholder {
  color: #6c757d;
  text-align: left;
}

.field-help {
  display: block;
  margin-top: 6px;
  color: #6c757d;
  font-size: 12px;
}

.page-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding: 40px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-primary {
  background-color: #ff6b35;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #e55a2b;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .profile-section {
    padding: 20px;
  }
  
  .page-actions {
    flex-direction: column;
    padding: 20px;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
