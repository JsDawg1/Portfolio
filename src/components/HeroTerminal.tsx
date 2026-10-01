import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Play, RotateCcw, Pause } from 'lucide-react';

interface TerminalScenario {
  id: string;
  name: string;
  command: string;
  outputLines: {
    text: string;
    tone?: 'default' | 'highlight' | 'success' | 'alert' | 'comment' | 'cyan';
    delayMs?: number;
  }[];
}

const SCENARIOS: TerminalScenario[] = [
  {
    id: 'nmap-scan',
    name: 'nmap_audit.sh',
    command: 'nmap -sS -T4 -p 22,80,443 192.168.1.10',
    outputLines: [
      { text: 'Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-01 14:10 IST', tone: 'comment', delayMs: 150 },
      { text: 'Initiating SYN Stealth Scan against lab-host (192.168.1.10)...', tone: 'default', delayMs: 250 },
      { text: 'Scanning 3 ports [22, 80, 443]', tone: 'comment', delayMs: 200 },
      { text: '', tone: 'default', delayMs: 50 },
      { text: 'PORT      STATE SERVICE  REASON', tone: 'highlight', delayMs: 100 },
      { text: '22/tcp    open  ssh      syn-ack ttl 64 (Debian OpenSSH 9.2)', tone: 'success', delayMs: 150 },
      { text: '80/tcp    open  http     syn-ack ttl 64 (Nginx Reverse Proxy)', tone: 'success', delayMs: 150 },
      { text: '443/tcp   open  https    syn-ack ttl 64 (TLS 1.3 Active)', tone: 'success', delayMs: 150 },
      { text: '', tone: 'default', delayMs: 50 },
      { text: 'Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds.', tone: 'cyan', delayMs: 150 },
      { text: 'Status: [PASS] Attack surface verified against baseline policy.', tone: 'highlight', delayMs: 200 },
    ],
  },
  {
    id: 'ufw-rules',
    name: 'ufw_verify.sh',
    command: 'sudo ufw status verbose',
    outputLines: [
      { text: 'Status: active', tone: 'success', delayMs: 120 },
      { text: 'Logging: on (high)', tone: 'highlight', delayMs: 150 },
      { text: 'Default: deny (incoming), allow (outgoing), disabled (routed)', tone: 'default', delayMs: 180 },
      { text: 'New profiles: skip', tone: 'comment', delayMs: 80 },
      { text: '', tone: 'default', delayMs: 40 },
      { text: 'To                         Action      From', tone: 'highlight', delayMs: 100 },
      { text: '--                         ------      ----', tone: 'comment', delayMs: 60 },
      { text: '22/tcp (SSH)               ALLOW IN    192.168.1.0/24 (Mgmt CIDR)', tone: 'success', delayMs: 150 },
      { text: '80,443/tcp (Web)           ALLOW IN    Anywhere', tone: 'success', delayMs: 150 },
      { text: 'Anywhere                   REJECT IN   198.51.100.0/24 (Untrusted)', tone: 'alert', delayMs: 150 },
      { text: '', tone: 'default', delayMs: 40 },
      { text: '[UFW] Kernel packet logging active → /var/log/ufw.log', tone: 'cyan', delayMs: 180 },
    ],
  },
  {
    id: 'phishing-ioc',
    name: 'email_forensics.py',
    command: 'python3 -m forensics.triage --sample ./evidence/sample_09.eml',
    outputLines: [
      { text: '[+] Loading MIME structure and RFC 5322 envelope headers...', tone: 'default', delayMs: 140 },
      { text: '[*] Return-Path: <bounce@attacker-gateway.biz> (MISMATCH)', tone: 'alert', delayMs: 160 },
      { text: '[*] Header From: "Payroll Portal" <hr@legit-corp.org>', tone: 'default', delayMs: 120 },
      { text: '[-] SPF Result:  FAIL [client-ip: 198.51.100.42 not in SPF TXT]', tone: 'alert', delayMs: 200 },
      { text: '[-] DKIM Result: NONE [no valid cryptographic signature]', tone: 'alert', delayMs: 180 },
      { text: '[-] DMARC Audit: REJECT [strict alignment violated]', tone: 'alert', delayMs: 200 },
      { text: '', tone: 'default', delayMs: 40 },
      { text: '[+] IOC Isolated: hxxps[://]verify-payroll-login[.]info/auth', tone: 'highlight', delayMs: 180 },
      { text: '[VERDICT] High-Risk Credential Harvesting / Social Engineering', tone: 'alert', delayMs: 220 },
    ],
  },
];

export const HeroTerminal: React.FC = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const currentScenario = SCENARIOS[scenarioIndex];

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset and restart animation when scenario changes
  const startSimulation = (scenario: TerminalScenario) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTypedCommand('');
    setVisibleLines(0);
    setIsTyping(true);

    const fullCmd = scenario.command;
    let charIdx = 0;

    const typeNextChar = () => {
      if (charIdx <= fullCmd.length) {
        setTypedCommand(fullCmd.slice(0, charIdx));
        charIdx++;
        const variableDelay = 35 + Math.random() * 45;
        timeoutRef.current = setTimeout(typeNextChar, variableDelay);
      } else {
        // Typing finished; initiate execution pause
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          revealLines(0, scenario.outputLines);
        }, 300);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, 400);
  };

  const revealLines = (lineIdx: number, lines: typeof currentScenario.outputLines) => {
    if (lineIdx < lines.length) {
      setVisibleLines(lineIdx + 1);
      const delay = lines[lineIdx].delayMs || 150;
      timeoutRef.current = setTimeout(() => {
        revealLines(lineIdx + 1, lines);
      }, delay);
    } else {
      // Finished all lines; loop to next scenario after delay
      timeoutRef.current = setTimeout(() => {
        setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startSimulation(currentScenario);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scenarioIndex, isPaused]);

  const handleScenarioChange = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setScenarioIndex(index);
  };

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    startSimulation(currentScenario);
  };

  const getLineClass = (tone?: string) => {
    switch (tone) {
      case 'highlight':
        return 'text-[#F2C97D] font-semibold';
      case 'success':
        return 'text-[#7EF0C9]';
      case 'alert':
        return 'text-[#FF7B72] font-semibold';
      case 'comment':
        return 'text-[#5B6B63] italic';
      case 'cyan':
        return 'text-[#8ECAFC]';
      default:
        return 'text-[#D7E0DA]';
    }
  };

  return (
    <div className="w-full rounded-md overflow-hidden border border-[#24312B] bg-[#101513] shadow-2xl transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0A0E0C] border-b border-[#24312B] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 font-mono text-[11px] text-[#7EF0C9]">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[#8ECAFC]">blue-team@security-lab</span>
            <span className="text-[#5B6B63]">:</span>
            <span className="text-[#F2C97D]">~/defensive-ops</span>
          </div>
        </div>

        {/* Action badges and tabs */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-[#16201B] p-0.5 rounded border border-[#24312B]">
            {SCENARIOS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(idx)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                  idx === scenarioIndex
                    ? 'bg-[#0E8C7F] text-[#FAFAF8] font-medium'
                    : 'text-[#5B6B63] hover:text-[#D7E0DA]'
                }`}
                title={`Switch to ${s.name}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded text-[#5B6B63] hover:text-[#7EF0C9] transition-colors"
              title={isPaused ? "Resume simulation" : "Pause simulation"}
              aria-label={isPaused ? "Resume simulation" : "Pause simulation"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded text-[#5B6B63] hover:text-[#7EF0C9] transition-colors"
              title="Replay scan sequence"
              aria-label="Replay scan sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-[12px] leading-[1.7] text-[#D7E0DA] min-h-[310px] sm:min-h-[330px] flex flex-col justify-start overflow-x-auto">
        {/* Environment metadata */}
        <div className="flex items-center justify-between text-[10px] text-[#5B6B63] pb-2 mb-2 border-b border-[#24312B]/40 select-none">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#0E8C7F]" />
            ISOLATED_LAB_VNET: 192.168.1.0/24
          </span>
          <span className="text-[#7EF0C9] bg-[#0E8C7F]/20 px-1.5 py-0.5 rounded text-[9.5px]">
            ACTIVE TELEMETRY
          </span>
        </div>

        {/* Command Prompt Line */}
        <div className="flex items-start text-left">
          <span className="text-[#7EF0C9] select-none font-bold mr-2">
            lab@sec-deb13:~$
          </span>
          <span className="text-[#FAFAF8] font-semibold break-all">
            {typedCommand}
            {isTyping && <span className="tw-caret" />}
          </span>
        </div>

        {/* Executing Spinner (briefly shown before lines reveal) */}
        {!isTyping && visibleLines === 0 && (
          <div className="text-[10px] text-[#8ECAFC] my-1 flex items-center gap-2">
            <span className="inline-block animate-spin">⠋</span>
            <span>Parsing network packets & validating rules...</span>
          </div>
        )}

        {/* Output lines */}
        <div className="mt-2 space-y-0.5">
          {currentScenario.outputLines.slice(0, visibleLines).map((line, idx) => (
            <div key={idx} className={`${getLineClass(line.tone)} whitespace-pre font-mono`}>
              {line.text === '' ? '\u00A0' : line.text}
            </div>
          ))}
        </div>

        {/* Finished status with prompt ready for next command */}
        {!isTyping && visibleLines >= currentScenario.outputLines.length && (
          <div className="flex items-center mt-3 pt-2 border-t border-[#24312B]/40 text-left">
            <span className="text-[#7EF0C9] select-none font-bold mr-2">
              lab@sec-deb13:~$
            </span>
            <span className="tw-caret" />
          </div>
        )}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="px-4 py-2 bg-[#0C110F] border-t border-[#24312B] flex items-center justify-between text-[10px] font-mono text-[#5B6B63] select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7EF0C9] animate-pulse" />
          <span>SIMULATED TELEMETRY · HARMLESS DEMO</span>
        </div>
        <div className="text-[#5B6B63] hover:text-[#7EF0C9] transition-colors">
          TARGET_CIDR: 192.168.1.10
        </div>
      </div>
    </div>
  );
};
