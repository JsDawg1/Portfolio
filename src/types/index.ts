export type ToneType = 'pl' | 'kw' | 'str' | 'fn' | 'num' | 'cm' | 'alert' | 'pass';

export interface CodeToken {
  tone: ToneType;
  text: string;
}

export interface CodeCover {
  lang: string;
  lines: CodeToken[][];
}

export interface ProjectCase {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  period: string;
  category: 'Network Security' | 'Email Forensics';
  technologies: string[];
  summary: string;
  scope: string;
  coverCode: CodeCover;
  keyHighlights: string[];
  investigationSteps: {
    phase: string;
    description: string;
    tools: string[];
    outcomes: string[];
  }[];
  verificationMetrics: {
    label: string;
    detail: string;
  }[];
  defensiveImpact: string;
}

export interface CertificationItem {
  id: string;
  num: string;
  name: string;
  organization: string;
  date: string;
  version?: string;
  badgeCode: string;
  credentialFocus: string[];
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score?: string;
  details?: string;
  minor?: string;
  subjects?: string[];
}

export interface SkillItem {
  name: string;
  level?: 'Advanced' | 'Proficient' | 'Working Exposure' | 'Core';
  highlight?: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  focalLength: string;
  aperture: string;
  shutter: string;
  iso: string;
  location?: string;
  aspectRatio: string;
  imageSrc?: string; // When user adds real image later
  caption?: string;
}
