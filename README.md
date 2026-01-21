# Sales Tax Nexus Threshold Tracker

A production-ready web application that helps businesses determine when and where they have economic nexus in all U.S. states and guides them on compliance steps.

## ✨ Features

- **Comprehensive State Database**: All 50 states + DC with current economic nexus thresholds
- **Automatic Nexus Evaluation**: Smart threshold comparison with risk categorization
- **AI-Powered Explanations**: Natural language explanations for why nexus was triggered
- **Scenario Modeling**: "What-if" analysis for growth planning
- **Compliance Guidance**: Plain-language next steps for registration and filing
- **Export Capabilities**: CSV, Excel, and PDF reports
- **Data Privacy**: All data stored locally in your browser
- **Premium UI**: Modern, glassmorphism design with smooth animations

## 🚀 Quick Start

1. **Open the App**: Simply open `index.html` in a modern web browser
2. **Enter Sales Data**: Navigate to "Sales Input" and enter your sales by state
3. **Calculate Nexus**: Click "Calculate Nexus" to see your analysis
4. **Review Results**: See which states require action on the Dashboard
5. **Export Reports**: Download CSV, Excel, or PDF reports for your records

## 📋 How to Use

### Step 1: Enter Your Sales Data

Navigate to the **Sales Input** tab and provide:
- Company name (optional)
- Measurement period (rolling 12 months, calendar year, etc.)
- Sales data for each state:
  - Direct sales revenue
  - Direct transaction count
  - Marketplace sales revenue
  - Marketplace transaction count

**Tip**: Use the "Add Sample Data" button to see the app in action!

### Step 2: Calculate Nexus

Click the **Calculate Nexus** button. The app will:
- Compare your sales to each state's thresholds
- Apply marketplace exclusion rules where applicable
- Categorize each state by risk level:
  - ✅ **No Nexus**: Below 70% of threshold
  - 📊 **Monitoring**: 70-89% of threshold
  - ⚠️ **Nexus Imminent**: 90-99% of threshold
  - 🔴 **Nexus Established**: 100%+ of threshold

### Step 3: Review Dashboard

The **Dashboard** shows:
- Summary statistics (states with nexus, imminent, monitoring, etc.)
- Detailed state-by-state table
- Progress bars for threshold completion
- Risk level badges

Click **View Details** on any state to see:
- AI-generated explanation of nexus status
- Specific recommendations
- Compliance timeline
- Registration links

### Step 4: Model Future Scenarios

Use the **Scenario Modeling** tab to:
- Project sales growth/decline by percentage
- See which new states you'd establish nexus in
- Plan ahead for compliance obligations

### Step 5: Export Reports

Export your analysis in multiple formats:
- **CSV**: Raw data for spreadsheet analysis
- **Excel**: Formatted workbook with multiple sheets
- **PDF**: Professional audit-ready summary

All exports include disclaimers and timestamps.

## 🏗️ Architecture

### File Structure

```
core-prominence/
├── index.html              # Main application HTML
├── styles.css              # Premium design system
├── app.js                  # Main application controller
├── data/
│   └── state-nexus-data.js # State threshold database
└── modules/
    ├── nexus-engine.js     # Nexus evaluation logic
    ├── ai-explainer.js     # Natural language explanations
    ├── compliance-guide.js # State compliance information
    └── export-handler.js   # CSV/Excel/PDF exports
```

### Technology Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
- **Fonts**: Inter (UI), Outfit (Display) from Google Fonts
- **Libraries**: SheetJS (Excel export), jsPDF (PDF export)
- **Storage**: localStorage for data persistence

### Key Components

1. **State Nexus Database**: Comprehensive data for all 51 jurisdictions
2. **Nexus Engine**: Threshold evaluation with support for all threshold types
3. **AI Explainer**: Generates plain-language explanations and recommendations
4. **Compliance Guide**: State-specific registration and filing information
5. **Export Handler**: Multi-format report generation

## 📊 Understanding State Thresholds

### Threshold Types

- **Revenue Only**: Only revenue threshold applies (e.g., $100,000)
- **Transaction Only**: Only transaction count applies (e.g., 200 transactions)
- **Either**: Revenue OR transaction threshold (whichever is met first)
- **Both**: Both thresholds must be met (rare)

### Measurement Periods

- **Rolling 12 Months**: Sales over the previous 12 months
- **Calendar Year**: Sales in the current calendar year
- **Previous or Current**: Sales in either the previous OR current calendar year

### Marketplace Sales

Many states **exclude** marketplace-facilitated sales (e.g., Amazon, eBay) from threshold calculations, as the marketplace is responsible for collecting tax. The app automatically applies these exclusion rules.

## ⚠️ Important Disclaimers

**This tool is for informational and educational purposes only.**

- Does not constitute legal, tax, or professional advice
- State tax laws change frequently
- Verify all thresholds and rules with state tax authorities
- Consult with qualified tax professionals before making compliance decisions
- The creators assume no liability for decisions made based on this information

## 🔐 Privacy & Security

- **No Server**: All processing happens in your browser
- **Local Storage**: Data saved to browser localStorage only
- **No Transmission**: No data sent to external servers
- **Your Control**: Clear data anytime from the app settings

## 🛠️ Customization

### Updating State Thresholds

Edit `data/state-nexus-data.js` to update thresholds as laws change:

```javascript
CA: {
  name: 'California',
  revenueThreshold: 500000,  // Update this value
  transactionThreshold: null,
  // ... other properties
}
```

### Modifying Risk Levels

Edit the `_evaluateThresholds` method in `modules/nexus-engine.js` to adjust risk categorization:

```javascript
if (percentComplete >= 90) {
  riskLevel = 'NEXUS_IMMINENT';  // Adjust this threshold
}
```

## 📱 Browser Compatibility

Tested and works in:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 🤝 Best Practices

1. **Review Quarterly**: Tax nexus can change as sales patterns evolve
2. **Register Promptly**: Don't delay registration once thresholds are exceeded
3. **Document Everything**: Keep detailed records for 4+ years
4. **Stay Informed**: Subscribe to state tax authority updates
5. **Consult Professionals**: For complex situations or multi-state businesses
6. **Conservative Approach**: When in doubt, register early to avoid back-filing

## 📞 Support & Resources

### State Tax Authority Resources
- Most state DOR websites are linked in the "View Details" modals
- Use state-provided rate lookup tools
- Consider joining state tax newsletters

### Professional Help
- Certified Public Accountants (CPAs)
- Sales tax automation software providers
- Voluntary Disclosure Agreement (VDA) specialists

## 🗺️ Roadmap

Future enhancements could include:
- [ ] CSV bulk import for sales data
- [ ] Historical nexus tracking over time
- [ ] Multi-user/multi-entity support
- [ ] Integration with popular e-commerce platforms
- [ ] Automated threshold update notifications
- [ ] Interactive U.S. map visualization
- [ ] Mobile app version

## 📄 License

This is an educational tool. Use at your own risk. Consult tax professionals for compliance advice.

---

**Built with ❤️ for small businesses navigating the complex world of sales tax compliance.**
