# S.U. Jaya Harish — Personal Portfolio

> High-performance personal portfolio tailored for **S.U. Jaya Harish**, focused on **Cybersecurity, SOC / Blue Team Operations, Network Defense, Firewall Hardening, and Threat Analysis**.

Adapted from the reference design language at [fag2q65ersodm.ok.kimi.link](https://fag2q65ersodm.ok.kimi.link/), featuring:
- Paper & Ink editorial typography (`Inter Tight`, `Inter`, `JetBrains Mono`)
- Industrial hairline borders, metric score plates, and technical metadata
- Interactive simulated cybersecurity terminal (Nmap audit, UFW rules, and email forensics)
- Project case library with telemetry code blocks and deep-dive investigation overlays
- Touch & drag photography carousel ready for personal photo assets
- Full responsive optimization, Lenis smooth scrolling, custom cursor, and accessible reduced-motion support
- Monogram easter egg (click `JH_` 5 times for CRT terminal mode with scanlines)

---

## 🚀 Running the Project

The application runs locally using **Vite + React + TypeScript + Tailwind CSS v4**.

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run local development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
```

Development server runs by default at `http://localhost:5173/`.

---

## 📸 Adding Your Photography Later

The photography section is fully functional with a 60fps horizontal carousel, momentum drag, keyboard navigation, and a full-screen lightbox modal with camera telemetry.

When you are ready to add your actual photographs:
1. Place your photo image files into the [`public/photos/`](./public/photos/) directory (e.g. `photo-01.jpg`, `photo-02.jpg`, etc.).
2. Open [`src/data/photography.ts`](./src/data/photography.ts) and set the `imageSrc` property:
   ```ts
   imageSrc: "/photos/photo-01.jpg"
   ```
3. The gallery will immediately render your high-resolution images within the photography frames and full-screen lightbox!

---

## 🔒 Source of Truth & Information Integrity

All portfolio data is strictly sourced from S.U. Jaya Harish's verified CV:
- **Certifications**: CompTIA Security+ (Mar'26), AWS Cloud Practitioner CLF-C02 (Oct'26)
- **Education**: Lovely Professional University (B.Tech CSE, 2022–2026), Pushpalatha Matriculation HSS (12th Science 75.8%), KVS Matriculation HSS (10th Science 79.9%)
- **Projects**:
  1. *Linux Firewall Configuration & Network Security Lab* (Debian 13, UFW, Kali Linux, Nmap, Netcat, SSH)
  2. *Phishing Email Analysis & Investigation* (Email Headers, SPF, DKIM, DMARC, IOC Extraction)
- **Contact**: `jayaharishsu@gmail.com` · `+91-6382945099` · Chennai, Tamil Nadu (Coordinates: `8°57'43.0"N 77°16'11.8"E`)
- **Profiles**: [GitHub: JsDawg1](https://github.com/JsDawg1) · [LinkedIn: jaya-harish-s-u](https://linkedin.com/in/jaya-harish-s-u)
