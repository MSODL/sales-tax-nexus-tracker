/**
 * Main Application Controller
 * Sales Tax Nexus Threshold Tracking App
 */

class NexusTrackerApp {
  constructor() {
    this.engine = new NexusEngine(STATE_NEXUS_DATA);
    this.salesData = {};
    this.evaluations = [];
    this.userInputs = {};
    this.mapViz = new MapVisualization('nexus-map');

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.renderStateInputs();
    this.calculateAndRender();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.target.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Form submission
    const form = document.getElementById('input-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.collectFormData();
        this.calculateAndRender();
        this.saveToStorage();
        this.switchView('dashboard');
      });
    }

    // Modal close on overlay click
    document.getElementById('state-modal').addEventListener('click', (e) => {
      if (e.target.id === 'state-modal') {
        this.closeModal();
      }
    });
  }

  /**
   * Switch between views
   */
  switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    // Remove active from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Show selected view
    const viewElement = document.getElementById(`view-${viewName}`);
    if (viewElement) {
      viewElement.classList.remove('hidden');
    }

    // Activate selected tab
    const tabElement = document.querySelector(`[data-view="${viewName}"]`);
    if (tabElement) {
      tabElement.classList.add('active');
    }
  }

  /**
   * Render state input fields
   */
  renderStateInputs() {
    const container = document.getElementById('state-inputs-container');
    if (!container) return;

    const states = Object.entries(STATE_NEXUS_DATA).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    );

    let html = '<div class="grid grid-cols-1" style="gap: var(--spacing-md);">';

    states.forEach(([abbr, state]) => {
      const savedData = this.salesData[abbr] || {
        directRevenue: 0,
        directTransactions: 0,
        marketplaceRevenue: 0,
        marketplaceTransactions: 0
      };

      html += `
        <div class="glass-card" style="padding: var(--spacing-md);">
          <h4 style="margin-bottom: var(--spacing-sm);">${state.name} (${abbr})</h4>
          ${!state.hasSalesTax ? '<p style="color: var(--color-text-muted); font-size: 0.875rem;">No state sales tax</p>' : ''}
          
          <div class="grid grid-cols-2" style="gap: var(--spacing-md);">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.875rem;">Direct Sales Revenue ($)</label>
              <input 
                type="number" 
                class="form-input" 
                id="revenue-${abbr}" 
                value="${savedData.directRevenue}"
                min="0" 
                step="0.01"
                ${!state.hasSalesTax ? 'disabled' : ''}
              >
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.875rem;">Direct Transactions (#)</label>
              <input 
                type="number" 
                class="form-input" 
                id="transactions-${abbr}" 
                value="${savedData.directTransactions}"
                min="0" 
                step="1"
                ${!state.hasSalesTax ? 'disabled' : ''}
              >
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.875rem;">Marketplace Revenue ($)</label>
              <input 
                type="number" 
                class="form-input" 
                id="marketplace-revenue-${abbr}" 
                value="${savedData.marketplaceRevenue}"
                min="0" 
                step="0.01"
                ${!state.hasSalesTax ? 'disabled' : ''}
              >
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.875rem;">Marketplace Transactions (#)</label>
              <input 
                type="number" 
                class="form-input" 
                id="marketplace-transactions-${abbr}" 
                value="${savedData.marketplaceTransactions}"
                min="0" 
                step="1"
                ${!state.hasSalesTax ? 'disabled' : ''}
              >
            </div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * Collect form data
   */
  collectFormData() {
    // Collect user inputs
    this.userInputs.companyName = document.getElementById('company-name')?.value || '';
    this.userInputs.measurementPeriod = document.getElementById('measurement-period')?.value || 'rolling_12';

    // Collect state data
    this.salesData = {};

    Object.keys(STATE_NEXUS_DATA).forEach(abbr => {
      const directRevenue = parseFloat(document.getElementById(`revenue-${abbr}`)?.value || 0);
      const directTransactions = parseInt(document.getElementById(`transactions-${abbr}`)?.value || 0);
      const marketplaceRevenue = parseFloat(document.getElementById(`marketplace-revenue-${abbr}`)?.value || 0);
      const marketplaceTransactions = parseInt(document.getElementById(`marketplace-transactions-${abbr}`)?.value || 0);

      if (directRevenue > 0 || directTransactions > 0 || marketplaceRevenue > 0 || marketplaceTransactions > 0) {
        this.salesData[abbr] = {
          directRevenue,
          directTransactions,
          marketplaceRevenue,
          marketplaceTransactions
        };
      }
    });
  }

  /**
   * Calculate nexus and render results
   */
  calculateAndRender() {
    // Calculate evaluations
    this.evaluations = this.engine.evaluateAllStates(this.salesData);

    // Update stats
    this.updateStats();

    // Render map
    this.mapViz.render(this.evaluations);

    // Render table
    this.renderTable();
  }

  /**
   * Update summary statistics
   */
  updateStats() {
    const summary = this.engine.getSummary(this.evaluations);

    document.getElementById('stat-nexus-established').textContent = summary.nexusEstablished;
    document.getElementById('stat-nexus-imminent').textContent = summary.nexusImminent;
    document.getElementById('stat-monitoring').textContent = summary.monitoring;
    document.getElementById('stat-no-nexus').textContent = summary.noNexus;
  }

  /**
   * Render states table
   */
  renderTable() {
    const tbody = document.getElementById('states-table-body');
    if (!tbody) return;

    // Filter to only show states with sales or nexus
    const relevantStates = this.evaluations.filter(e =>
      e.hasNexus ||
      e.riskLevel === 'NEXUS_IMMINENT' ||
      e.riskLevel === 'MONITORING' ||
      (e.thresholdDetails && e.thresholdDetails.applicableRevenue > 0)
    );

    if (relevantStates.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: var(--spacing-2xl);">
            <p style="color: var(--color-text-muted);">Enter your sales data to begin analysis</p>
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    relevantStates.forEach(evaluation => {
      const details = evaluation.thresholdDetails;
      if (!details) return;

      html += `
        <tr>
          <td><strong>${evaluation.stateName}</strong></td>
          <td>${this.renderRiskBadge(evaluation.riskLevel)}</td>
          <td>$${(details.applicableRevenue || 0).toLocaleString()}</td>
          <td>${details.revenueThreshold ? '$' + details.revenueThreshold.toLocaleString() : 'N/A'}</td>
          <td>${(details.applicableTransactions || 0).toLocaleString()}</td>
          <td>${details.transactionThreshold ? details.transactionThreshold.toLocaleString() : 'N/A'}</td>
          <td>
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
              <div class="progress-container" style="flex: 1;">
                <div class="progress-bar" style="width: ${evaluation.percentComplete}%; background: ${this.getProgressColor(evaluation.riskLevel)};"></div>
              </div>
              <span style="font-size: 0.875rem; min-width: 50px;">${evaluation.percentComplete.toFixed(1)}%</span>
            </div>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.showStateDetails('${evaluation.stateAbbr}')">
              View Details
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  /**
   * Render risk badge
   */
  renderRiskBadge(riskLevel) {
    const levelMap = {
      'NEXUS_ESTABLISHED': { text: 'Nexus', class: 'risk-badge-nexus-established' },
      'NEXUS_IMMINENT': { text: 'Imminent', class: 'risk-badge-nexus-imminent' },
      'MONITORING': { text: 'Monitor', class: 'risk-badge-monitoring' },
      'NO_NEXUS': { text: 'No Nexus', class: 'risk-badge-no-nexus' },
      'NO_SALES_TAX': { text: 'No Tax', class: 'risk-badge-no-sales-tax' }
    };

    const level = levelMap[riskLevel] || { text: riskLevel, class: 'risk-badge-no-nexus' };
    return `<span class="risk-badge ${level.class}">${level.text}</span>`;
  }

  /**
   * Get progress bar color based on risk level
   */
  getProgressColor(riskLevel) {
    const colorMap = {
      'NEXUS_ESTABLISHED': 'linear-gradient(90deg, var(--color-risk-established), hsl(0, 85%, 50%))',
      'NEXUS_IMMINENT': 'linear-gradient(90deg, var(--color-risk-imminent), hsl(45, 95%, 45%))',
      'MONITORING': 'linear-gradient(90deg, var(--color-risk-monitoring), hsl(200, 85%, 45%))',
      'NO_NEXUS': 'linear-gradient(90deg, var(--color-risk-none), hsl(145, 70%, 40%))'
    };

    return colorMap[riskLevel] || colorMap['NO_NEXUS'];
  }

  /**
   * Show state details modal
   */
  showStateDetails(stateAbbr) {
    const evaluation = this.evaluations.find(e => e.stateAbbr === stateAbbr);
    if (!evaluation) return;

    const modal = document.getElementById('state-modal');
    const title = document.getElementById('modal-state-name');
    const body = document.getElementById('modal-body');

    title.textContent = evaluation.stateName;

    // Generate modal content
    let html = `
      <div class="alert ${this.getAlertClass(evaluation.riskLevel)}">
        <div>
          <strong>${evaluation.message}</strong>
        </div>
      </div>

      <h4>AI-Generated Explanation</h4>
      <div style="background: rgba(255, 255, 255, 0.05); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">
        ${this.formatMarkdown(AIExplainer.explainNexusTrigger(evaluation))}
      </div>

      <h4>Threshold Details</h4>
      <table class="data-table" style="margin-bottom: var(--spacing-lg);">
        <tr>
          <td><strong>Revenue Threshold</strong></td>
          <td>${evaluation.thresholdDetails.revenueThreshold ? '$' + evaluation.thresholdDetails.revenueThreshold.toLocaleString() : 'N/A'}</td>
        </tr>
        <tr>
          <td><strong>Transaction Threshold</strong></td>
          <td>${evaluation.thresholdDetails.transactionThreshold ? evaluation.thresholdDetails.transactionThreshold.toLocaleString() : 'N/A'}</td>
        </tr>
        <tr>
          <td><strong>Your Revenue</strong></td>
          <td>$${(evaluation.thresholdDetails.applicableRevenue || 0).toLocaleString()}</td>
        </tr>
        <tr>
          <td><strong>Your Transactions</strong></td>
          <td>${(evaluation.thresholdDetails.applicableTransactions || 0).toLocaleString()}</td>
        </tr>
      </table>

      <h4>Recommendations</h4>
      <ul style="margin-left: var(--spacing-lg); color: var(--color-text-secondary);">
        ${AIExplainer.getRecommendations(evaluation).map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    `;

    if (evaluation.hasNexus) {
      const timeline = AIExplainer.getComplianceTimeline(evaluation);
      html += `
        <h4 style="margin-top: var(--spacing-lg);">Compliance Timeline</h4>
      `;
      timeline.forEach(phase => {
        html += `
          <div style="margin-bottom: var(--spacing-md);">
            <strong style="color: var(--color-primary);">${phase.phase}</strong>
            <ul style="margin-left: var(--spacing-lg); margin-top: var(--spacing-xs); color: var(--color-text-secondary);">
              ${phase.actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        `;
      });
    }

    if (evaluation.complianceInfo?.registrationUrl) {
      html += `
        <h4 style="margin-top: var(--spacing-lg);">Registration Information</h4>
        <p>
          <a href="${evaluation.complianceInfo.registrationUrl}" target="_blank" class="btn btn-primary" style="display: inline-flex;">
            Register in ${evaluation.stateName} →
          </a>
        </p>
      `;
    }

    body.innerHTML = html;
    modal.classList.add('active');
  }

  /**
   * Close modal
   */
  closeModal() {
    document.getElementById('state-modal').classList.remove('active');
  }

  /**
   * Get alert class for risk level
   */
  getAlertClass(riskLevel) {
    const classMap = {
      'NEXUS_ESTABLISHED': 'alert-danger',
      'NEXUS_IMMINENT': 'alert-warning',
      'MONITORING': 'alert-info',
      'NO_NEXUS': 'alert-success'
    };
    return classMap[riskLevel] || 'alert-info';
  }

  /**
   * Format markdown-style text to HTML
   */
  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/, '<p>$1</p>');
  }

  /**
   * Run scenario modeling
   */
  runScenario() {
    const growthPercent = parseFloat(document.getElementById('growth-percentage')?.value || 0);

    if (Object.keys(this.salesData).length === 0) {
      alert('Please enter sales data first before running scenarios.');
      this.switchView('input');
      return;
    }

    const scenario = this.engine.modelScenario(this.salesData, growthPercent);
    const resultsDiv = document.getElementById('scenario-results');

    let html = `
      <div class="glass-card">
        <h3>Scenario Results: ${growthPercent > 0 ? '+' : ''}${growthPercent}% Change</h3>
        
        <div class="grid grid-cols-2 mt-lg">
          <div>
            <h4>Current Status</h4>
            <p><strong>States with Nexus:</strong> ${scenario.current.summary.nexusEstablished}</p>
            <p><strong>Imminent:</strong> ${scenario.current.summary.nexusImminent}</p>
            <p><strong>Monitoring:</strong> ${scenario.current.summary.monitoring}</p>
          </div>
          <div>
            <h4>Projected Status</h4>
            <p><strong>States with Nexus:</strong> ${scenario.projected.summary.nexusEstablished}</p>
            <p><strong>Imminent:</strong> ${scenario.projected.summary.nexusImminent}</p>
            <p><strong>Monitoring:</strong> ${scenario.projected.summary.monitoring}</p>
          </div>
        </div>

        <div class="mt-lg">
          ${this.formatMarkdown(AIExplainer.explainScenario(scenario))}
        </div>
      </div>
    `;

    resultsDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
  }

  /**
   * Export to CSV
   */
  exportCSV() {
    if (this.evaluations.length === 0) {
      alert('No data to export. Please enter sales data first.');
      return;
    }
    ExportHandler.downloadCSV(this.evaluations, this.userInputs);
  }

  /**
   * Export to Excel
   */
  async exportExcel() {
    if (this.evaluations.length === 0) {
      alert('No data to export. Please enter sales data first.');
      return;
    }
    await ExportHandler.downloadExcel(this.evaluations, this.userInputs);
  }

  /**
   * Export to PDF
   */
  async exportPDF() {
    if (this.evaluations.length === 0) {
      alert('No data to export. Please enter sales data first.');
      return;
    }
    await ExportHandler.downloadPDF(this.evaluations, this.userInputs);
  }

  /**
   * Add sample data for demonstration
   */
  addSampleData() {
    const sampleStates = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

    sampleStates.forEach(abbr => {
      const state = STATE_NEXUS_DATA[abbr];
      if (!state || !state.hasSalesTax) return;

      // Generate random sales data
      const directRevenue = Math.random() * 150000;
      const directTransactions = Math.floor(Math.random() * 300);
      const marketplaceRevenue = Math.random() * 50000;
      const marketplaceTransactions = Math.floor(Math.random() * 100);

      this.salesData[abbr] = {
        directRevenue,
        directTransactions,
        marketplaceRevenue,
        marketplaceTransactions
      };

      // Update form fields
      const revenueInput = document.getElementById(`revenue-${abbr}`);
      const transactionsInput = document.getElementById(`transactions-${abbr}`);
      const marketplaceRevenueInput = document.getElementById(`marketplace-revenue-${abbr}`);
      const marketplaceTransactionsInput = document.getElementById(`marketplace-transactions-${abbr}`);

      if (revenueInput) revenueInput.value = directRevenue.toFixed(2);
      if (transactionsInput) transactionsInput.value = directTransactions;
      if (marketplaceRevenueInput) marketplaceRevenueInput.value = marketplaceRevenue.toFixed(2);
      if (marketplaceTransactionsInput) marketplaceTransactionsInput.value = marketplaceTransactions;
    });

    const companyInput = document.getElementById('company-name');
    if (companyInput && !companyInput.value) {
      companyInput.value = 'Sample Company, Inc.';
    }

    alert('Sample data added! Click "Calculate Nexus" to see the analysis.');
  }

  /**
   * Clear all data
   */
  clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      this.salesData = {};
      this.userInputs = {};
      this.evaluations = [];

      localStorage.removeItem('nexus-tracker-sales-data');
      localStorage.removeItem('nexus-tracker-user-inputs');

      this.renderStateInputs();
      this.calculateAndRender();

      alert('All data cleared.');
    }
  }

  /**
   * Bulk import from CSV
   */
  bulkImport() {
    alert('CSV import feature coming soon! For now, use manual entry or sample data.');
    // TODO: Implement CSV upload and parsing
  }

  /**
   * Save data to localStorage
   */
  saveToStorage() {
    try {
      localStorage.setItem('nexus-tracker-sales-data', JSON.stringify(this.salesData));
      localStorage.setItem('nexus-tracker-user-inputs', JSON.stringify(this.userInputs));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  /**
   * Load data from localStorage
   */
  loadFromStorage() {
    try {
      const savedSalesData = localStorage.getItem('nexus-tracker-sales-data');
      const savedUserInputs = localStorage.getItem('nexus-tracker-user-inputs');

      if (savedSalesData) {
        this.salesData = JSON.parse(savedSalesData);
      }

      if (savedUserInputs) {
        this.userInputs = JSON.parse(savedUserInputs);

        // Populate form fields
        const companyInput = document.getElementById('company-name');
        const periodInput = document.getElementById('measurement-period');

        if (companyInput && this.userInputs.companyName) {
          companyInput.value = this.userInputs.companyName;
        }

        if (periodInput && this.userInputs.measurementPeriod) {
          periodInput.value = this.userInputs.measurementPeriod;
        }
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
  }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new NexusTrackerApp();
  window.app = app; // Make globally accessible for map
});
