<template>
  <div class="test-plan-detail">
    <!-- Header Section -->
    <div class="detail-header">
      <div class="header-left">
        <button class="btn btn-secondary" @click="$router.go(-1)">
          ← Back
        </button>
        <div class="plan-info">
          <h1>{{ testPlan.title }}</h1>
          <div class="plan-meta">
            <span class="status-badge" :class="testPlan.status">
              {{ testPlan.status }}
            </span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="editTestPlan">
          ✏️ Edit
        </button>
        <button class="btn btn-primary" @click="showAddTestCaseModal = true">
          ➕ Add Test Case
        </button>
      </div>
    </div>

    <!-- Description Section -->
    <div class="description-section">
      <p><strong>Description :</strong> {{ testPlan.description }}</p>
    </div>

    <!-- Tags section removed -->

    <!-- Test Cases Section -->
    <div class="test-cases-section">
      <div class="section-header">
        <div class="header-left">
          <div class="select-all-section">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="selectAll"
                @change="toggleSelectAll"
                class="checkbox-input"
              />
            </label>
            <span class="selected-count" v-if="selectedCases.length > 0">
              ({{ selectedCases.length }} selected)
            </span>
          </div>
          <h3>Test Cases ({{ testCases.length }})</h3>
        </div>
        <div class="case-filters">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search test cases..."
            class="form-input"
          />
        </div>
      </div>

      <!-- Test Cases List -->
      <div class="test-cases-list" v-if="filteredTestCases.length > 0">
        <div 
          v-for="testCase in filteredTestCases" 
          :key="testCase.id" 
          class="test-case-card"
          :class="{ expanded: expandedCases.includes(testCase.id) }"
        >
          <div class="case-header">
            <div class="case-checkbox" @click.stop>
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="selectedCases"
                  :value="testCase.id"
                  class="checkbox-input"
                />
              </label>
            </div>
            <div class="case-title" @click="toggleCase(testCase.id)">
              <span class="case-number">TC-{{ testCase.id }}</span>
              <h4>{{ testCase.summary }}</h4>
            </div>
            <div class="case-status">
              <button class="expand-btn" @click="toggleCase(testCase.id)">
                {{ expandedCases.includes(testCase.id) ? '−' : '+' }}
              </button>
            </div>
          </div>

          <!-- Expanded Case Details -->
          <div class="case-details" v-if="expandedCases.includes(testCase.id)">
            <div class="case-description">
              <p><strong>Description :</strong> {{ testCase.description }}</p>
            </div>

            <div class="case-preconditions" v-if="testCase.preconditions">
              <p><strong>Preconditions :</strong> {{ testCase.preconditions }}</p>
            </div>

            <div class="case-steps">
              <div class="steps-table">
                <div class="table-header">
                  <div class="step-number">Step</div>
                  <div class="step-action">Action</div>
                  <div class="step-input">Input</div>
                  <div class="step-expected">Expected Result</div>
                </div>
                <div 
                  v-for="(step, index) in testCase.steps" 
                  :key="index" 
                  class="step-row"
                >
                  <div class="step-number">{{ index + 1 }}</div>
                  <div class="step-action">{{ step.action }}</div>
                  <div class="step-input">{{ step.input || '-' }}</div>
                  <div class="step-expected">{{ step.expectedResult }}</div>
                </div>
              </div>
            </div>

            <div class="case-actions">
              <button class="btn btn-secondary" @click="editTestCase(testCase.id)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteTestCase(testCase.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" v-else>
        <div class="empty-icon">🧪</div>
        <h3>No test cases yet</h3>
        <p>Add your first test case to get started</p>
        <button class="btn btn-primary" @click="showAddTestCaseModal = true">
          Add Test Case
        </button>
      </div>
      
      <!-- Export Button -->
      <div class="export-section" v-if="testCases.length > 0">
        <button 
          class="btn btn-primary" 
          @click="exportToCSV"

        >
          📄 Export CSV
        </button>
      </div>
    </div>

    <!-- Add Test Case Modal -->
    <div v-if="showAddTestCaseModal" class="modal-overlay" @click="showAddTestCaseModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Add New Test Case</h2>
          <button class="modal-close" @click="showAddTestCaseModal = false">×</button>
        </div>
        
        <form @submit.prevent="createTestCase">
          <div class="form-group">
            <label class="form-label">Summary</label>
            <input 
              v-model="newTestCase.summary" 
              type="text" 
              class="form-input" 
              placeholder="Brief description of the test case"
              required
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea 
              v-model="newTestCase.description" 
              class="form-input form-textarea" 
              placeholder="Detailed description of what this test case covers"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Preconditions</label>
            <textarea 
              v-model="newTestCase.preconditions" 
              class="form-input form-textarea" 
              placeholder="Any prerequisites or setup required"
              rows="2"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Test Steps</label>
            <div class="steps-container">
              <div 
                v-for="(step, index) in newTestCase.steps" 
                :key="index" 
                class="step-input-row"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <input 
                  v-model="step.action" 
                  type="text" 
                  class="form-input" 
                  placeholder="Action to perform"
                />
                <input 
                  v-model="step.input" 
                  type="text" 
                  class="form-input" 
                  placeholder="Input data"
                />
                <input 
                  v-model="step.expectedResult" 
                  type="text" 
                  class="form-input" 
                  placeholder="Expected result"
                />
                <button 
                  type="button" 
                  class="btn btn-danger" 
                  @click="removeStep(index)"
                  v-if="newTestCase.steps.length > 1"
                >
                  ×
                </button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="addStep">
              + Add Step
            </button>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="showAddTestCaseModal = false">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Create Test Case
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestPlanDetail',
  mounted() {
    // Get the test plan ID from route params
    const planId = this.$route.params.id
    console.log('Loading test plan:', planId)
    // Here you would typically fetch the test plan data from API
    // For now, we're using sample data
  },
  data() {
    return {
      searchQuery: '',
      expandedCases: [],
      showAddTestCaseModal: false,
      selectedCases: [],
      selectAll: false,
      newTestCase: {
        summary: '',
        description: '',
        preconditions: '',
        steps: [{ action: '', input: '', expectedResult: '' }]
      },
      // Sample data - replace with API calls
      testPlan: {
        id: 1,
        title: 'User Authentication Flow',
        description: 'Comprehensive test plan for user login, registration, and password reset functionality. This plan covers all aspects of user authentication including security measures, error handling, and edge cases.',
        createdAt: '2024-01-15',
        tags: ['authentication', 'regression', 'critical']
      },
      testCases: [
        {
          id: 1,
          summary: 'User Login with Valid Credentials',
          description: 'Test that users can successfully log in with valid email and password.',
          preconditions: 'User account exists and is active',
          steps: [
            { action: 'Navigate to login page', expectedResult: 'Login form is displayed' },
            { action: 'Enter valid email address', expectedResult: 'Email field accepts input' },
            { action: 'Enter valid password', expectedResult: 'Password field accepts input' },
            { action: 'Click Login button', expectedResult: 'User is redirected to dashboard' }
          ]
        },
        {
          id: 2,
          summary: 'User Login with Invalid Credentials',
          description: 'Test error handling when users enter invalid login credentials.',
          preconditions: 'User is on login page',
          steps: [
            { action: 'Enter invalid email address', expectedResult: 'Email field accepts input' },
            { action: 'Enter invalid password', expectedResult: 'Password field accepts input' },
            { action: 'Click Login button', expectedResult: 'Error message is displayed' }
          ]
        },
        {
          id: 3,
          summary: 'Password Reset Functionality',
          description: 'Test the password reset flow from request to completion.',
          preconditions: 'User account exists',
          steps: [
            { action: 'Click "Forgot Password" link', expectedResult: 'Password reset form is displayed' },
            { action: 'Enter email address', expectedResult: 'Email field accepts input' },
            { action: 'Click "Send Reset Link"', expectedResult: 'Confirmation message is shown' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredTestCases() {
      if (!this.searchQuery) return this.testCases
      
      const query = this.searchQuery.toLowerCase()
      return this.testCases.filter(testCase => 
        testCase.summary.toLowerCase().includes(query) ||
        testCase.description.toLowerCase().includes(query)
      )
    }
  },
  watch: {
    selectedCases(newVal) {
      // Update select all checkbox state
      const filteredIds = this.filteredTestCases.map(tc => tc.id)
      this.selectAll = filteredIds.length > 0 && filteredIds.every(id => newVal.includes(id))
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    toggleCase(caseId) {
      const index = this.expandedCases.indexOf(caseId)
      if (index > -1) {
        this.expandedCases.splice(index, 1)
      } else {
        this.expandedCases.push(caseId)
      }
    },
    editTestPlan() {
      console.log('Edit test plan:', this.testPlan.id)
    },
    editTestCase(caseId) {
      console.log('Edit test case:', caseId)
    },
    deleteTestCase(caseId) {
      if (confirm('Are you sure you want to delete this test case?')) {
        this.testCases = this.testCases.filter(tc => tc.id !== caseId)
      }
    },
    addStep() {
      this.newTestCase.steps.push({ action: '', input: '', expectedResult: '' })
    },
    removeStep(index) {
      this.newTestCase.steps.splice(index, 1)
    },
    createTestCase() {
      const newCase = {
        id: Date.now(),
        summary: this.newTestCase.summary,
        description: this.newTestCase.description,
        preconditions: this.newTestCase.preconditions,
        status: 'pending',
        steps: this.newTestCase.steps.filter(step => step.action && step.expectedResult)
      }
      
      this.testCases.push(newCase)
      this.showAddTestCaseModal = false
      this.newTestCase = {
        summary: '',
        description: '',
        preconditions: '',
        steps: [{ action: '', input: '', expectedResult: '' }]
      }
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedCases = this.filteredTestCases.map(tc => tc.id)
      } else {
        this.selectedCases = []
      }
    },
    exportToCSV() {
      // If no test cases are selected, export all test cases
      // If test cases are selected, export only the selected ones
      const testCasesToExport = this.selectedCases.length === 0 
        ? this.testCases 
        : this.testCases.filter(tc => this.selectedCases.includes(tc.id))
      
      // Create CSV content with the specified headers
      const headers = ['issueIndex', 'summary', 'description', 'stepGroup', 'tctStepId', 'Action', 'Input', 'Expected result', 'components', 'assigneeId', 'textCfValue', 'requirements', 'preconditions']
      let csvContent = headers.join(',') + '\n'
      
      testCasesToExport.forEach(testCase => {
        // For each test case, create a row for each step
        testCase.steps.forEach((step, stepIndex) => {
          const row = [
            testCase.id, // issueIndex
            stepIndex === 0 ? `"${testCase.summary}"` : '', // summary (only in first row)
            stepIndex === 0 ? `"${testCase.description}"` : '', // description (only in first row)
            '', // stepGroup (empty for now)
            stepIndex + 1, // tctStepId (simple integer)
            `"${step.action}"`, // Action
            `"${step.input || ''}"`, // Input
            `"${step.expectedResult}"`, // Expected result
            '', // components (empty for now)
            'USER-JIRA-ID', // assigneeId (user's Jira ID - to be replaced with actual user data)
            '', // textCfValue (empty for now)
            this.testPlan.id, // requirements (Jira Ticket ID)
            stepIndex === 0 ? `"${testCase.preconditions || ''}"` : '' // preconditions (only in first row)
          ].join(',')
          
          csvContent += row + '\n'
        })
      })
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `test-cases-${this.testPlan.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style scoped>
.test-plan-detail {
  padding: 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.plan-info h1 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
}

.plan-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.created-date {
  color: #6c757d;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.description-section {
  margin-bottom: 50px;
}



.description-section p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  text-align: center !important;
}

/* Tags styles removed */

.test-cases-section {
  margin-top: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
}

.case-filters {
  flex: 1;
  max-width: 300px;
}

/* Bulk actions removed - moved to header */

.select-all-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #ff6b35;
  background-color: white !important;
  border: 1px solid #111111 !important;
  border-radius: 3px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
}

.checkbox-input:checked {
  background-color: #ff6b35 !important;
  border-color: #ff6b35 !important;
}

.checkbox-input:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-text {
  font-weight: 500;
  color: #2c3e50;
}

.selected-count {
  color: #6c757d;
  font-size: 14px;
}

.export-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.test-cases-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.test-case-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: all 0.2s ease;
}

.test-case-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
}

.case-checkbox {
  margin-right: 15px;
}

.case-title {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.case-number {
  background-color: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.case-title h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
}

.case-status {
  display: flex;
  align-items: center;
  gap: 15px;
}

.expand-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6c757d;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.expand-btn:hover {
  color: #ff6b35;
}

.case-details {
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.case-description,
.case-preconditions {
  margin-bottom: 20px;
}

.case-steps h5 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.case-description p,
.case-preconditions p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

.steps-table {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.table-header > div {
  padding: 12px;
  border-right: 1px solid #e9ecef;
}

.table-header > div:last-child {
  border-right: none;
}

.step-row {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  border-top: 1px solid #e9ecef;
}

.step-row > div {
  padding: 12px;
  border-right: 1px solid #e9ecef;
  color: #6c757d;
}

.step-row > div:last-child {
  border-right: none;
}

.step-number {
  font-weight: 600;
  color: #ff6b35;
}

.case-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.empty-state p {
  margin-bottom: 20px;
}

/* Status badge styles removed */

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content form {
  padding: 20px;
}

.steps-container {
  margin-bottom: 15px;
}

.step-input-row {
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 40px;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.step-input-row .step-number {
  text-align: center;
  font-weight: 600;
  color: #3498db;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .header-actions {
    justify-content: stretch;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .case-filters {
    max-width: none;
  }
  
  .case-header {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .case-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .case-status {
    justify-content: space-between;
  }
  
  .step-input-row {
    grid-template-columns: 1fr;
    gap: 5px;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .export-section {
    justify-content: center;
  }
}
</style> 