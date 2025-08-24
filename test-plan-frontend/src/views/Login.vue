<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your My Test Plan account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-field">
          <input 
            v-model="formData.jiraId" 
            type="text" 
            class="form-input" 
            placeholder="JIRA ID"
            required
          />
        </div>

        <div class="form-field">
          <input 
            v-model="formData.password" 
            type="password" 
            class="form-input" 
            placeholder="Password"
            required
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </div>

        <div class="form-footer">
          <p>Don't have an account? <router-link to="/signup" class="link">Create one</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      formData: {
        jiraId: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true

      try {
        // Here you would typically make an API call to authenticate the user
        console.log('Login data:', {
          username: this.formData.jiraId,
          password: this.formData.password
        })

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // For demo purposes, check if user exists in localStorage
        const existingUser = localStorage.getItem('user')
        if (existingUser) {
          const userData = JSON.parse(existingUser)
          if (userData.jiraId === this.formData.jiraId) {
            // Set login state
            localStorage.setItem('isLoggedIn', 'true')
            
            // Redirect to test plans page
            this.$router.push('/test-plans')
            return
          }
        }

        // If no user found or credentials don't match
        alert('Invalid JIRA ID or password. Please try again.')
      } catch (error) {
        console.error('Login error:', error)
        alert('Failed to sign in. Please try again.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: #6c757d;
  font-size: 16px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-field {
  margin-bottom: 20px;
}



.form-input {
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid #e9ecef;
  font-size: 16px;
  background: transparent !important;
  color: #333;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.login-form .form-input {
  background: transparent !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.login-form .form-input:focus {
  outline: none !important;
  border-bottom: 1px solid #e9ecef !important;
  box-shadow: none !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background: transparent !important;
}

/* Override autofill styles */
.login-form .form-input:-webkit-autofill,
.login-form .form-input:-webkit-autofill:hover,
.login-form .form-input:-webkit-autofill:focus,
.login-form .form-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
  -webkit-text-fill-color: #333 !important;
  background: transparent !important;
  background-color: transparent !important;
  border-bottom: 1px solid #e9ecef !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-radius: 0 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

/* Additional autofill override */
.login-form .form-input:-webkit-autofill {
  -webkit-background-clip: text !important;
  background-clip: text !important;
}

.form-actions {
  margin-top: 10px;
}

.btn {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
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

.form-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.form-footer p {
  margin: 0;
  color: #6c757d;
}

.link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 24px;
  }
}
</style>
