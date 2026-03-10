# 🚀 Deepak Singh — Developer Portfolio (Ultra Futuristic Edition)

A stunning React + Three.js freelancing portfolio with full VFX & animations.

## ✨ Features Included

| Feature | Description |
|---|---|
| 🌐 Neural Background | AI neural network canvas with mouse repulsion |
| 🪐 3D Skill Galaxy | Rotating skill planets, orbiting satellites, neural links |
| 🎮 3D Hero Scene | Floating icosahedron with sparkles, distort shader |
| ✍️ Typewriter | Animated role cycling with blinking cursor |
| 🖱️ Custom Cursor | Cyan dot + expanding ring + ambient glow |
| 📜 Scroll Animations | Framer Motion fade/slide on every section |
| 🔢 Count-Up Stats | Numbers animate when scrolled into view |
| ⚡ Service Cards | Hover lift, icon spin, glow effects |
| 📡 HUD Grid | Cyberpunk moving grid overlay |
| 🔦 Scan Line | Animated scan line across screen |
| 🌌 Galaxy Particles | 4000 colorful WebGL particles |
| 🛰️ Orbiting Satellites | Three.js trail satellites orbiting the galaxy |
| 🧠 Neural Links | Lines connecting nearby skill planets |
| 🏷️ Hover Labels | HTML overlays inside Three.js scene |

## 🛠️ Tech Stack

- React 18
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei (Float, Stars, Trail, Html, Sparkles, MeshDistortMaterial)
- Framer Motion
- Orbitron + Rajdhani fonts (Google Fonts)

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── App.jsx                    ← Root (single default export)
├── main.jsx                   ← React entry point
├── index.css                  ← Global styles + animations
└── components/
    ├── Portfolio.jsx           ← Main page (all sections)
    ├── CursorGlow.jsx         ← Custom cursor + glow
    ├── NeuralBackground.jsx   ← Canvas neural network
    ├── Hero3D.jsx             ← Three.js hero scene
    └── SkillGalaxy.jsx        ← 3D skill planet galaxy
```

## 🎨 Customization

1. **Your info** — Edit `Portfolio.jsx`, update name, email, LinkedIn, GitHub
2. **Skills** — Edit `SKILLS_DATA` array in `SkillGalaxy.jsx`
3. **Services** — Edit `SERVICES` array in `Portfolio.jsx`
4. **Colors** — Change `#00ffff` (cyan) to any color in `index.css`
5. **Add photo** — Replace the emoji in Hero3D or add an `<img>` element

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy on Vercel, Netlify, or GitHub Pages.

---

Built by **Deepak Singh** — MCA Graduate (AKTU) with 4+ years experience at IYCWorld Softinfrastructure Pvt. Ltd.
