/**
 * Comprehensive State Economic Nexus Threshold Database
 * Updated: January 2026
 * 
 * Threshold Types:
 * - REVENUE_ONLY: Only revenue threshold applies
 * - TRANSACTION_ONLY: Only transaction count applies
 * - EITHER: Revenue OR transaction threshold (whichever is met first)
 * - BOTH: Both thresholds must be met (rare)
 * 
 * Measurement Periods:
 * - ROLLING_12: Rolling 12-month period
 * - CALENDAR: Calendar year
 * - PREVIOUS_CURRENT: Previous or current calendar year
 */

const STATE_NEXUS_DATA = {
    AL: {
        name: 'Alabama',
        abbreviation: 'AL',
        hasSalesTax: true,
        revenueThreshold: 250000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.revenue.alabama.gov/sales-use/',
        notes: 'Alabama has a $250,000 revenue threshold. Marketplace sales are excluded from threshold calculation.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before making taxable sales',
        specialRules: 'No transaction count threshold'
    },

    AK: {
        name: 'Alaska',
        abbreviation: 'AK',
        hasSalesTax: false,
        revenueThreshold: null,
        transactionThreshold: null,
        thresholdType: 'NONE',
        measurementPeriod: null,
        excludeMarketplaceSales: false,
        effectiveDate: null,
        registrationUrl: null,
        notes: 'Alaska has no statewide sales tax. Some local jurisdictions may have sales taxes.',
        filingFrequency: null,
        registrationTiming: null,
        specialRules: 'No state sales tax; local jurisdictions may impose sales taxes'
    },

    AZ: {
        name: 'Arizona',
        abbreviation: 'AZ',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'CALENDAR',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-10-01',
        registrationUrl: 'https://azdor.gov/transaction-privilege-tax',
        notes: 'Arizona calls it Transaction Privilege Tax (TPT). $100,000 threshold based on calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register within 15 days of establishing nexus',
        specialRules: 'Marketplace sales excluded; unique TPT system'
    },

    AR: {
        name: 'Arkansas',
        abbreviation: 'AR',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-07-01',
        registrationUrl: 'https://www.dfa.arkansas.gov/excise-tax/sales-and-use-tax/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Marketplace facilitator sales excluded from threshold'
    },

    CA: {
        name: 'California',
        abbreviation: 'CA',
        hasSalesTax: true,
        revenueThreshold: 500000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-04-01',
        registrationUrl: 'https://www.cdtfa.ca.gov/taxes-and-fees/sales-and-use-tax.htm',
        notes: 'California has a $500,000 revenue threshold. No transaction count threshold.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before making taxable sales',
        specialRules: 'Higher threshold than most states; marketplace sales excluded'
    },

    CO: {
        name: 'Colorado',
        abbreviation: 'CO',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-06-01',
        registrationUrl: 'https://tax.colorado.gov/sales-use-tax',
        notes: '$100,000 revenue threshold. Complex home rule jurisdictions require separate registration.',
        filingFrequency: 'Monthly, quarterly, or annually',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Home rule cities may require separate filing; marketplace sales excluded'
    },

    CT: {
        name: 'Connecticut',
        abbreviation: 'CT',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-12-01',
        registrationUrl: 'https://portal.ct.gov/DRS/Sales-Tax/Sales-Tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'One of the earliest adopters post-Wayfair'
    },

    DE: {
        name: 'Delaware',
        abbreviation: 'DE',
        hasSalesTax: false,
        revenueThreshold: null,
        transactionThreshold: null,
        thresholdType: 'NONE',
        measurementPeriod: null,
        excludeMarketplaceSales: false,
        effectiveDate: null,
        registrationUrl: null,
        notes: 'Delaware has no sales tax.',
        filingFrequency: null,
        registrationTiming: null,
        specialRules: 'No sales tax state'
    },

    FL: {
        name: 'Florida',
        abbreviation: 'FL',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2021-07-01',
        registrationUrl: 'https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or semi-annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Later adopter; marketplace sales excluded'
    },

    GA: {
        name: 'Georgia',
        abbreviation: 'GA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://dor.georgia.gov/sales-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Marketplace facilitator law in effect'
    },

    HI: {
        name: 'Hawaii',
        abbreviation: 'HI',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://tax.hawaii.gov/geninfo/get/',
        notes: 'Hawaii has General Excise Tax (GET), not traditional sales tax. $100,000 or 200 transactions.',
        filingFrequency: 'Monthly, quarterly, or semi-annually',
        registrationTiming: 'Register before engaging in business',
        specialRules: 'GET applies broadly to business activities, not just retail sales'
    },

    ID: {
        name: 'Idaho',
        abbreviation: 'ID',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-06-01',
        registrationUrl: 'https://tax.idaho.gov/i-1019.cfm',
        notes: '$100,000 revenue threshold only. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold; marketplace sales excluded'
    },

    IL: {
        name: 'Illinois',
        abbreviation: 'IL',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://tax.illinois.gov/businesses/taxinformation/sales.html',
        notes: '$100,000 revenue OR 200 transactions in preceding 12 months.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Rolling 12-month measurement period'
    },

    IN: {
        name: 'Indiana',
        abbreviation: 'IN',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.in.gov/dor/business-tax/sales-tax/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    IA: {
        name: 'Iowa',
        abbreviation: 'IA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://tax.iowa.gov/sales-and-use-tax',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold'
    },

    KS: {
        name: 'Kansas',
        abbreviation: 'KS',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2021-07-01',
        registrationUrl: 'https://www.ksrevenue.gov/salesanduse.html',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Later adopter; revenue-only threshold'
    },

    KY: {
        name: 'Kentucky',
        abbreviation: 'KY',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://revenue.ky.gov/Sales-Use-Tax/Pages/default.aspx',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Early adopter post-Wayfair'
    },

    LA: {
        name: 'Louisiana',
        abbreviation: 'LA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://revenue.louisiana.gov/SalesTax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Early adopter immediately after Wayfair'
    },

    ME: {
        name: 'Maine',
        abbreviation: 'ME',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://www.maine.gov/revenue/taxes/sales-use-tax',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold; early adopter'
    },

    MD: {
        name: 'Maryland',
        abbreviation: 'MD',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.marylandtaxes.gov/business/sales-use/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    MA: {
        name: 'Massachusetts',
        abbreviation: 'MA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-10-01',
        registrationUrl: 'https://www.mass.gov/guides/sales-and-use-tax',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold'
    },

    MI: {
        name: 'Michigan',
        abbreviation: 'MI',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.michigan.gov/taxes/business-taxes/sales-use',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    MN: {
        name: 'Minnesota',
        abbreviation: 'MN',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.revenue.state.mn.us/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in preceding 12 months.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Rolling 12-month measurement period'
    },

    MS: {
        name: 'Mississippi',
        abbreviation: 'MS',
        hasSalesTax: true,
        revenueThreshold: 250000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-09-01',
        registrationUrl: 'https://www.dor.ms.gov/sales-tax',
        notes: '$250,000 revenue threshold in preceding 12 months. Higher than most states.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Higher threshold; rolling 12-month period'
    },

    MO: {
        name: 'Missouri',
        abbreviation: 'MO',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2023-01-01',
        registrationUrl: 'https://dor.mo.gov/taxation/business/sales-use/',
        notes: '$100,000 revenue threshold. Later adopter (2023).',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Very late adopter; revenue-only threshold'
    },

    MT: {
        name: 'Montana',
        abbreviation: 'MT',
        hasSalesTax: false,
        revenueThreshold: null,
        transactionThreshold: null,
        thresholdType: 'NONE',
        measurementPeriod: null,
        excludeMarketplaceSales: false,
        effectiveDate: null,
        registrationUrl: null,
        notes: 'Montana has no sales tax.',
        filingFrequency: null,
        registrationTiming: null,
        specialRules: 'No sales tax state'
    },

    NE: {
        name: 'Nebraska',
        abbreviation: 'NE',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://revenue.nebraska.gov/businesses/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    NV: {
        name: 'Nevada',
        abbreviation: 'NV',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-11-01',
        registrationUrl: 'https://tax.nv.gov/SalesAndUseTax/SalesAndUseTax/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    NH: {
        name: 'New Hampshire',
        abbreviation: 'NH',
        hasSalesTax: false,
        revenueThreshold: null,
        transactionThreshold: null,
        thresholdType: 'NONE',
        measurementPeriod: null,
        excludeMarketplaceSales: false,
        effectiveDate: null,
        registrationUrl: null,
        notes: 'New Hampshire has no sales tax.',
        filingFrequency: null,
        registrationTiming: null,
        specialRules: 'No sales tax state'
    },

    NJ: {
        name: 'New Jersey',
        abbreviation: 'NJ',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-11-01',
        registrationUrl: 'https://www.nj.gov/treasury/taxation/businesses/salestax/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    NM: {
        name: 'New Mexico',
        abbreviation: 'NM',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-07-01',
        registrationUrl: 'https://www.tax.newmexico.gov/businesses/gross-receipts-tax/',
        notes: 'New Mexico has Gross Receipts Tax (GRT). $100,000 revenue threshold.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'GRT system; revenue-only threshold'
    },

    NY: {
        name: 'New York',
        abbreviation: 'NY',
        hasSalesTax: true,
        revenueThreshold: 500000,
        transactionThreshold: 100,
        thresholdType: 'EITHER',
        measurementPeriod: 'ROLLING_4_QUARTERS',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-06-21',
        registrationUrl: 'https://www.tax.ny.gov/bus/st/stidx.htm',
        notes: '$500,000 revenue AND 100 transactions in preceding 4 quarters. Higher thresholds than most states.',
        filingFrequency: 'Quarterly or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Higher revenue threshold; lower transaction count; both must be met'
    },

    NC: {
        name: 'North Carolina',
        abbreviation: 'NC',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-11-01',
        registrationUrl: 'https://www.ncdor.gov/taxes-forms/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or semi-annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    ND: {
        name: 'North Dakota',
        abbreviation: 'ND',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.nd.gov/tax/user/businesses/sales-and-use-tax',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold'
    },

    OH: {
        name: 'Ohio',
        abbreviation: 'OH',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-08-01',
        registrationUrl: 'https://tax.ohio.gov/business/ohio-business-taxes/sales-and-use',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Early adopter post-Wayfair'
    },

    OK: {
        name: 'Oklahoma',
        abbreviation: 'OK',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://oklahoma.gov/tax/businesses/sales-and-use-tax.html',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold; early adopter'
    },

    OR: {
        name: 'Oregon',
        abbreviation: 'OR',
        hasSalesTax: false,
        revenueThreshold: null,
        transactionThreshold: null,
        thresholdType: 'NONE',
        measurementPeriod: null,
        excludeMarketplaceSales: false,
        effectiveDate: null,
        registrationUrl: null,
        notes: 'Oregon has no sales tax.',
        filingFrequency: null,
        registrationTiming: null,
        specialRules: 'No sales tax state'
    },

    PA: {
        name: 'Pennsylvania',
        abbreviation: 'PA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://www.revenue.pa.gov/TaxTypes/SUT/Pages/default.aspx',
        notes: '$100,000 revenue in preceding 12 months. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or semi-annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Rolling 12-month period; revenue-only'
    },

    RI: {
        name: 'Rhode Island',
        abbreviation: 'RI',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-07-01',
        registrationUrl: 'https://tax.ri.gov/taxation/sales/',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    SC: {
        name: 'South Carolina',
        abbreviation: 'SC',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-11-01',
        registrationUrl: 'https://dor.sc.gov/tax/sales',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold'
    },

    SD: {
        name: 'South Dakota',
        abbreviation: 'SD',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://dor.sd.gov/businesses/taxes/sales-use-tax/',
        notes: '$100,000 revenue OR 200 transactions. This is the Wayfair case state!',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Original Wayfair case state; standard thresholds'
    },

    TN: {
        name: 'Tennessee',
        abbreviation: 'TN',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-10-01',
        registrationUrl: 'https://www.tn.gov/revenue/taxes/sales-and-use-tax.html',
        notes: '$100,000 revenue in preceding 12 months. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Rolling 12-month period; revenue-only'
    },

    TX: {
        name: 'Texas',
        abbreviation: 'TX',
        hasSalesTax: true,
        revenueThreshold: 500000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'ROLLING_12',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-10-01',
        registrationUrl: 'https://comptroller.texas.gov/taxes/sales/',
        notes: '$500,000 revenue in preceding 12 months. Higher threshold than most states.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Higher threshold; rolling 12-month period'
    },

    UT: {
        name: 'Utah',
        abbreviation: 'UT',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://tax.utah.gov/sales',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    VT: {
        name: 'Vermont',
        abbreviation: 'VT',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-07-01',
        registrationUrl: 'https://tax.vermont.gov/business-and-corp/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Early adopter; standard thresholds'
    },

    VA: {
        name: 'Virginia',
        abbreviation: 'VA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-07-01',
        registrationUrl: 'https://www.tax.virginia.gov/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    WA: {
        name: 'Washington',
        abbreviation: 'WA',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: null,
        thresholdType: 'REVENUE_ONLY',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://dor.wa.gov/taxes-rates/sales-and-use-tax',
        notes: '$100,000 revenue threshold. No transaction count.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Revenue-only threshold'
    },

    WV: {
        name: 'West Virginia',
        abbreviation: 'WV',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://tax.wv.gov/Business/SalesAndUseTax/Pages/SalesAndUseTax.aspx',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    WI: {
        name: 'Wisconsin',
        abbreviation: 'WI',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2018-10-01',
        registrationUrl: 'https://www.revenue.wi.gov/pages/faqs/sales.aspx',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    WY: {
        name: 'Wyoming',
        abbreviation: 'WY',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-02-01',
        registrationUrl: 'https://revenue.wyo.gov/excise-tax-division/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly, quarterly, or annually based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Standard threshold structure'
    },

    DC: {
        name: 'District of Columbia',
        abbreviation: 'DC',
        hasSalesTax: true,
        revenueThreshold: 100000,
        transactionThreshold: 200,
        thresholdType: 'EITHER',
        measurementPeriod: 'PREVIOUS_CURRENT',
        excludeMarketplaceSales: true,
        effectiveDate: '2019-01-01',
        registrationUrl: 'https://otr.cfo.dc.gov/page/sales-and-use-tax',
        notes: '$100,000 revenue OR 200 transactions in previous or current calendar year.',
        filingFrequency: 'Monthly or quarterly based on tax liability',
        registrationTiming: 'Register before collecting tax',
        specialRules: 'Treated like a state for sales tax purposes'
    }
};

// Helper function to get all states with sales tax
function getStatesWithSalesTax() {
    return Object.entries(STATE_NEXUS_DATA)
        .filter(([_, state]) => state.hasSalesTax)
        .map(([abbr, _]) => abbr);
}

// Helper function to get states without sales tax
function getStatesWithoutSalesTax() {
    return Object.entries(STATE_NEXUS_DATA)
        .filter(([_, state]) => !state.hasSalesTax)
        .map(([abbr, state]) => ({ abbr, name: state.name }));
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STATE_NEXUS_DATA,
        getStatesWithSalesTax,
        getStatesWithoutSalesTax
    };
}
