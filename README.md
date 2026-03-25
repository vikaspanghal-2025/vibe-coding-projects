# Live Apps 🚀

A collection of interactive web dashboards built with React, TypeScript, and Recharts — deployed serverlessly on AWS Amplify.

## Projects

### 1. Smart Home Sensor Dashboard
Real-time IoT sensor monitoring dashboard with live-updating data, anomaly detection, and correlation analysis.

**[Live App Link →](https://main.d2ruu6sjflya6w.amplifyapp.com)**

**Features:**
- Real-time data streaming (1s intervals) for 5 smart home sensors
- Live anomaly detection with scatter plot visualization
- Sensor correlation analysis with selectable axes
- Temperature and power usage metric switching
- Pause/resume controls for demo presentations

**Tech:** React 18 · TypeScript · Recharts · Vite · Lucide Icons

![Smart Home Dashboard](screenshots/sensor-dashboard.png)

---

### 2. Market & Customer Sentiment Dashboard
Sentiment analysis dashboard for Amazon DynamoDB and Amazon Keyspaces, aggregating data from Reddit, StackOverflow, G2, PeerSpot, LinkedIn, X, and community forums.

**[Live App Link →](https://main.d1jng0r6vthxw5.amplifyapp.com)**

**Features:**
- Product switcher between DynamoDB and Keyspaces
- Top use cases distribution (interactive pie chart)
- Why customers choose each product (horizontal bar chart)
- Feature mentions with sentiment radar chart
- Pain points with severity classification
- Most requested features with status tracking
- Key takeaways with positive/negative/neutral insights
- Apache Cassandra GitHub trends (Keyspaces only)

**Tech:** React 18 · TypeScript · Recharts · Vite · Framer Motion

![Sentiment Dashboard](screenshots/sentiment-dashboard.png)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/vikaspanghal-2025/vibe-coding-projects.git

# Smart Home Sensor Dashboard
cd vibe-coding-projects/sensor-dashboard
npm install
npm run dev

# Sentiment Dashboard
cd ../sentiment-dashboard
npm install
npm run dev
```

## Deployment

Both projects are deployed on AWS Amplify as serverless static sites with HTTPS and CDN.

## Built With
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Recharts](https://recharts.org/) - Charting library
- [Vite](https://vitejs.dev/) - Build tool
- [AWS Amplify](https://aws.amazon.com/amplify/) - Hosting

---

### 3. Amazon Keyspaces Pricing Calculator
Interactive pricing calculator for Amazon Keyspaces (for Apache Cassandra) that helps estimate costs based on read/write throughput, storage, and capacity modes.

**[Live App Link →](https://aws-samples.github.io/sample-pricing-calculator-for-keyspaces/)**

**Source:** [aws-samples/sample-pricing-calculator-for-keyspaces](https://github.com/aws-samples/sample-pricing-calculator-for-keyspaces)
