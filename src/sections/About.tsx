import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Shield, Radio, Terminal, Compass, Layers, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
            01 / Profile & Philosophy
          </p>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
            Defensive engineering grounded in network fundamentals and systematic threat verification.
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start text-left">
          {/* Narrative Column */}
          <div className="space-y-6 font-sans text-ink/80 leading-relaxed text-base sm:text-lg">
            <p>
              I am a <strong className="text-ink font-semibold">Computer Science and Engineering graduate</strong> from Lovely Professional University and a <strong className="text-ink font-semibold">CompTIA Security+ certified</strong> cybersecurity practitioner. My focus centers on defensive security operations, threat detection, and telemetry analysis.
            </p>

            <p>
              Rather than theoretical concepts, my experience is rooted in hands-on controlled laboratory environments. I have architected and audited host firewalls on Debian 13 systems with UFW, executed active service enumerations with Nmap and Netcat from Kali Linux, and performed deep forensic dissections of phishing attacks using RFC 5322 email headers and SPF/DKIM/DMARC authentication analysis.
            </p>

            <p>
              My analytical workflow leverages tools including <strong className="text-ink font-semibold">Nmap, Wireshark, Burp Suite, Metasploit, UFW, Python, and Splunk</strong> for security event ingestion and log interrogation. I am committed to advancing operational readiness within Blue Team and Security Operations Center (SOC) environments.
            </p>

            {/* Target Roles Pill Box */}
            <div className="pt-4 border-t border-hairline">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50 block mb-3">
                Target Operational Roles
              </span>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.targetRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-paper hairline font-mono text-[11.5px] uppercase tracking-wider text-ink font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pine" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Metadata & Focus Box */}
          <div className="space-y-4">
            <div className="p-5 rounded-md hairline bg-paper-sub space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-pine font-semibold flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-pine" />
                  DEFENSIVE CORE
                </span>
                <span className="font-mono text-[10px] text-ink/40 tracking-wider">
                  VERIFIED CV DATA
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Security Telemetry & Monitoring",
                    desc: "Interrogating network streams, firewall drops, and authentication anomalies.",
                  },
                  {
                    title: "Vulnerability Assessment",
                    desc: "Probing services via Nmap, checking exposed listening ports, and evaluating misconfigurations.",
                  },
                  {
                    title: "Header & IOC Forensics",
                    desc: "Extracting malicious infrastructure, tracking sender impersonation, and evaluating email crypto.",
                  },
                  {
                    title: "Cloud & Network Hardening",
                    desc: "AWS foundational security posture, IAM least privilege, and host network boundary policies.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="text-left">
                    <h4 className="font-mono text-[12px] font-bold text-ink flex items-center gap-2">
                      <span className="text-pine">0{idx + 1}.</span>
                      {item.title}
                    </h4>
                    <p className="text-xs text-ink/65 font-sans mt-0.5 pl-5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Geolocation & Radar Card */}
            <div className="p-4 rounded hairline bg-paper flex items-center justify-between text-xs font-mono text-ink/60">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-pine" />
                <span>COORDINATES:</span>
              </div>
              <span className="font-semibold text-ink">{PERSONAL_INFO.coordinates}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
