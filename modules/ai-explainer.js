/**
 * AI Explainer Module
 * Generates natural language explanations for nexus triggers and provides recommendations
 */

class AIExplainer {
    /**
     * Generate explanation for why nexus was triggered
     * @param {Object} evaluation - State evaluation result from NexusEngine
     * @returns {string} Human-readable explanation
     */
    static explainNexusTrigger(evaluation) {
        if (!evaluation.hasNexus) {
            return this._explainNoNexus(evaluation);
        }

        const { stateName, triggeredBy, thresholdDetails, percentComplete } = evaluation;
        const { revenueThreshold, transactionThreshold, thresholdType, applicableRevenue, applicableTransactions } = thresholdDetails;

        let explanation = `**Economic nexus has been established in ${stateName}.**\n\n`;

        // Explain what triggered it
        if (triggeredBy === 'revenue') {
            explanation += `Your sales of **$${applicableRevenue.toLocaleString()}** have exceeded the revenue threshold of **$${revenueThreshold.toLocaleString()}**. `;
            explanation += `This means ${stateName} requires you to register for sales tax collection and remittance.\n\n`;
        } else if (triggeredBy === 'transactions') {
            explanation += `Your **${applicableTransactions.toLocaleString()} transactions** have exceeded the transaction count threshold of **${transactionThreshold.toLocaleString()}**. `;
            explanation += `This means ${stateName} requires you to register for sales tax collection and remittance.\n\n`;
        } else if (triggeredBy === 'both') {
            explanation += `You've exceeded **both** the revenue threshold ($${revenueThreshold.toLocaleString()}) with $${applicableRevenue.toLocaleString()} in sales, `;
            explanation += `and the transaction threshold (${transactionThreshold.toLocaleString()}) with ${applicableTransactions.toLocaleString()} transactions.\n\n`;
        }

        // Explain what marketplace sales mean
        if (thresholdDetails.excludeMarketplaceSales) {
            explanation += `📝 **Note:** ${stateName} excludes marketplace-facilitated sales from the threshold calculation. Only your direct sales are counted.\n\n`;
        } else {
            explanation += `📝 **Note:** ${stateName} includes both direct and marketplace sales in the threshold calculation.\n\n`;
        }

        // Add compliance context
        explanation += `**What this means for you:**\n`;
        explanation += `- You must register for a sales tax permit\n`;
        explanation += `- You must collect sales tax on taxable sales to ${stateName} customers\n`;
        explanation += `- You must file regular sales tax returns\n`;
        explanation += `- Consider contacting a tax advisor to ensure proper compliance\n`;

        return explanation;
    }

    /**
     * Explain when nexus has not been triggered
     * @private
     */
    static _explainNoNexus(evaluation) {
        const { stateName, riskLevel, percentComplete, thresholdDetails } = evaluation;

        if (evaluation.status === 'NO_SALES_TAX') {
            return `${stateName} does not have a statewide sales tax. You do not need to register or collect sales tax for this state.`;
        }

        let explanation = '';

        if (riskLevel === 'NEXUS_IMMINENT') {
            explanation += `⚠️ **Warning: You are very close to establishing nexus in ${stateName}.**\n\n`;
            explanation += `You are currently at **${percentComplete.toFixed(1)}%** of the threshold. `;
            explanation += `Consider taking proactive steps:\n`;
            explanation += `- Monitor your sales closely in this state\n`;
            explanation += `- Consider voluntarily registering to avoid back-filing risks\n`;
            explanation += `- Prepare for registration requirements in the near future\n`;
        } else if (riskLevel === 'MONITORING') {
            explanation += `📊 **Monitoring Required:** Your sales in ${stateName} are approaching the nexus threshold.\n\n`;
            explanation += `You are currently at **${percentComplete.toFixed(1)}%** of the threshold. `;
            explanation += `Keep tracking your sales to avoid unexpected nexus obligations.\n`;
        } else {
            explanation += `✅ **No nexus concerns in ${stateName}** at this time.\n\n`;
            explanation += `You are at **${percentComplete.toFixed(1)}%** of the threshold. Continue monitoring your sales activity.\n`;
        }

        return explanation;
    }

    /**
     * Generate recommendations based on risk level
     * @param {Object} evaluation - State evaluation result
     * @returns {Array} Array of recommendation strings
     */
    static getRecommendations(evaluation) {
        const recommendations = [];
        const { riskLevel, hasNexus, stateName } = evaluation;

        if (hasNexus) {
            recommendations.push(`Register for a sales tax permit in ${stateName} immediately`);
            recommendations.push(`Begin collecting sales tax on all taxable sales to ${stateName} customers`);
            recommendations.push(`Set up a filing calendar for ${stateName} returns`);
            recommendations.push(`Consider voluntary disclosure for any past uncollected tax if applicable`);
            recommendations.push(`Consult with a tax professional about retroactive obligations`);
        } else if (riskLevel === 'NEXUS_IMMINENT') {
            recommendations.push(`Closely monitor sales to ${stateName} on a weekly or monthly basis`);
            recommendations.push(`Prepare registration materials in advance`);
            recommendations.push(`Consider conservative early registration to avoid back-filing`);
            recommendations.push(`Review your sales forecast for the next 6-12 months`);
        } else if (riskLevel === 'MONITORING') {
            recommendations.push(`Review ${stateName} sales quarterly`);
            recommendations.push(`Set up alerts when approaching 80% of threshold`);
            recommendations.push(`Keep documentation of all sales transactions`);
        } else {
            recommendations.push(`Continue normal monitoring of ${stateName} sales`);
        }

        return recommendations;
    }

    /**
     * Explain scenario modeling results
     * @param {Object} scenarioResult - Result from NexusEngine.modelScenario
     * @returns {string} Human-readable explanation
     */
    static explainScenario(scenarioResult) {
        const { increasePercent, current, projected, newNexusStates } = scenarioResult;

        let explanation = `## Scenario Analysis: ${increasePercent > 0 ? '+' : ''}${increasePercent}% Sales Change\n\n`;

        explanation += `### Current Status\n`;
        explanation += `- States with nexus: **${current.summary.nexusEstablished}**\n`;
        explanation += `- States with imminent nexus: **${current.summary.nexusImminent}**\n`;
        explanation += `- States being monitored: **${current.summary.monitoring}**\n\n`;

        explanation += `### Projected Status\n`;
        explanation += `- States with nexus: **${projected.summary.nexusEstablished}** `;

        const nexusDelta = projected.summary.nexusEstablished - current.summary.nexusEstablished;
        if (nexusDelta > 0) {
            explanation += `(⚠️ +${nexusDelta} new)\n`;
        } else {
            explanation += `(no change)\n`;
        }

        explanation += `- States with imminent nexus: **${projected.summary.nexusImminent}**\n`;
        explanation += `- States being monitored: **${projected.summary.monitoring}**\n\n`;

        if (newNexusStates.length > 0) {
            explanation += `### ⚠️ New Nexus Obligations\n\n`;
            explanation += `If your sales increase by ${increasePercent}%, you would establish nexus in the following **${newNexusStates.length}** additional state(s):\n\n`;
            newNexusStates.forEach(stateAbbr => {
                const state = projected.evaluations.find(e => e.stateAbbr === stateAbbr);
                explanation += `- **${state.stateName}** (${stateAbbr})\n`;
            });

            explanation += `\n**Impact Assessment:**\n`;
            explanation += `- Estimated additional compliance cost: $${(newNexusStates.length * 5000).toLocaleString()} - $${(newNexusStates.length * 15000).toLocaleString()} annually\n`;
            explanation += `- Additional states to register in: ${newNexusStates.length}\n`;
            explanation += `- Additional monthly/quarterly filings: ${newNexusStates.length} states\n`;
        } else {
            explanation += `### ✅ No New Nexus Obligations\n\n`;
            explanation += `Based on this ${increasePercent}% growth scenario, you would not establish nexus in any additional states. However, continue monitoring states that are approaching thresholds.\n`;
        }

        return explanation;
    }

    /**
     * Generate compliance timeline
     * @param {Object} evaluation - State evaluation result
     * @returns {Array} Timeline of recommended actions
     */
    static getComplianceTimeline(evaluation) {
        if (!evaluation.hasNexus) {
            return [];
        }

        const timeline = [
            {
                phase: 'Immediate (Days 1-7)',
                actions: [
                    'Review nexus determination and gather supporting documentation',
                    'Determine retroactive exposure (if any)',
                    'Identify all taxable products/services',
                    'Assess if voluntary disclosure is needed'
                ]
            },
            {
                phase: 'Short-term (Days 8-30)',
                actions: [
                    'Submit sales tax registration application',
                    'Obtain sales tax permit/license',
                    'Configure shopping cart or billing system for tax collection',
                    'Update customer communications about tax collection',
                    'Set up accounting system for tax tracking'
                ]
            },
            {
                phase: 'Ongoing',
                actions: [
                    'Collect sales tax on all taxable sales',
                    'Track exempt sales with proper documentation',
                    'Prepare and file returns according to state schedule',
                    'Remit collected taxes by due dates',
                    'Monitor for threshold changes or law updates'
                ]
            }
        ];

        return timeline;
    }

    /**
     * Generate conservative vs aggressive approach comparison
     * @param {Object} evaluation - State evaluation result
     * @returns {Object} Comparison of approaches
     */
    static compareApproaches(evaluation) {
        const { riskLevel, percentComplete, stateName } = evaluation;

        const comparison = {
            conservative: {
                title: 'Conservative Approach',
                description: '',
                pros: [],
                cons: []
            },
            aggressive: {
                title: 'Aggressive Approach',
                description: '',
                pros: [],
                cons: []
            }
        };

        if (riskLevel === 'NEXUS_IMMINENT') {
            comparison.conservative.description = `Register for sales tax in ${stateName} now, before reaching the threshold.`;
            comparison.conservative.pros = [
                'Zero risk of penalty or back-filing',
                'Clean compliance record from day one',
                'Peace of mind',
                'Easier audit defense'
            ];
            comparison.conservative.cons = [
                'Earlier administrative burden',
                'Immediate compliance costs',
                'May be registering slightly earlier than legally required'
            ];

            comparison.aggressive.description = `Wait until the threshold is definitely exceeded before registering.`;
            comparison.aggressive.pros = [
                'Delay compliance costs',
                'Avoid unnecessary registration if sales decline',
                'Technically compliant with current law'
            ];
            comparison.aggressive.cons = [
                'Risk of retroactive liability if you miscalculate',
                'Audit risk if registration is delayed',
                'Potential penalties and interest',
                'Difficult to unwind if you exceed threshold mid-period'
            ];
        } else if (riskLevel === 'MONITORING') {
            comparison.conservative.description = `Set up systems now and monitor actively with alerts at 80% threshold.`;
            comparison.aggressive.description = `Continue business as usual and review quarterly.`;
        }

        return comparison;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIExplainer;
}
