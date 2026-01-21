/**
 * Compliance Guide Module
 * Provides detailed compliance information for each state
 */

class ComplianceGuide {
    /**
     * Get comprehensive compliance guide for a state
     * @param {string} stateAbbr - State abbreviation
     * @param {Object} stateData - State nexus data
     * @returns {Object} Compliance guide
     */
    static getGuide(stateAbbr, stateData) {
        const state = stateData[stateAbbr];

        if (!state) {
            return { error: 'State not found' };
        }

        if (!state.hasSalesTax) {
            return {
                stateAbbr,
                stateName: state.name,
                hasSalesTax: false,
                message: `${state.name} does not have a sales tax.`,
                details: state.notes
            };
        }

        return {
            stateAbbr,
            stateName: state.name,
            hasSalesTax: true,

            // Registration information
            registration: {
                url: state.registrationUrl,
                timing: state.registrationTiming,
                process: this._getRegistrationProcess(stateAbbr),
                requiredDocuments: this._getRequiredDocuments(stateAbbr)
            },

            // Filing information
            filing: {
                frequency: state.filingFrequency,
                dueDates: this._getFilingDueDates(stateAbbr),
                paymentOptions: this._getPaymentOptions(stateAbbr)
            },

            // Tax collection rules
            collection: {
                startDate: this._getCollectionStartDate(stateAbbr),
                rateStructure: this._getRateStructure(stateAbbr),
                exemptions: this._getCommonExemptions(stateAbbr)
            },

            // Voluntary disclosure
            voluntaryDisclosure: {
                available: true,
                benefits: this._getVDABenefits(),
                process: this._getVDAProcess(stateAbbr)
            },

            // Important notes
            notes: state.notes,
            specialRules: state.specialRules,

            // Useful links
            resources: this._getStateResources(stateAbbr, state)
        };
    }

    /**
     * Get registration process details
     * @private
     */
    static _getRegistrationProcess(stateAbbr) {
        return [
            'Gather business information (EIN, business structure, contact details)',
            'Visit the state\'s online registration portal',
            'Complete the sales tax registration application',
            'Provide banking information for tax remittance',
            'Receive sales tax permit/license (typically within 2-4 weeks)',
            'Display permit as required by state law'
        ];
    }

    /**
     * Get required documents for registration
     * @private
     */
    static _getRequiredDocuments(stateAbbr) {
        return [
            'Federal Employer Identification Number (EIN) or SSN',
            'Business formation documents (Articles of Incorporation, etc.)',
            'Business owner identification',
            'Bank account information for electronic payments',
            'Estimated monthly sales tax liability',
            'NAICS code for business activities'
        ];
    }

    /**
     * Get filing due dates information
     * @private
     */
    static _getFilingDueDates(stateAbbr) {
        // This is a simplified version; in production, this would be state-specific
        return {
            monthly: '20th of the following month',
            quarterly: '20th of the month following the quarter end',
            annually: 'January 20th for the previous calendar year',
            note: 'Due dates may vary by state. Always verify with the state tax authority.'
        };
    }

    /**
     * Get payment options
     * @private
     */
    static _getPaymentOptions(stateAbbr) {
        return [
            'Electronic funds transfer (EFT) - typically required above certain thresholds',
            'ACH debit through state portal',
            'Credit card (may have processing fees)',
            'Check or money order (if below electronic filing threshold)'
        ];
    }

    /**
     * Get tax collection start date rules
     * @private
     */
    static _getCollectionStartDate(stateAbbr) {
        return 'Begin collecting sales tax on the first day of the month following registration, ' +
            'or as specified in your registration approval. Some states allow collection to begin ' +
            'immediately upon exceeding the threshold. Verify with the state tax authority.';
    }

    /**
     * Get rate structure information
     * @private
     */
    static _getRateStructure(stateAbbr) {
        const specialCases = {
            CO: 'Colorado has complex home rule jurisdictions; many cities require separate registration and filing',
            AL: 'Alabama has both state and local rates; use state-provided rate lookup tools',
            LA: 'Louisiana has parish and local taxes; complex rate structure',
            AK: 'No state sales tax; local jurisdictions may have sales taxes'
        };

        return specialCases[stateAbbr] ||
            'Most states have a base state rate plus local rates (county, city, special districts). ' +
            'Use the state\'s rate lookup tool or tax automation software to determine the correct rate ' +
            'for each customer\'s delivery address.';
    }

    /**
     * Get common exemptions
     * @private
     */
    static _getCommonExemptions(stateAbbr) {
        return [
            'Sales to purchasers with valid resale certificates',
            'Sales to exempt organizations (with proper exemption certificate)',
            'Certain food and grocery items (varies by state)',
            'Prescription medications (most states)',
            'Manufacturing equipment (varies by state)',
            'Agricultural items (varies by state)'
        ];
    }

    /**
     * Get voluntary disclosure agreement benefits
     * @private
     */
    static _getVDABenefits() {
        return [
            'Limited lookback period (typically 3-4 years instead of statute of limitations)',
            'Penalty waiver (interest usually still applies)',
            'Anonymity until agreement is finalized',
            'Good faith demonstration to the state',
            'Avoid potential criminal liability',
            'Clean slate going forward'
        ];
    }

    /**
     * Get VDA process overview
     * @private
     */
    static _getVDAProcess(stateAbbr) {
        return [
            'Consult with a tax advisor or VDA specialist',
            'Calculate estimated past liability',
            'Contact state (or have advisor contact anonymously)',
            'Negotiate lookback period and terms',
            'Register for permit',
            'File past returns and remit tax + interest',
            'Establish ongoing compliance'
        ];
    }

    /**
     * Get state-specific resources
     * @private
     */
    static _getStateResources(stateAbbr, stateData) {
        return [
            {
                title: `${stateData.name} Department of Revenue`,
                url: stateData.registrationUrl,
                description: 'Official state tax authority website'
            },
            {
                title: 'Streamlined Sales Tax',
                url: 'https://www.streamlinedsalestax.org/',
                description: 'Multi-state simplification initiative'
            },
            {
                title: 'Federation of Tax Administrators',
                url: 'https://www.taxadmin.org/',
                description: 'State tax administrator resources'
            }
        ];
    }

    /**
     * Get registration cost estimate
     * @param {string} stateAbbr - State abbreviation
     * @returns {Object} Cost estimate
     */
    static getRegistrationCostEstimate(stateAbbr) {
        return {
            registrationFee: '$0 - $100',
            professionalFees: '$500 - $2,000',
            softwareSetup: '$0 - $500',
            ongoingCompliance: '$1,000 - $5,000 per year',
            note: 'Costs vary based on complexity, sales volume, and whether you use professionals'
        };
    }

    /**
     * Get audit risk factors
     * @returns {Array} List of audit risk factors
     */
    static getAuditRiskFactors() {
        return [
            {
                factor: 'Late registration after exceeding threshold',
                risk: 'High',
                description: 'States actively pursue businesses that delayed registration'
            },
            {
                factor: 'Inconsistent filing patterns',
                risk: 'Medium',
                description: 'Missing returns or erratic filing raises red flags'
            },
            {
                factor: 'Large sales volume',
                risk: 'Medium',
                description: 'Higher revenue businesses have higher audit probability'
            },
            {
                factor: 'Industry-specific audits',
                risk: 'Varies',
                description: 'Some industries (e.g., online retail, SaaS) receive more scrutiny'
            },
            {
                factor: 'Improper exempt sale documentation',
                risk: 'High',
                description: 'Failure to collect exemption certificates is a common audit issue'
            }
        ];
    }

    /**
     * Get best practices checklist
     * @returns {Array} Best practices
     */
    static getBestPractices() {
        return [
            '✓ Register promptly when threshold is exceeded',
            '✓ Use automated tax calculation software to ensure accuracy',
            '✓ Collect and maintain exemption certificates properly',
            '✓ File returns on time, even if no tax is due',
            '✓ Reconcile sales tax regularly (monthly)',
            '✓ Keep detailed records for at least 4 years',
            '✓ Review nexus obligations quarterly as sales patterns change',
            '✓ Stay informed about law changes via state alerts',
            '✓ Consider working with a sales tax professional',
            '✓ Document all tax-related decisions and assumptions'
        ];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComplianceGuide;
}
