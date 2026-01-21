/**
 * Map Visualization Module
 * Interactive U.S. map with state-level nexus risk visualization
 */

class MapVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.tooltip = null;
        this.stateEvaluations = {};
    }

    /**
     * Render the U.S. map with state data
     * @param {Array} evaluations - Array of state evaluations
     */
    render(evaluations) {
        if (!this.container) return;

        // Store evaluations for reference
        this.stateEvaluations = {};
        evaluations.forEach(e => {
            this.stateEvaluations[e.stateAbbr] = e;
        });

        // Create heat map grid HTML
        this.container.innerHTML = `
      <div class="map-container">
        <div class="state-heatmap-grid">
          ${this._generateHeatMapGrid()}
        </div>
        <div class="map-tooltip hidden" id="map-tooltip"></div>
        <div class="map-legend">
          <div class="legend-item">
            <span class="legend-color" style="background: var(--color-risk-established);"></span>
            <span>Nexus Established</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: var(--color-risk-imminent);"></span>
            <span>Nexus Imminent</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: var(--color-risk-monitoring);"></span>
            <span>Monitoring</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: var(--color-risk-none);"></span>
            <span>No Nexus</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: rgba(255, 255, 255, 0.1);"></span>
            <span>No Sales Tax</span>
          </div>
        </div>
      </div>
    `;

        this.tooltip = document.getElementById('map-tooltip');
        this._attachEventListeners();
    }

    /**
     * Generate heat map grid with all states
     * @private
     */
    _generateHeatMapGrid() {
        // All US states in alphabetical order
        const allStates = [
            { abbr: 'AL', name: 'Alabama' },
            { abbr: 'AK', name: 'Alaska' },
            { abbr: 'AZ', name: 'Arizona' },
            { abbr: 'AR', name: 'Arkansas' },
            { abbr: 'CA', name: 'California' },
            { abbr: 'CO', name: 'Colorado' },
            { abbr: 'CT', name: 'Connecticut' },
            { abbr: 'DE', name: 'Delaware' },
            { abbr: 'FL', name: 'Florida' },
            { abbr: 'GA', name: 'Georgia' },
            { abbr: 'HI', name: 'Hawaii' },
            { abbr: 'ID', name: 'Idaho' },
            { abbr: 'IL', name: 'Illinois' },
            { abbr: 'IN', name: 'Indiana' },
            { abbr: 'IA', name: 'Iowa' },
            { abbr: 'KS', name: 'Kansas' },
            { abbr: 'KY', name: 'Kentucky' },
            { abbr: 'LA', name: 'Louisiana' },
            { abbr: 'ME', name: 'Maine' },
            { abbr: 'MD', name: 'Maryland' },
            { abbr: 'MA', name: 'Massachusetts' },
            { abbr: 'MI', name: 'Michigan' },
            { abbr: 'MN', name: 'Minnesota' },
            { abbr: 'MS', name: 'Mississippi' },
            { abbr: 'MO', name: 'Missouri' },
            { abbr: 'MT', name: 'Montana' },
            { abbr: 'NE', name: 'Nebraska' },
            { abbr: 'NV', name: 'Nevada' },
            { abbr: 'NH', name: 'New Hampshire' },
            { abbr: 'NJ', name: 'New Jersey' },
            { abbr: 'NM', name: 'New Mexico' },
            { abbr: 'NY', name: 'New York' },
            { abbr: 'NC', name: 'North Carolina' },
            { abbr: 'ND', name: 'North Dakota' },
            { abbr: 'OH', name: 'Ohio' },
            { abbr: 'OK', name: 'Oklahoma' },
            { abbr: 'OR', name: 'Oregon' },
            { abbr: 'PA', name: 'Pennsylvania' },
            { abbr: 'RI', name: 'Rhode Island' },
            { abbr: 'SC', name: 'South Carolina' },
            { abbr: 'SD', name: 'South Dakota' },
            { abbr: 'TN', name: 'Tennessee' },
            { abbr: 'TX', name: 'Texas' },
            { abbr: 'UT', name: 'Utah' },
            { abbr: 'VT', name: 'Vermont' },
            { abbr: 'VA', name: 'Virginia' },
            { abbr: 'WA', name: 'Washington' },
            { abbr: 'WV', name: 'West Virginia' },
            { abbr: 'WI', name: 'Wisconsin' },
            { abbr: 'WY', name: 'Wyoming' },
            { abbr: 'DC', name: 'D.C.' }
        ];

        let html = '';

        allStates.forEach(state => {
            const evaluation = this.stateEvaluations[state.abbr];
            const fillColor = this._getStateColor(evaluation);
            const percentComplete = (evaluation && evaluation.percentComplete !== undefined)
                ? evaluation.percentComplete.toFixed(0)
                : '0';

            html += `
                <div class="state-cell" 
                     data-state="${state.abbr}"
                     style="background: ${fillColor};"
                     title="${state.name}">
                    <div class="state-abbr">${state.abbr}</div>
                    <div class="state-percent">${percentComplete}%</div>
                </div>
            `;
        });

        return html;
    }

    /**
     * Generate SVG paths for all states
     * @private
     */
    _generateStatePaths() {
        const states = this._getStatePathData();
        let svg = '';

        Object.entries(states).forEach(([abbr, pathData]) => {
            const evaluation = this.stateEvaluations[abbr];
            const fillColor = this._getStateColor(evaluation);

            svg += `
        <path
          id="state-${abbr}"
          class="state-path"
          d="${pathData.path}"
          fill="${fillColor}"
          stroke="rgba(255, 255, 255, 0.3)"
          stroke-width="1"
          data-state="${abbr}"
        />
      `;
        });

        return svg;
    }

    /**
     * Get fill color based on risk level
     * @private
     */
    _getStateColor(evaluation) {
        if (!evaluation) return 'rgba(255, 255, 255, 0.05)';

        switch (evaluation.riskLevel) {
            case 'NEXUS_ESTABLISHED':
                return 'var(--color-risk-established)';
            case 'NEXUS_IMMINENT':
                return 'var(--color-risk-imminent)';
            case 'MONITORING':
                return 'var(--color-risk-monitoring)';
            case 'NO_NEXUS':
                return 'var(--color-risk-none)';
            case 'NO_SALES_TAX':
            case 'NONE':
                return 'rgba(255, 255, 255, 0.1)';
            default:
                return 'rgba(255, 255, 255, 0.05)';
        }
    }

    /**
     * Attach event listeners to state cells
     * @private
     */
    _attachEventListeners() {
        const stateCells = this.container.querySelectorAll('.state-cell');

        stateCells.forEach(cell => {
            const stateAbbr = cell.getAttribute('data-state');

            // Hover events
            cell.addEventListener('mouseenter', (e) => this._showTooltip(e, stateAbbr));
            cell.addEventListener('mousemove', (e) => this._moveTooltip(e));
            cell.addEventListener('mouseleave', () => this._hideTooltip());

            // Click event
            cell.addEventListener('click', () => {
                if (window.app) {
                    window.app.showStateDetails(stateAbbr);
                }
            });
        });
    }

    /**
     * Show tooltip on hover
     * @private
     */
    _showTooltip(e, stateAbbr) {
        const evaluation = this.stateEvaluations[stateAbbr];
        if (!evaluation || !this.tooltip) return;

        let content = `<strong>${evaluation.stateName}</strong><br>`;

        if (evaluation.riskLevel === 'NO_SALES_TAX' || evaluation.riskLevel === 'NONE') {
            content += '<span style="color: var(--color-text-muted);">No sales tax</span>';
        } else {
            const riskText = this._getRiskLevelText(evaluation.riskLevel);
            const riskColor = this._getStateColor(evaluation);

            content += `<span style="color: ${riskColor};">${riskText}</span><br>`;
            content += `<span style="font-size: 0.875rem;">${evaluation.percentComplete.toFixed(1)}% to threshold</span>`;
        }

        this.tooltip.innerHTML = content;
        this.tooltip.classList.remove('hidden');
        this._moveTooltip(e);
    }

    /**
     * Move tooltip with cursor
     * @private
     */
    _moveTooltip(e) {
        if (!this.tooltip) return;

        const offset = 15;
        this.tooltip.style.left = (e.pageX + offset) + 'px';
        this.tooltip.style.top = (e.pageY + offset) + 'px';
    }

    /**
     * Hide tooltip
     * @private
     */
    _hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.add('hidden');
        }
    }

    /**
     * Get human-readable risk level text
     * @private
     */
    _getRiskLevelText(riskLevel) {
        const textMap = {
            'NEXUS_ESTABLISHED': 'Nexus Established',
            'NEXUS_IMMINENT': 'Nexus Imminent',
            'MONITORING': 'Monitoring',
            'NO_NEXUS': 'No Nexus'
        };
        return textMap[riskLevel] || riskLevel;
    }

    /**
     * Simplified state path data for U.S. map
     * Using realistic geographic outlines for accurate visualization
     * @private
     */
    _getStatePathData() {
        // Load state paths from external file
        // These are simplified but accurate US state SVG paths
        const paths = {
            AL: { path: 'M775.4,397.5l-1.5,29.4l-1.8,18.8l-28.4-1.5l-0.5-11.5l-13.6-1.3l-6.5-15.9l2.3-14.2l2.7-10.3l18.8,0.5l9.7,2.8L775.4,397.5z' },
            AK: { path: 'M135.4,486.6l3.9-2.4l73.9-40.3l3.9,0l2.8,3.1l-2.2,4.8l-70.8,38.5l-8.5-0.9L135.4,486.6z M235.8,478l3.7-5.5l50.3-2.9l1.1,3.9l-24.1,10.3l-25.2,0.7L235.8,478z' },
            AZ: { path: 'M166.7,316.2l0.4-54.1l48.2-5.4l45.4-5.2l3.1,30.2l3.1,28.8l3.1,30.8l-24.4,2.1l-26.2,2.7L166.7,316.2z' },
            AR: { path: 'M630.2,338.6l0.5-42.6l67.5,1.3l0.3,10.8l17.1,1.3l1.5,26.4l-1,14.5l-67.1,1.3l-12.9-0.5L630.2,338.6z' },
            CA: { path: 'M100.5,185.6l13.5-35.4l37.4-52.3l3.8-0.7l34.7,42.7l30.6,37.7l14.9,18.6l-2.7,3.9l-48.4,5.4l-5.2,55.3l-3.9,54.7l-31.4,2.3l-11.8-35.8l-11.5-35.4l-9.7-29.2L100.5,185.6z' },
            CO: { path: 'M272,253.2l1.3-73.8l96.7-8.3l16.5-1.3l0.8,77.3l-95.2,8.3L272,253.2z' },
            CT: { path: 'M873.7,191.3l22.9-3.1l2.8,9.7l-23.4,3.4L873.7,191.3z' },
            DE: { path: 'M835.3,249.5l3.4-11.8l11.5,1.5l-0.8,15.7l-4.9,8.6l-5.9-1.8L835.3,249.5z' },
            FL: { path: 'M771.5,457.6l8.6,0.8l7.1,13.6l2.1,26.2l-22.4,11.5l-20.6-1.3l-13.9-9.4l-2.8-24.9l19.4-4.2l7.4-9.7L771.5,457.6z M783.7,515.3l3.9,2.8l22.4-2.1l-2.1-15.2l-15.7-4.9L783.7,515.3z' },
            GA: { path: 'M747.3,365.5l18.1,1.8l11.5,0.3l2.1,12.3l1,18.1l-3.4,23.4l-20.1,3.1l-13.6,0.3l-4.4-21.8l-1.3-14.4l4.4-10.5L747.3,365.5z' },
            HI: { path: 'M246.5,503.7l3.4,1.5l15.2-1l2.1,4.4l-6.8,3.6l-7.3,0.3l-5.4-3.1L246.5,503.7z M284.8,498.3l4.4,2.3l6.2-0.5l1.8,4.2l-4.2,2.6l-9.4-0.3L284.8,498.3z' },
            ID: { path: 'M203.4,79.5l22.1-4.7l36.4-8.9l7.1,9.4l1.5,14.4l-3.4,15.7l7.3,14.4l-0.8,12.8l-3.9,9.4l-11.2,0l-6.2-11.2l-12.8-8.9l-15.7,5.2l-19.9-5.9l-11.5-11.2l-1.8-14.4L203.4,79.5z' },
            IL: { path: 'M650.9,261.1l8.3,1.8l25.7-3.1l8.3,5.4l2.3,8.9l-4.2,14.7l3.6,13.9l0.3,22.1l-2.6,13.9l-2.1,11.8l-11.5-0.5l-26.2-1.3l-0.8-42.4L650.9,261.1z' },
            IN: { path: 'M700.3,254.8l25.4-2.6l0.8,9.1l14.4,5.4l5.4,7.6l-0.3,11.2l-4.4,9.7l1.8,13.4l-1.3,16.5l-2.3,12.8l-27.2-1.3l-9.7-1l-2.3-33.5L700.3,254.8z' },
            IA: { path: 'M575.9,216.1l62.9-3.6l2.1,45.4l-8.1-1.8l-0.5,45.4l-55.5-2.1l-3.1-38.5L575.9,216.1z' },
            KS: { path: 'M467.8,293.5l1-65.5l95.2-5.4l0.5,36.4l2.6,38.2l-97.8,4.4L467.8,293.5z' },
            KY: { path: 'M715.7,300.7l76.3-4.7l3.6,5.9l10.8,0.8l1.8,7.1l-1.5,7.3l6.5,9.2l-0.5,8.3l-8.1,2.1l-79.4,4.2l-7.3-12.6l2.3-12.8l-1.8-13.4L715.7,300.7z' },
            LA: { path: 'M608.3,430.9l3.4-34.3l66.8-3.1l1.8,12.6l-5.2,21.6l4.9,13.4l-27.5,6.5l-19.9,0.8l-13.6-7.6L608.3,430.9z' },
            ME: { path: 'M882.3,73.2l9.2-0.5l6.5,9.4l1.3,10.5l-2.1,11.2l4.2,13.4l-1.5,8.6l-10.5-1.3l-5.9-13.6l0.8-11.2l-7.3-7.1l1-14.2L882.3,73.2z' },
            MD: { path: 'M821.7,267.4l4.7-8.3l10.8-0.5l1.3,6.2l7.6,0.8l1.5-7.6l14.7,1.5l0.8,15.2l-4.9,8.6l-13.9-5.4l-9.2,6.2l-5.9-1.8L821.7,267.4z M839.3,253.3l3.4-5.2l4.7,1.8l-2.3,6.5L839.3,253.3z' },
            MA: { path: 'M869.5,158.7l24.9-4.4l2.3,5.2l-0.5,6.5l-21.9,3.6l-3.1-5.4L869.5,158.7z M877.4,173.2l21.1-3.4l3.4,7.1l-22.1,3.9L877.4,173.2z' },
            MI: { path: 'M717.5,188.5l11.2-2.1l8.6,6.5l-1.3,18.1l-3.6,13.6l-10.8,18.1l-5.2-1.5l-3.6-9.7l1.8-11.8l-3.9-11.2l-0.8-12.6L717.5,188.5z M734.5,152.8l20.4-3.4l14.4,7.6l3.9,11.8l-2.6,13.9l5.2,8.9l-1.3,10.5l-19.4,3.1l-21.1-3.4l-11.8,3.9l-11.2-5.9l0.5-14.2l8.1-14.4l11.2-7.6L734.5,152.8z' },
            MN: { path: 'M560.9,119.6l55.5-4.2l0.5,10.5l12.8,1.5l1.3,12.6l-11.8,26.7l-0.8,20.6l-55,2.6l-1.3-36.1L560.9,119.6z' },
            MS: { path: 'M665.3,365.5l0.5-62l18.8,0.8l0.5,11.5l28.4,1.5l1.3,13.9l1.3,14.4l4.4,21.8l-18.1,1.5l-2.1,24.4l-12.6,0.5l-15.2-1.3l-1.5-12.8L665.3,365.5z' },
            MO: { path: 'M587.7,300.9l8.9,0.5l55.5,2.1l0.8,42.4l-64.2,1.8l-1.8-13.1l-10.3-0.8l-2.1-20.9l9.2-3.1L587.7,300.9z' },
            MT: { path: 'M286.3,96.5l99.8-8.1l91.8-8.6l2.3,77.5l-111.3,9.4l-82.1,7.1L286.3,96.5z' },
            NE: { path: 'M467.3,227.5l95.7-5.2l1.3,34.6l-95.2,5.4L467.3,227.5z' },
            NV: { path: 'M143.9,195.1l3.1-53.6l42.4-4.7l9.4,2.3l-14.9-18.6l37.2-47.1l4.9,0.3l0,0l11.8,11.2l19.9,5.9l-1.8,29.2l-7.6,30.6l-5.4,31.1l-2.1,30.6l-26.9,2.6l-25.4,2.3l-31.4,2.3L143.9,195.1z' },
            NH: { path: 'M870.8,130.3l8.9-19.4l10.5,1.5l-0.5,13.9l-4.9,23.4l-11.5-4.7l-1.5-8.1L870.8,130.3z' },
            NJ: { path: 'M844.2,223.6l18.8-2.3l3.4,8.9l-1.8,10.8l-6.5,11.8l-10.8,0.5l-5.4-11.2l-0.5-9.7L844.2,223.6z' },
            NM: { path: 'M271.8,327l0.5-72.8l115.3-9.7l4.2,98.3l-116.1,9.4L271.8,327z' },
            NY: { path: 'M825.4,160.3l29.2-5.4l21.4,2.3l-1.5,8.1l11.5,4.7l4.9,13.9l-3.4,7.6l-21.1,3.4l-1.8-5.2l-27.5,5.2l-6.5-8.3l-8.1,1.3l-20.1-2.1l-10.5-8.9l1.8-11.2l24.1-3.9L825.4,160.3z' },
            NC: { path: 'M795.7,327.7l71.8-4.2l3.4,7.1l20.4,1.8l1.8,6.5l-5.9,5.2l-2.3,13.1l-16.5,3.6l-24.4,1.3l-43.5,1.5l-2.6-10.3l-1.3-16.5l-0.8-8.3L795.7,327.7z' },
            ND: { path: 'M478.1,87.9l91.3-5.2l2.1,64.4l-55.2,4.2l-37.2,2.6l-1-65.2L478.1,87.9z' },
            OH: { path: 'M744.4,243.5l48.6-3.4l7.1,6.5l0.8,8.6l-5.9,9.4l1.3,11.2l-3.6,20.1l-10.8-0.8l-3.6-5.9l-25.7,1.5l-5.4-7.6l-14.4-5.4l-0.8-9.1l11.8-2.3L744.4,243.5z' },
            OK: { path: 'M467.3,343.3l97.8-4.4l56.8-2.3l0.8,41l-65,3.4l-26.9,1.5l-0.5-13.4l-60.7,2.6L467.3,343.3z' },
            OR: { path: 'M125.5,96.5l35.9-7.6l68.6-14.2l1.8,14.4l-4.9-0.3l-37.2,47.1l-30.6-37.7l-34.7-42.7L125.5,96.5z M109.2,123.9l11.8-3.9l18.1,17.8l-1.3,11.5l-21.4,2.6l-8.9-8.9l-2.3-12.8L109.2,123.9z' },
            PA: { path: 'M807.6,218.5l69.6-10.8l4.2,7.8l-18.8,2.3l-2.3,10.5l0.5,9.7l5.4,11.2l-4.7,8.3l-7.6-0.8l-1.3-6.2l-5.9,6.2l-13.9,1.5l-17.1-2.8l-32.2,2.3l-1.8-7.1l-0.8-8.6l20.1,2.1l8.1-1.3L807.6,218.5z' },
            RI: { path: 'M894.9,173.7l4.4-0.8l1.5,6.5l-4.2,7.1l-4.9-1l0.5-6.5L894.9,173.7z' },
            SC: { path: 'M779.6,351l43.5-1.5l1.5,13.1l-3.9,10.8l-9.4,13.1l-19.4,3.9l-11.2-1.5l-2.3-10.5l-1.3-16.5L779.6,351z' },
            SD: { path: 'M467.8,164.5l111.8-9.4l1.3,35.8l-95.7,5.2L467.8,164.5z' },
            TN: { path: 'M690.1,340.1l79.4-4.2l71.8-4.2l1.8,10.3l-2.6,10.3l-66.8,3.4l-75.2,3.9l-8.1-13.6L690.1,340.1z' },
            TX: { path: 'M465.2,371.9l60.7-2.6l65-3.4l1.8,13.1l-3.4,34.3l1.8,13.4l-5.4,28.8l-14.7,18.8l-25.2,0.5l-6.5-16.2l-18.1-1.8l-9.4,8.3l-18.1-5.9l-6.2-14.4l-11.8-4.2l1-34.3l-13.9-2.8l-0.5-21.9l3.1-8.3L465.2,371.9z' },
            UT: { path: 'M215.2,259.3l69.8-6l2.6,59.2l2.6,60.2l-71,5.9l-3.1-30.8l-3.1-28.8l-3.1-30.2L215.2,259.3z' },
            VT: { path: 'M871.5,137.8l-1.5,8.1l-10.5,1.5l-8.9,19.4l-11.8-3.6l1.8-32.2l3.1-19.9l13.1,2.1l10.8,15.2L871.5,137.8z' },
            VA: { path: 'M789.6,277.4l4.2-9.4l27.8-3.4l17.1,2.8l13.9-1.5l5.9-6.2l-10.8-0.5l-4.7-8.3l5.4-11.8l1.8-10.8l24.4,1.8l3.9,9.4l-4.2,7.6l21.1,1.8l-2.3,13.1l-20.4-1.8l-3.4-7.1l-71.8,4.2l-6.5-9.2l1.5-7.3l-0.5,13.1l-1.8,13.9L789.6,277.4z M889.9,239.4l6.2-2.3l3.1,4.2l-5.9,4.2L889.9,239.4z' },
            WA: { path: 'M167.2,54.7l66-13.6l0.3,10.3l-1.5,9.2l-68.6,14.2l-35.9,7.6l-3.8,0.7l-13.5-13.9l8.3-10.3l19.4-4.2l25.7-0.8L167.2,54.7z' },
            WV: { path: 'M782.8,249.5l25.7-1.5l32.2-2.3l13.9,5.4l4.9-8.6l-0.8-15.2l13.6,0l-3.9,9.4l-24.4-1.8l-1.8,6.5l-5.2,11.5l-27.8,3.4l-4.2,9.4l-16.5,1.8l-6.5,5.9l1.3-11.2L782.8,249.5z' },
            WI: { path: 'M642.7,155.1l11.2-1.5l38.5-3.4l0.5,13.9l16.5,4.2l-1.5,15.7l8.6,13.1l-25.4,2.6l-2.1,48.1l-25.7,3.1l-8.3-1.8l-11.5-28.5l-2.1-45.4L642.7,155.1z' },
            WY: { path: 'M304.5,171.6l111.3-9.4l1.8,97.5l-82.1,7.1l-34.1,2.8l-1.3-87.8L304.5,171.6z' },
            DC: { path: 'M830.7,266.9l1.8,1.5l-1.3,2.3l-2.3-0.8l0.8-2.6L830.7,266.9z' }
        };

        return paths;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapVisualization;
}
