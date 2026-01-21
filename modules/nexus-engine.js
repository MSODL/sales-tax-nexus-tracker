/**
 * Nexus Evaluation Engine
 * Calculates economic nexus status for all states based on user input
 */

class NexusEngine {
    constructor(stateData) {
        this.stateData = stateData;
    }

    /**
     * Evaluate nexus for a single state
     * @param {string} stateAbbr - State abbreviation (e.g., 'CA')
     * @param {Object} salesData - Sales data for the state
     * @param {number} salesData.revenue - Total revenue (direct + marketplace if applicable)
     * @param {number} salesData.transactions - Total transaction count
     * @param {number} salesData.directRevenue - Direct sales revenue
     * @param {number} salesData.directTransactions - Direct transactions
     * @param {number} salesData.marketplaceRevenue - Marketplace sales revenue
     * @param {number} salesData.marketplaceTransactions - Marketplace transactions
     * @returns {Object} Nexus evaluation result
     */
    evaluateState(stateAbbr, salesData) {
        const state = this.stateData[stateAbbr];

        if (!state) {
            return {
                error: `State ${stateAbbr} not found`,
                status: 'UNKNOWN'
            };
        }

        // States without sales tax have no nexus obligations
        if (!state.hasSalesTax) {
            return {
                stateAbbr,
                stateName: state.name,
                status: 'NO_SALES_TAX',
                hasNexus: false,
                riskLevel: 'NONE',
                message: `${state.name} does not have a sales tax`,
                details: state.notes
            };
        }

        // Calculate applicable sales based on marketplace exclusion rules
        let applicableRevenue = salesData.directRevenue || 0;
        let applicableTransactions = salesData.directTransactions || 0;

        if (!state.excludeMarketplaceSales) {
            applicableRevenue += (salesData.marketplaceRevenue || 0);
            applicableTransactions += (salesData.marketplaceTransactions || 0);
        }

        // Evaluate thresholds
        const evaluation = this._evaluateThresholds(
            state,
            applicableRevenue,
            applicableTransactions
        );

        return {
            stateAbbr,
            stateName: state.name,
            ...evaluation,
            thresholdDetails: {
                revenueThreshold: state.revenueThreshold,
                transactionThreshold: state.transactionThreshold,
                thresholdType: state.thresholdType,
                applicableRevenue,
                applicableTransactions,
                excludeMarketplaceSales: state.excludeMarketplaceSales
            },
            complianceInfo: {
                registrationUrl: state.registrationUrl,
                filingFrequency: state.filingFrequency,
                registrationTiming: state.registrationTiming,
                notes: state.notes
            }
        };
    }

    /**
     * Evaluate all states
     * @param {Object} salesByState - Object with state abbreviations as keys and sales data as values
     * @returns {Array} Array of evaluation results
     */
    evaluateAllStates(salesByState) {
        const results = [];

        // Evaluate all states
        for (const [stateAbbr, salesData] of Object.entries(salesByState)) {
            if (salesData.directRevenue > 0 || salesData.marketplaceRevenue > 0) {
                results.push(this.evaluateState(stateAbbr, salesData));
            }
        }

        // Add states with no sales for completeness (optional)
        for (const stateAbbr of Object.keys(this.stateData)) {
            if (!salesByState[stateAbbr]) {
                results.push(this.evaluateState(stateAbbr, {
                    directRevenue: 0,
                    directTransactions: 0,
                    marketplaceRevenue: 0,
                    marketplaceTransactions: 0
                }));
            }
        }

        return results.sort((a, b) => {
            // Sort by risk level (highest first), then by state name
            const riskOrder = { 'NEXUS_ESTABLISHED': 1, 'NEXUS_IMMINENT': 2, 'MONITORING': 3, 'NO_NEXUS': 4, 'NO_SALES_TAX': 5, 'NONE': 6 };
            if (riskOrder[a.riskLevel] !== riskOrder[b.riskLevel]) {
                return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
            }
            return a.stateName.localeCompare(b.stateName);
        });
    }

    /**
     * Internal method to evaluate thresholds
     * @private
     */
    _evaluateThresholds(state, revenue, transactions) {
        const { revenueThreshold, transactionThreshold, thresholdType } = state;

        // Check revenue threshold
        const revenuePercent = revenueThreshold ? (revenue / revenueThreshold) * 100 : 0;
        const revenueExceeded = revenueThreshold && revenue >= revenueThreshold;

        // Check transaction threshold
        const transactionPercent = transactionThreshold ? (transactions / transactionThreshold) * 100 : 0;
        const transactionExceeded = transactionThreshold && transactions >= transactionThreshold;

        let hasNexus = false;
        let riskLevel = 'NO_NEXUS';
        let message = '';
        let percentComplete = 0;
        let triggeredBy = null;

        switch (thresholdType) {
            case 'REVENUE_ONLY':
                percentComplete = revenuePercent;
                hasNexus = revenueExceeded;
                triggeredBy = revenueExceeded ? 'revenue' : null;
                break;

            case 'TRANSACTION_ONLY':
                percentComplete = transactionPercent;
                hasNexus = transactionExceeded;
                triggeredBy = transactionExceeded ? 'transactions' : null;
                break;

            case 'EITHER':
                percentComplete = Math.max(revenuePercent, transactionPercent);
                hasNexus = revenueExceeded || transactionExceeded;
                if (revenueExceeded && transactionExceeded) {
                    triggeredBy = 'both';
                } else if (revenueExceeded) {
                    triggeredBy = 'revenue';
                } else if (transactionExceeded) {
                    triggeredBy = 'transactions';
                }
                break;

            case 'BOTH':
                percentComplete = Math.min(revenuePercent, transactionPercent);
                hasNexus = revenueExceeded && transactionExceeded;
                triggeredBy = hasNexus ? 'both' : null;
                break;

            default:
                break;
        }

        // Determine risk level based on percentage
        if (hasNexus) {
            riskLevel = 'NEXUS_ESTABLISHED';
            message = `Economic nexus has been established in ${state.name}`;
        } else if (percentComplete >= 90) {
            riskLevel = 'NEXUS_IMMINENT';
            message = `Warning: Approaching nexus threshold in ${state.name} (${percentComplete.toFixed(1)}%)`;
        } else if (percentComplete >= 70) {
            riskLevel = 'MONITORING';
            message = `Monitor sales in ${state.name} (${percentComplete.toFixed(1)}% of threshold)`;
        } else {
            riskLevel = 'NO_NEXUS';
            message = `No nexus concerns in ${state.name} (${percentComplete.toFixed(1)}% of threshold)`;
        }

        return {
            hasNexus,
            riskLevel,
            message,
            percentComplete: Math.min(percentComplete, 100),
            triggeredBy,
            revenuePercent,
            transactionPercent
        };
    }

    /**
     * Get summary statistics
     * @param {Array} evaluations - Array of evaluation results
     * @returns {Object} Summary statistics
     */
    getSummary(evaluations) {
        const summary = {
            totalStates: evaluations.length,
            nexusEstablished: 0,
            nexusImminent: 0,
            monitoring: 0,
            noNexus: 0,
            noSalesTax: 0,
            statesRequiringAction: []
        };

        evaluations.forEach(evaluation => {
            switch (evaluation.riskLevel) {
                case 'NEXUS_ESTABLISHED':
                    summary.nexusEstablished++;
                    summary.statesRequiringAction.push(evaluation.stateAbbr);
                    break;
                case 'NEXUS_IMMINENT':
                    summary.nexusImminent++;
                    summary.statesRequiringAction.push(evaluation.stateAbbr);
                    break;
                case 'MONITORING':
                    summary.monitoring++;
                    break;
                case 'NO_NEXUS':
                    summary.noNexus++;
                    break;
                case 'NO_SALES_TAX':
                case 'NONE':
                    summary.noSalesTax++;
                    break;
            }
        });

        return summary;
    }

    /**
     * Scenario modeling: What if sales increase by X%
     * @param {Object} salesByState - Current sales data
     * @param {number} increasePercent - Percentage increase (e.g., 20 for 20%)
     * @returns {Object} Comparison of current vs projected
     */
    modelScenario(salesByState, increasePercent) {
        const currentEvaluations = this.evaluateAllStates(salesByState);

        // Create projected sales data
        const projectedSales = {};
        for (const [state, data] of Object.entries(salesByState)) {
            projectedSales[state] = {
                directRevenue: data.directRevenue * (1 + increasePercent / 100),
                directTransactions: Math.round(data.directTransactions * (1 + increasePercent / 100)),
                marketplaceRevenue: data.marketplaceRevenue * (1 + increasePercent / 100),
                marketplaceTransactions: Math.round(data.marketplaceTransactions * (1 + increasePercent / 100))
            };
        }

        const projectedEvaluations = this.evaluateAllStates(projectedSales);

        return {
            increasePercent,
            current: {
                evaluations: currentEvaluations,
                summary: this.getSummary(currentEvaluations)
            },
            projected: {
                evaluations: projectedEvaluations,
                summary: this.getSummary(projectedEvaluations)
            },
            newNexusStates: projectedEvaluations
                .filter(proj => {
                    const curr = currentEvaluations.find(c => c.stateAbbr === proj.stateAbbr);
                    return !curr.hasNexus && proj.hasNexus;
                })
                .map(e => e.stateAbbr)
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusEngine;
}
