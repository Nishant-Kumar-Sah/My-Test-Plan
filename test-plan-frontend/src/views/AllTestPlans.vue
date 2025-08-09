<template>
  <div class="all-test-plans">
    <div class="page-header">
      <h1>All Test Plans</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <span class="icon">➕</span>
        Create New Test Plan
      </button>
    </div>

    <!-- Search and Filter Section -->
    <div class="filters-section">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search test plans..."
          class="form-input"
        />
      </div>
      <div class="filter-buttons">
        <button 
          class="btn btn-secondary" 
          :class="{ active: currentFilter === 'all' }"
          @click="setFilter('all')"
        >
          All
        </button>
        <!-- Recent filter removed -->
        <!-- Favorites filter removed -->
      </div>
    </div>

    <!-- Test Plans Grid -->
    <div class="test-plans-grid" v-if="filteredTestPlans.length > 0">
      <div 
        v-for="plan in filteredTestPlans" 
        :key="plan.id" 
        class="test-plan-card"
        @click="openTestPlan(plan.id)"
      >
        <div class="card-header">
          <h3 class="plan-title">{{ plan.title }}</h3>
          <div class="plan-actions">
            <button class="action-btn" @click.stop="showOptions(plan.id)">
              ⋯
            </button>
          </div>
        </div>
        
        <p class="plan-description">{{ plan.description }}</p>
        
        <div class="plan-meta">
          <div class="meta-item">
            <span class="meta-label">Test Cases:</span>
            <span class="meta-value">{{ plan.testCaseCount }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Created:</span>
            <span class="meta-value">{{ formatDate(plan.createdAt) }}</span>
          </div>
        </div>

        <!-- Tags section removed -->
      </div>
    </div>

    <!-- Empty State -->
    <div class="empty-state" v-else>
      <div class="empty-icon">📋</div>
      <h3>No test plans found</h3>
      <p>Create your first test plan to get started</p>
      <button class="btn btn-primary" @click="showCreateModal = true">
        Create Test Plan
      </button>
    </div>

    <!-- Create Test Plan Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Create New Test Plan</h2>
          <button class="modal-close" @click="showCreateModal = false">×</button>
        </div>
        
        <form @submit.prevent="createTestPlan">
          <div class="form-group">
            <label class="form-label">Title</label>
            <input 
              v-model="newPlan.title" 
              type="text" 
              class="form-input" 
              placeholder="Enter test plan title"
              required
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea 
              v-model="newPlan.description" 
              class="form-input form-textarea" 
              placeholder="Describe your test plan"
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Tags (comma-separated)</label>
            <input 
              v-model="newPlan.tags" 
              type="text" 
              class="form-input" 
              placeholder="e.g., regression, smoke, api"
            />
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Create Test Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllTestPlans',
  data() {
    return {
      searchQuery: '',
      currentFilter: 'all',
      showCreateModal: false,
      newPlan: {
        title: '',
        description: '',
        tags: ''
      },
      // Sample data - replace with API calls later
      testPlans: [
        {
          id: 1,
          title: 'User Authentication Flow',
          description: 'Comprehensive test plan for user login, registration, and password reset functionality.',
          testCaseCount: 15,
          createdAt: '2024-01-15',
          status: 'active',
          tags: ['authentication', 'regression', 'critical'],
          isFavorite: true
        },
        {
          id: 2,
          title: 'E-commerce Checkout Process',
          description: 'End-to-end testing of the shopping cart and payment processing workflow.',
          testCaseCount: 23,
          createdAt: '2024-01-10',
          status: 'draft',
          tags: ['checkout', 'payment', 'e-commerce'],
          isFavorite: false
        },
        {
          id: 3,
          title: 'Mobile App Navigation',
          description: 'Testing navigation patterns and user flow in the mobile application.',
          testCaseCount: 8,
          createdAt: '2024-01-08',
          status: 'completed',
          tags: ['mobile', 'navigation', 'ui'],
          isFavorite: true
        },
        {
          id: 4,
          title: 'API Integration Tests',
          description: 'Testing all external API integrations and data synchronization.',
          testCaseCount: 12,
          createdAt: '2024-01-05',
          status: 'active',
          tags: ['api', 'integration', 'backend'],
          isFavorite: false
        }
      ]
    }
  },
  computed: {
    filteredTestPlans() {
      let filtered = this.testPlans

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(plan => 
          plan.title.toLowerCase().includes(query) ||
          plan.description.toLowerCase().includes(query) ||
          plan.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      // Filter logic simplified - only All filter remains

      return filtered
    }
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter
    },
    openTestPlan(planId) {
      // Navigate to test plan detail page
      this.$router.push(`/test-plan/${planId}`)
    },
    // toggleFavorite method removed
    showOptions(planId) {
      // Show dropdown menu with edit/delete options
      console.log('Show options for plan:', planId)
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    createTestPlan() {
      const tags = this.newPlan.tags ? this.newPlan.tags.split(',').map(tag => tag.trim()) : []
      
      const newPlan = {
        id: Date.now(), // Simple ID generation
        title: this.newPlan.title,
        description: this.newPlan.description,
        testCaseCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'draft',
        tags: tags,
        isFavorite: false
      }
      
      this.testPlans.unshift(newPlan)
      this.showCreateModal = false
      this.newPlan = { title: '', description: '', tags: '' }
    }
  }
}
</script>

<style scoped>
.all-test-plans {
  padding: 20px 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
}

.page-header .btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons .btn {
  padding: 8px 16px;
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.filter-buttons .btn.active {
  background-color: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

.test-plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(900px, 1fr));
  gap: 24px;
}

.test-plan-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e9ecef;
}

.test-plan-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.plan-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
}

.plan-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6c757d;
  transition: color 0.2s ease;
}

.action-btn:hover {
  color: #ff6b35;
}

.plan-description {
  color: #6c757d;
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.plan-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-label {
  color: #6c757d;
  font-size: 14px;
}

.meta-value {
  font-weight: 500;
  color: #2c3e50;
}

/* Status badge styles removed */

/* Tags styles removed */

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

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .test-plans-grid {
    grid-template-columns: 1fr;
  }
}
</style> 