import { ProjectCase, CertificationItem, EducationItem, SkillGroup } from '../types';

export const PERSONAL_INFO = {
  name: "S.U. JayaHarish",
  displayName: "S.U. Jaya Harish",
  shortName: "JH",
  role: "Cybersecurity & SOC / Blue Team",
  location: "Chennai, Tamil Nadu – 600040",
  coordinates: "8°57'43.0\"N 77°16'11.8\"E",
  phone: "+91-6382945099",
  email: "jayaharishsu@gmail.com",
  github: "https://github.com/JsDawg1",
  githubUsername: "JsDawg1",
  linkedin: "https://www.linkedin.com/in/jaya-harish-s-u-49b758252/",
  linkedinUsername: "jaya-harish-s-u-49b758252",
  tryhackme: "https://tryhackme.com/p/asukkubsukku",
  tryhackmeUsername: "asukkubsukku",
  headline: "Defending infrastructure with precision telemetry, firewall control, and threat analysis.",
  bio: "Cybersecurity-focused Computer Science graduate and CompTIA Security+ certified defender with hands-on experience in security monitoring, vulnerability assessment, network defense, firewall architecture, and email header forensics. Experienced in isolating threats through controlled lab environments and analyzing Indicators of Compromise (IOCs).",
  targetRoles: ["Blue Team", "SOC Analyst", "Security Operations", "Threat Detection Analyst"],
};

export const HIGHLIGHT_STATS = [
  {
    index: "01",
    label: "SECURITY CERT",
    value: "CompTIA Sec+",
    sub: "Issued Mar'26",
  },
  {
    index: "02",
    label: "CLOUD CERT",
    value: "AWS CLF-C02",
    sub: "Issued Oct'26",
  },
  {
    index: "03",
    label: "CONTROLLED LABS",
    value: "Debian & Kali",
    sub: "Virtual Net Tests",
  },
  {
    index: "04",
    label: "CORE FOCUS",
    value: "SOC / Blue Team",
    sub: "Defensive Operations",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Security Tools",
    description: "Defensive scanning, packet inspection, proxying, and SIEM monitoring utilities.",
    skills: [
      { name: "Nmap", level: "Proficient", highlight: true },
      { name: "Wireshark", level: "Proficient", highlight: true },
      { name: "Burp Suite", level: "Proficient", highlight: true },
      { name: "Metasploit", level: "Proficient", highlight: true },
      { name: "UFW (Uncomplicated Firewall)", level: "Proficient", highlight: true },
      { name: "Splunk", level: "Working Exposure", highlight: true },
      { name: "Microsoft Office / Excel", level: "Core" },
    ],
  },
  {
    category: "Security Disciplines",
    description: "Core defense concepts, operational methodologies, and incident response fundamentals.",
    skills: [
      { name: "Threat Detection", level: "Core", highlight: true },
      { name: "Security Monitoring", level: "Core", highlight: true },
      { name: "Log Analysis", level: "Core", highlight: true },
      { name: "Intrusion Detection", level: "Core", highlight: true },
      { name: "Vulnerability Assessment", level: "Core", highlight: true },
      { name: "Incident Response", level: "Core", highlight: true },
      { name: "Network Traffic Analysis", level: "Core", highlight: true },
      { name: "OWASP Top 10", level: "Core", highlight: true },
      { name: "IOC Extraction & Analysis", level: "Core", highlight: true },
      { name: "Email Authentication (SPF / DKIM / DMARC)", level: "Core", highlight: true },
    ],
  },
  {
    category: "Programming Languages",
    description: "Languages used for automation, script development, and database queries.",
    skills: [
      { name: "Python", level: "Proficient", highlight: true },
      { name: "Java", level: "Proficient" },
      { name: "C++", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "SQL", level: "Proficient" },
    ],
  },
  {
    category: "Operating Systems",
    description: "Operating systems utilized for security testing, administration, and forensic analysis.",
    skills: [
      { name: "Linux (Debian 13)", level: "Core", highlight: true },
      { name: "Linux (Kali Linux)", level: "Core", highlight: true },
      { name: "Windows", level: "Core", highlight: true },
    ],
  },
];

export const PROJECTS: ProjectCase[] = [
  {
    id: "linux-firewall-lab",
    num: "01",
    title: "Linux Firewall Configuration & Network Security Lab",
    subtitle: "UFW Rule Enforcement & Attack Surface Verification on Debian 13",
    period: "Aug'26 – Sep'26",
    category: "Network Security",
    technologies: ["Debian 13", "UFW", "Kali Linux", "Nmap", "Netcat", "SSH", "Ping"],
    summary: "Deployed and configured a resilient UFW host-based firewall architecture on a Debian 13 server within an isolated virtual network. Defined granular allow, deny, reject, and default policies alongside source-IP access controls. Verified rule enforcement with active penetration tools from Kali Linux.",
    scope: "Isolated Virtual Network · Host-Based Firewall Hardening · Log Audit Pipeline",
    coverCode: {
      lang: "bash",
      lines: [
        [
          { tone: "cm", text: "# 1. Restrict incoming traffic by default" },
        ],
        [
          { tone: "kw", text: "ufw" },
          { tone: "pl", text: " default deny incoming" },
        ],
        [
          { tone: "kw", text: "ufw" },
          { tone: "pl", text: " default allow outgoing" },
        ],
        [
          { tone: "cm", text: "# 2. Allow SSH only from management subnet" },
        ],
        [
          { tone: "kw", text: "ufw" },
          { tone: "pl", text: " allow from " },
          { tone: "str", text: "192.168.1.0/24" },
          { tone: "pl", text: " to any port " },
          { tone: "num", text: "22" },
          { tone: "pl", text: " proto tcp" },
        ],
        [
          { tone: "cm", text: "# 3. Expose filtered web ports with high logging" },
        ],
        [
          { tone: "kw", text: "ufw" },
          { tone: "pl", text: " allow " },
          { tone: "num", text: "80,443" },
          { tone: "pl", text: "/tcp && " },
          { tone: "kw", text: "ufw" },
          { tone: "pl", text: " logging high" },
        ],
        [
          { tone: "cm", text: "# 4. Verification with Nmap SYN scan" },
        ],
        [
          { tone: "fn", text: "nmap" },
          { tone: "pl", text: " -sS -p 22,80,443,3389 " },
          { tone: "str", text: "192.168.1.10" },
        ],
        [
          { tone: "pass", text: "[PASS] 22: open (subnet) | 3389: filtered" },
        ],
      ],
    },
    keyHighlights: [
      "Configured comprehensive Allow, Deny, Reject, and Default packet policies.",
      "Implemented strict port-specific, protocol-specific, and source-IP-based access controls.",
      "Enabled high-verbosity UFW firewall logs to monitor permitted vs blocked traffic and inspect connection attempts.",
      "Validated firewall defenses using Nmap SYN scans, Netcat listeners, SSH handshakes, and ICMP Ping tests.",
      "Simulated external recon from Kali Linux to ensure zero accidental port leakage on unmapped daemons.",
    ],
    investigationSteps: [
      {
        phase: "Policy Architecture",
        description: "Established baseline defense posture on Debian 13 with default deny rules for ingress traffic.",
        tools: ["Debian 13", "UFW"],
        outcomes: ["Unsolicited inbound packets dropped by default", "Host baseline hardened against broad subnet scans"],
      },
      {
        phase: "Granular Access Rules",
        description: "Created source-IP pinned rules for administrative access and allowed public web ingress.",
        tools: ["UFW", "iptables bindings"],
        outcomes: ["Port 22 TCP locked to management CIDR 192.168.1.0/24", "Explicit rejection for blacklisted source addresses"],
      },
      {
        phase: "Active Verification",
        description: "Conducted systematic network probe tests from an adjacent Kali Linux node.",
        tools: ["Kali Linux", "Nmap", "Netcat", "SSH"],
        outcomes: ["Verified closed ports returned correct filtered/dropped states", "Confirmed unauthorized SSH attempts logged to /var/log/ufw.log"],
      },
    ],
    verificationMetrics: [
      { label: "Target Platform", detail: "Debian 13 Server (Isolated Virtual Network)" },
      { label: "Audit Mechanism", detail: "Active Nmap SYN (-sS) + Netcat probes" },
      { label: "Logging Tier", detail: "UFW High-Verbosity Kernel Logging" },
      { label: "Validation Vector", detail: "Multi-port (22, 80, 443, arbitrary high ports)" },
    ],
    defensiveImpact: "Demonstrates practical host-based network perimeter defense, least-privilege service exposure, and systematic verification of rule efficacy against external enumeration.",
  },
  {
    id: "phishing-email-analysis",
    num: "02",
    title: "Phishing Email Analysis & Forensic Investigation",
    subtitle: "Header Deconstruction, RFC Authentication Auditing & IOC Extraction",
    period: "Jun'26 – Jul'26",
    category: "Email Forensics",
    technologies: ["Email Headers", "SPF", "DKIM", "DMARC", "IOC Analysis", "Regex / Python"],
    summary: "Conducted in-depth forensic investigations of malicious phishing emails impersonating legitimate commercial entities. Deconstructed RFC 5322 headers, validated SPF/DKIM/DMARC cryptographic alignments, mapped out attacker spoofing paths, and cataloged full Indicators of Compromise (IOCs).",
    scope: "Header Forensics · Domain Spoofing Detection · IOC Triage · Forensic Documentation",
    coverCode: {
      lang: "rfc822",
      lines: [
        [
          { tone: "cm", text: "# RFC 5322 Authentication Header Audit" },
        ],
        [
          { tone: "kw", text: "From:" },
          { tone: "pl", text: " \"Security Alert\" <" },
          { tone: "alert", text: "notice@legit-service.com" },
          { tone: "pl", text: ">" },
        ],
        [
          { tone: "kw", text: "Return-Path:" },
          { tone: "pl", text: " <" },
          { tone: "str", text: "bounce@host-392.attacker-infra.net" },
          { tone: "pl", text: ">" },
        ],
        [
          { tone: "kw", text: "Received-SPF:" },
          { tone: "alert", text: "Fail" },
          { tone: "pl", text: " (client-ip=" },
          { tone: "num", text: "198.51.100.42" },
          { tone: "pl", text: "; domain unmatched)" },
        ],
        [
          { tone: "kw", text: "DKIM-Signature:" },
          { tone: "alert", text: "none" },
          { tone: "cm", text: " // Cryptographic signature absent" },
        ],
        [
          { tone: "kw", text: "DMARC-Status:" },
          { tone: "alert", text: "fail" },
          { tone: "pl", text: " (action=reject; header.from mismatch)" },
        ],
        [
          { tone: "cm", text: "# Extracted URL IOC: credential harvest gateway" },
        ],
        [
          { tone: "fn", text: "ioc_triage" },
          { tone: "pl", text: " --url " },
          { tone: "str", text: "hxxps[://]auth-verify-security[.]info/login" },
        ],
        [
          { tone: "pass", text: "[VERDICT] Brand Impersonation / Credential Harvester" },
        ],
      ],
    },
    keyHighlights: [
      "Analyzed live phishing samples targeting users with urgent account-suspension and financial payment lures.",
      "Deconstructed headers: Sender, Reply-To, Return-Path, Message-ID, Received chain, and MIME parts.",
      "Evaluated SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC alignment failures to pinpoint sender spoofing.",
      "Extracted, categorized, and defanged IOCs: malicious domains, originating IPs, fake login URLs, and attachment hashes.",
      "Documented social engineering vectors: URL redirects, typo-squatting, disguised hyperlinks, and urgency triggers.",
      "Compiled formal forensic reports summarizing malicious intent, impact, and defensive IOC blocklists.",
    ],
    investigationSteps: [
      {
        phase: "Header & Envelope Inspection",
        description: "Parsed message envelope and hop-by-hop Received headers to trace the real initiating server IP.",
        tools: ["RFC 5322 Parsers", "Header Analysis Utilities"],
        outcomes: ["Revealed mismatch between displayed 'From' address and envelope 'Return-Path'", "Isolated untrusted relay IP in untrusted ASN"],
      },
      {
        phase: "Authentication Verification",
        description: "Interrogated SPF record TXT entries and examined cryptographic DKIM body hashes.",
        tools: ["SPF Checkers", "DNS DIG", "DKIM Verifiers"],
        outcomes: ["Confirmed sending MTA was unauthorized by legit domain's SPF record", "Identified broken DMARC alignment triggering policy reject"],
      },
      {
        phase: "IOC Extraction & Threat Profiling",
        description: "Harvested hyperlinks, analyzed redirect chains, and isolated credential harvesting landing pages.",
        tools: ["Defanging utilities", "Regex extraction", "IOC catalogs"],
        outcomes: ["Identified credential-harvesting portal targeting corporate SSO credentials", "Produced sanitized IOC list for firewall/email gateway blacklisting"],
      },
    ],
    verificationMetrics: [
      { label: "Authentication Vectors", detail: "SPF Fail + DKIM Absent + DMARC Reject" },
      { label: "Spoofing Method", detail: "Display Name Spoofing & Return-Path Divergence" },
      { label: "Threat Classification", detail: "Brand Impersonation / Credential Harvesting" },
      { label: "Forensic Deliverable", detail: "Sanitized IOC Blocklist & Case Timeline" },
    ],
    defensiveImpact: "Showcases essential SOC Tier 1/2 analytical capabilities in triage, malicious email inspection, header forensics, and proactive defense rule generation.",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "comptia-security-plus",
    num: "01",
    name: "CompTIA Security+",
    organization: "CompTIA",
    date: "Mar'26",
    badgeCode: "SEC+",
    credentialFocus: [
      "Security Operations & Monitoring",
      "Threat Detection & Analysis",
      "Network Infrastructure Defense",
      "Vulnerability Identification & Mitigation",
      "Incident Response & Forensics",
    ],
    description: "Industry-standard baseline credential validating core cybersecurity knowledge, defensive threat analysis, secure systems architecture, and operational risk response.",
  },
  {
    id: "aws-cloud-practitioner",
    num: "02",
    name: "AWS Cloud Practitioner",
    organization: "Amazon Web Services (AWS)",
    date: "Oct'26",
    version: "CLF-C02",
    badgeCode: "CLF-C02",
    credentialFocus: [
      "Cloud Security & Shared Responsibility Model",
      "Identity and Access Management (IAM)",
      "Cloud Infrastructure Architecture",
      "Network Isolation & VPC Fundamentals",
      "Compliance & Cloud Monitoring Telemetry",
    ],
    description: "Validates comprehensive understanding of AWS cloud infrastructure, cloud-native security controls, identity management, compliance frameworks, and resilient cloud architectures.",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Lovely Professional University",
    degree: "Computer Science and Engineering",
    period: "2022 – 2026",
    location: "Phagwara, Punjab",
    score: "6.4 CGPA",
    minor: "Minor Specialization: Cybersecurity",
    subjects: ["Cybersecurity", "Network Security", "Fundamentals of Information Technology"],
    details: "Undergraduate engineering curriculum covering computer science foundations, algorithms, data structures, operating systems, and distributed systems — with a minor specialization in Cybersecurity encompassing network security and information technology fundamentals.",
  },
  {
    institution: "Pushpalatha Matriculation Higher Secondary School",
    degree: "12th Standard — Higher Secondary (Science Stream)",
    period: "2020 – 2022",
    location: "Tirunelveli, Tamil Nadu",
    score: "72.9%",
    details: "Higher secondary education with a rigorous core curriculum in Physics, Chemistry, Mathematics, and Computer Science.",
  },
  {
    institution: "KVS Matriculation Higher Secondary School",
    degree: "10th Standard — Secondary School (Science Stream)",
    period: "2019 – 2020",
    location: "Virudhunagar, Tamil Nadu",
    score: "79.9%",
    details: "Foundational secondary schooling with distinction across Mathematics, Science, and Social Studies.",
  },
];
