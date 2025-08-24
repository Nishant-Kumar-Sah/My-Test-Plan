<template>
  <div class="signup-container">
    <div class="signup-card">
      <div class="signup-header">
        <h1>Create Account</h1>
        <p>Join My Test Plan to manage your test cases efficiently</p>
      </div>

      <form @submit.prevent="handleSignup" class="signup-form">
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
            v-model="formData.firstName" 
            type="text" 
            class="form-input" 
            placeholder="First Name"
          />
        </div>

        <div class="form-field">
          <input 
            v-model="formData.lastName" 
            type="text" 
            class="form-input" 
            placeholder="Last Name"
          />
        </div>

        <div class="form-field">
          <input 
            v-model="formData.email" 
            type="email" 
            class="form-input" 
            placeholder="Email"
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
            minlength="6"
          />
        </div>



        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </div>

        <div class="form-footer">
          <p>Already have an account? <router-link to="/login" class="link">Login</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      isLoading: false,
      formData: {
        jiraId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSignup() {
      this.isLoading = true

      try {
        // Here you would typically make an API call to register the user
        console.log('Signup data:', {
          username: this.formData.jiraId,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          password: this.formData.password,
          jiraId: this.formData.jiraId
        })

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Store user data in localStorage for demo purposes
        const userData = {
          username: this.formData.jiraId,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          jiraId: this.formData.jiraId
        }
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isLoggedIn', 'true')

        // Redirect to test plans page
        this.$router.push('/test-plans')
      } catch (error) {
        console.error('Signup error:', error)
        alert('Failed to create account. Please try again.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
}

.signup-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 40px;
  width: 100%;
  max-width: 480px;
}

.signup-header {
  text-align: center;
  margin-bottom: 30px;
}

.signup-header h1 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
}

.signup-header p {
  margin: 0;
  color: #6c757d;
  font-size: 16px;
}

.signup-form {
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

.signup-form .form-input {
  background: transparent !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.signup-form .form-input:focus {
  outline: none !important;
  border-bottom: 1px solid #e9ecef !important;
  box-shadow: none !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background: transparent !important;
}

/* Override autofill styles */
.signup-form .form-input:-webkit-autofill,
.signup-form .form-input:-webkit-autofill:hover,
.signup-form .form-input:-webkit-autofill:focus,
.signup-form .form-input:-webkit-autofill:active {
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
.signup-form .form-input:-webkit-autofill {
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
  .signup-card {
    padding: 30px 20px;
  }
  
  .signup-header h1 {
    font-size: 24px;
  }
}
</style>
