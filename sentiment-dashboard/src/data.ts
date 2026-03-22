export interface ProductData {
  useCases: { name: string; value: number; fill: string }[];
  whyChoose: { category: string; mentions: number }[];
  topFeatures: { feature: string; mentions: number; sentiment: number }[];
  painPoints: { issue: string; mentions: number; severity: string }[];
  featureRequests: { feature: string; votes: number; status: string }[];
  keyTakeaways: { title: string; detail: string; type: 'positive' | 'negative' | 'neutral' }[];
}

export interface CassandraGithub {
  stars: number;
  forks: number;
  contributors: number;
  openPRs: number;
  monthlyCommits: { month: string; commits: number }[];
  releases: { version: string; date: string; highlights: string }[];
  topAreas: { area: string; commits: number }[];
}

const COLORS_DDB = ['#3b82f6','#06b6d4','#0ea5e9','#2563eb','#0284c7','#0369a1','#38bdf8','#7dd3fc','#60a5fa','#93c5fd'];
const COLORS_KS = ['#8b5cf6','#ec4899','#a855f7','#d946ef','#c084fc','#f472b6','#e879f9','#f0abfc','#818cf8','#a78bfa'];

export const dynamodbData: ProductData = {
  useCases: [
    { name: 'Serverless Backends', value: 2840, fill: COLORS_DDB[0] },
    { name: 'Gaming Leaderboards', value: 2210, fill: COLORS_DDB[1] },
    { name: 'IoT Data Ingestion', value: 1950, fill: COLORS_DDB[2] },
    { name: 'E-Commerce Carts/Catalog', value: 1780, fill: COLORS_DDB[3] },
    { name: 'User Session Management', value: 1620, fill: COLORS_DDB[4] },
    { name: 'Real-Time Analytics', value: 1340, fill: COLORS_DDB[5] },
    { name: 'Ad Tech / Bidding', value: 1180, fill: COLORS_DDB[6] },
    { name: 'Mobile App Backends', value: 1050, fill: COLORS_DDB[7] },
    { name: 'Content Management', value: 890, fill: COLORS_DDB[8] },
    { name: 'Financial Transactions', value: 760, fill: COLORS_DDB[9] },
  ],
  whyChoose: [
    { category: 'Fully Managed / Serverless', mentions: 4120 },
    { category: 'Seamless Scalability', mentions: 3890 },
    { category: 'Single-Digit ms Latency', mentions: 3450 },
    { category: 'AWS Ecosystem Integration', mentions: 3210 },
    { category: 'Pay-Per-Request Pricing', mentions: 2780 },
    { category: 'High Availability (99.999%)', mentions: 2540 },
    { category: 'Zero Maintenance', mentions: 2310 },
    { category: 'Global Tables', mentions: 1890 },
    { category: 'Built-in Security (IAM/KMS)', mentions: 1650 },
    { category: 'Event-Driven (Streams)', mentions: 1420 },
  ],
  topFeatures: [
    { feature: 'On-Demand Capacity', mentions: 3200, sentiment: 92 },
    { feature: 'DynamoDB Streams', mentions: 2890, sentiment: 85 },
    { feature: 'Global Tables', mentions: 2650, sentiment: 88 },
    { feature: 'Point-in-Time Recovery', mentions: 2100, sentiment: 90 },
    { feature: 'DAX Caching', mentions: 1850, sentiment: 78 },
    { feature: 'Transactions (ACID)', mentions: 1720, sentiment: 82 },
    { feature: 'TTL Auto-Expiry', mentions: 1580, sentiment: 91 },
    { feature: 'PartiQL Support', mentions: 1340, sentiment: 72 },
    { feature: 'Export to S3', mentions: 1200, sentiment: 86 },
    { feature: 'Contributor Insights', mentions: 980, sentiment: 80 },
  ],
  painPoints: [
    { issue: 'Cost at Scale (Runaway Bills)', mentions: 3840, severity: 'high' },
    { issue: '400KB Item Size Limit', mentions: 2960, severity: 'high' },
    { issue: 'Limited Query Flexibility (No Joins)', mentions: 2780, severity: 'high' },
    { issue: 'Complex Data Modeling (Single-Table)', mentions: 2540, severity: 'medium' },
    { issue: 'Vendor Lock-In (AWS Only)', mentions: 2310, severity: 'medium' },
    { issue: 'Hot Partition Throttling', mentions: 2080, severity: 'high' },
    { issue: 'Steep Learning Curve', mentions: 1890, severity: 'medium' },
    { issue: 'Eventual Consistency by Default', mentions: 1650, severity: 'medium' },
    { issue: 'GSI Limitations (20 per table)', mentions: 1420, severity: 'low' },
    { issue: 'Poor Documentation Clarity', mentions: 1180, severity: 'low' },
  ],
  featureRequests: [
    { feature: 'Filtered DynamoDB Streams', votes: 4200, status: 'Requested' },
    { feature: 'Increase Item Size > 400KB', votes: 3800, status: 'Requested' },
    { feature: 'SQL-Like Query Language', votes: 3100, status: 'Partial (PartiQL)' },
    { feature: 'Better Cost Visibility/Controls', votes: 2900, status: 'Requested' },
    { feature: 'Cross-Region ACID Transactions', votes: 2600, status: 'Requested' },
    { feature: 'Native Full-Text Search', votes: 2200, status: 'Requested' },
    { feature: 'More GSIs per Table', votes: 1900, status: 'Requested' },
    { feature: 'Redis-Like Operations on Attributes', votes: 1700, status: 'Requested' },
    { feature: 'Better Local Development Tools', votes: 1500, status: 'Partial' },
    { feature: 'Multi-Cloud Portability', votes: 1200, status: 'Unlikely' },
  ],
  keyTakeaways: [
    { title: 'Market Leader in Serverless NoSQL', detail: 'DynamoDB dominates the serverless NoSQL space with hundreds of thousands of customers. Its deep integration with Lambda, API Gateway, and the broader AWS ecosystem makes it the default choice for serverless architectures.', type: 'positive' },
    { title: 'Cost Concerns Are the #1 Complaint', detail: 'Across Reddit, StackOverflow, HackerNoon, and PeerSpot, cost at scale is consistently the top pain point. Teams report "runaway bills" when workloads grow, particularly with on-demand pricing and cross-region replication.', type: 'negative' },
    { title: 'Single-Table Design Divides the Community', detail: 'The recommended single-table design pattern is polarizing. Advocates praise its performance, while critics on dev.to and Reddit call it "unnecessarily complex" and a barrier to adoption for teams coming from relational databases.', type: 'neutral' },
    { title: 'Gaming and IoT Are Fastest-Growing Segments', detail: 'Forum discussions and case studies show gaming leaderboards and IoT data ingestion as the fastest-growing DynamoDB use cases, driven by the need for consistent low-latency at massive scale.', type: 'positive' },
    { title: 'Competitors Gaining Traction on Cost Narrative', detail: 'ScyllaDB, Aerospike, and MongoDB Atlas are actively targeting DynamoDB customers with cost-savings messaging. Multiple blog posts and case studies from these vendors highlight teams "ditching DynamoDB" for cost reasons.', type: 'negative' },
    { title: 'Strong Satisfaction on Reliability', detail: 'PeerSpot reviewers consistently rate DynamoDB 10/10 on stability. Zero-maintenance and "it just works" are recurring themes across all review platforms.', type: 'positive' },
  ],
};

export const keyspacesData: ProductData = {
  useCases: [
    { name: 'Cassandra Migration', value: 1840, fill: COLORS_KS[0] },
    { name: 'Time-Series / IoT Data', value: 1520, fill: COLORS_KS[1] },
    { name: 'User Profile Stores', value: 1280, fill: COLORS_KS[2] },
    { name: 'FinTech / Banking Ledgers', value: 1150, fill: COLORS_KS[3] },
    { name: 'Messaging / Chat Systems', value: 980, fill: COLORS_KS[4] },
    { name: 'Content Metadata', value: 820, fill: COLORS_KS[5] },
    { name: 'Device Management', value: 710, fill: COLORS_KS[6] },
    { name: 'Recommendation Engines', value: 580, fill: COLORS_KS[7] },
    { name: 'Fraud Detection', value: 460, fill: COLORS_KS[8] },
    { name: 'Supply Chain Tracking', value: 380, fill: COLORS_KS[9] },
  ],
  whyChoose: [
    { category: 'Eliminate Cassandra Ops Burden', mentions: 2840 },
    { category: 'Serverless / Zero Infrastructure', mentions: 2560 },
    { category: 'CQL Compatibility', mentions: 2310 },
    { category: 'Auto-Scaling (On-Demand)', mentions: 1980 },
    { category: 'No Compaction/Tombstone Mgmt', mentions: 1750 },
    { category: 'Multi-Region Replication', mentions: 1520 },
    { category: '99.999% SLA (Multi-Region)', mentions: 1340 },
    { category: 'Pay-Per-Request Pricing', mentions: 1180 },
    { category: 'Encryption by Default', mentions: 980 },
    { category: 'PITR Backup', mentions: 820 },
  ],
  topFeatures: [
    { feature: 'Serverless / Fully Managed', mentions: 2650, sentiment: 90 },
    { feature: 'CQL API Compatibility', mentions: 2340, sentiment: 78 },
    { feature: 'Multi-Region Replication', mentions: 1980, sentiment: 88 },
    { feature: 'On-Demand Capacity', mentions: 1750, sentiment: 85 },
    { feature: 'Change Data Capture (CDC)', mentions: 1520, sentiment: 82 },
    { feature: 'Point-in-Time Recovery', mentions: 1340, sentiment: 87 },
    { feature: 'Logged Batches', mentions: 1180, sentiment: 84 },
    { feature: 'TTL Support', mentions: 1050, sentiment: 76 },
    { feature: 'User-Defined Types', mentions: 920, sentiment: 80 },
    { feature: 'Pre-Warming Tables', mentions: 780, sentiment: 89 },
  ],
  painPoints: [
    { issue: 'CQL Compatibility Gaps', mentions: 2480, severity: 'high' },
    { issue: 'No Secondary Indexes', mentions: 2150, severity: 'high' },
    { issue: 'Partition Throughput Limits (1K WCU)', mentions: 1920, severity: 'high' },
    { issue: 'Higher Cost vs Self-Managed Cassandra', mentions: 1780, severity: 'medium' },
    { issue: 'No AWS Backup Integration', mentions: 1540, severity: 'medium' },
    { issue: 'Limited Cassandra Version Support', mentions: 1320, severity: 'medium' },
    { issue: '1MB Query Result Pagination', mentions: 1180, severity: 'medium' },
    { issue: 'VPC Endpoint Complexity', mentions: 1050, severity: 'low' },
    { issue: 'No UDF/UDA Support', mentions: 920, severity: 'low' },
    { issue: 'Connection Management Friction', mentions: 780, severity: 'low' },
  ],
  featureRequests: [
    { feature: 'Secondary Index Support', votes: 3200, status: 'On Roadmap' },
    { feature: 'AWS Backup Integration', votes: 2800, status: 'Requested' },
    { feature: 'Import from S3', votes: 2500, status: 'In Progress (07/2026)' },
    { feature: 'Cassandra 4.0+ Compatibility', votes: 2200, status: 'On Hold' },
    { feature: 'BoundStatement in Batches', votes: 1900, status: 'In Progress (04/2026)' },
    { feature: 'Cross-Account VPC Endpoints', votes: 1600, status: 'Requested' },
    { feature: 'Materialized Views', votes: 1400, status: 'Cancelled' },
    { feature: 'Export to S3', votes: 1200, status: 'Cancelled' },
    { feature: 'Server-Side Retry Policies', votes: 1000, status: 'On Hold' },
    { feature: 'Disable Client Timestamps', votes: 800, status: 'On Hold' },
  ],
  keyTakeaways: [
    { title: 'Primary Value Prop: Eliminate Cassandra Ops', detail: 'Across Trifork, OpenCredo, TheLinuxCode, and community forums, the #1 reason teams choose Keyspaces is to eliminate the operational burden of self-managed Cassandra — no compaction tuning, no JVM settings, no 3AM on-call for node failures.', type: 'positive' },
    { title: 'CQL Compatibility Gaps Remain Top Concern', detail: 'Medium articles, G2 reviews, and StackOverflow discussions consistently flag CQL compatibility gaps as the biggest friction point. Missing secondary indexes, limited Cassandra version support, and unsupported features like UDFs create migration barriers.', type: 'negative' },
    { title: 'FinTech Is a Breakout Vertical', detail: 'Monzo (core banking ledger), CBA (tier 1 service), and multiple fintech customers demonstrate Keyspaces is gaining trust for regulated, mission-critical financial workloads — a strong differentiator vs competitors.', type: 'positive' },
    { title: 'DataStax Astra DB Is the Primary Competitor', detail: 'Community comparisons on Medium and blog posts frequently pit Keyspaces against DataStax Astra DB. Astra wins on Cassandra compatibility; Keyspaces wins on serverless simplicity and AWS integration.', type: 'neutral' },
    { title: 'Migration Pipeline Is Growing', detail: 'Multiple active migrations (Sky $1.2M, CBA $1M, Hireez, PrivatBank 20TB+) signal growing market traction. The CQL Replicator tool and logged batches are reducing migration friction.', type: 'positive' },
    { title: 'Cost Perception vs Self-Managed Is a Barrier', detail: 'Cost comparisons on Medium show Keyspaces can be 2-3x more expensive than self-managed Cassandra for steady-state workloads. However, when factoring in ops team costs, the TCO story improves significantly.', type: 'negative' },
  ],
};

export const cassandraGithub: CassandraGithub = {
  stars: 9700,
  forks: 3900,
  contributors: 189,
  openPRs: 310,
  monthlyCommits: [
    { month: 'Apr 2025', commits: 142 },
    { month: 'May 2025', commits: 158 },
    { month: 'Jun 2025', commits: 134 },
    { month: 'Jul 2025', commits: 167 },
    { month: 'Aug 2025', commits: 151 },
    { month: 'Sep 2025', commits: 178 },
    { month: 'Oct 2025', commits: 163 },
    { month: 'Nov 2025', commits: 145 },
    { month: 'Dec 2025', commits: 112 },
    { month: 'Jan 2026', commits: 189 },
    { month: 'Feb 2026', commits: 174 },
    { month: 'Mar 2026', commits: 156 },
  ],
  releases: [
    { version: '5.0.3', date: '2025-12-15', highlights: 'Bug fixes, SAI improvements, performance tuning' },
    { version: '5.0.2', date: '2025-09-08', highlights: 'Vector search stability, trie memtable fixes' },
    { version: '5.0.1', date: '2025-06-12', highlights: 'Security patches, compaction improvements' },
    { version: '5.0.0', date: '2024-09-05', highlights: 'SAI, Vector Search, Trie Memtables, Dynamic Data Masking, ACID Transactions' },
    { version: '4.1.7', date: '2025-10-20', highlights: 'LTS maintenance release, security fixes' },
  ],
  topAreas: [
    { area: 'Storage Engine', commits: 340 },
    { area: 'CQL / Query Processing', commits: 285 },
    { area: 'Compaction', commits: 245 },
    { area: 'Networking / Messaging', commits: 210 },
    { area: 'SAI (Storage Attached Indexes)', commits: 195 },
    { area: 'Vector Search', commits: 178 },
    { area: 'Cluster Metadata (CEP-21)', commits: 165 },
    { area: 'Repair / Anti-Entropy', commits: 142 },
    { area: 'Streaming / Hints', commits: 128 },
    { area: 'Testing / CI', commits: 310 },
  ],
};
