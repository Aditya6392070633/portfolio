import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CursorGlow from './CursorGlow'
import NeuralBackground from './NeuralBackground'
import Hero3D from './Hero3D'
import SkillGalaxy from './SkillGalaxy'


const FORMSPREE_ID  = 'xvzwkoge'   
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`
const YOUR_EMAIL    = 'deepak954807@gmail.com'

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV = ['Home','About','Skills','Services','Experience','Contact']

const SERVICES = [
  { icon:'🏫', title:'School ERP Development',      desc:'End-to-end School Management Systems — fee management, attendance, timetable, results, parent portal & more. Built with 4+ years of real-world IYCWorld experience.', tag:'Specialist', color:'#ff6b35' },
  { icon:'🌐', title:'Web Application Development', desc:'Modern responsive web apps using React, Node.js, PHP, and Laravel. From MVPs to full-scale platforms tailored to your business needs.',                                 tag:'Popular',    color:'#00d4aa' },
  { icon:'📱', title:'Mobile-Ready Portals',        desc:'WhatsApp-integrated portals, mobile apps, and dashboards that keep users connected on any device — designed for schools & enterprises.',                                tag:'In Demand',  color:'#7c3aed' },
  { icon:'🗄️', title:'Database Design & APIs',      desc:'Robust MySQL / MongoDB schemas and RESTful APIs ensuring your data is fast, secure, and infinitely scalable for growing platforms.',                                    tag:'Core',       color:'#2563eb' },
  { icon:'🤖', title:'AI-Integrated Features',      desc:'BI tools, fee forecast modules, advanced search, and AI-driven insights embedded seamlessly into your existing platforms.',                                            tag:'New',        color:'#f59e0b' },
  { icon:'🛠️', title:'Legacy System Modernization', desc:'Migrate and upgrade outdated school or business software to modern cloud-ready stacks — zero data loss guaranteed.',                                                   tag:'Critical',   color:'#ef4444' },
]

const STATS = [
  { num: 4,   suffix:'+', label:'Years at IYCWorld',   icon:'🏢' },
  { num: 100, suffix:'+', label:'ERP Modules Deployed', icon:'📦' },
  { num: 2,   suffix:'+', label:'Countries Served',    icon:'🌍' },
  { num: 50,  suffix:'+', label:'Happy Clients',       icon:'⭐' },
]

const EXPERIENCE = [
  {
    year:'2020 – Present',
    role:'Software Developer',
    company:'IYCWorld Softinfrastructure Pvt. Ltd.',
    points:[
      'Developed and maintained 100+ School ERP modules across India & UAE',
      'Built fee management, payroll, transport, and hostel modules used by 50+ schools',
      'Integrated WhatsApp, SMS & mobile app communication systems',
      'Worked on AI-powered BI tools and fee collection forecast features',
      'Supported partner schools including DPS Bopal (India) and DPS Bahrain (UAE)',
    ],
  },
  {
    year:'2018 – 2020',
    role:'MCA Student',
    company:'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    points:[
      'Master of Computer Applications — Software Engineering specialization',
      'Deep expertise in algorithms, DBMS, web technologies & computer networks',
      'Built multiple academic projects simulating real-world ERP systems',
    ],
  },
]

const TYPEWORDS = ['School ERPs','Web Applications','AI-Powered Tools','REST APIs','Full-Stack Solutions','ERP Modules']

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wi, setWi]     = useState(0)
  const [ci, setCi]     = useState(0)
  const [del, setDel]   = useState(false)

  useEffect(() => {
    const word = words[wi]
    let t
    if (!del && ci < word.length)  t = setTimeout(() => setCi(c => c+1), 85)
    else if (!del)                  t = setTimeout(() => setDel(true), 1800)
    else if (del && ci > 0)         t = setTimeout(() => setCi(c => c-1), 42)
    else { setDel(false); setWi(i => (i+1) % words.length) }
    setText(word.slice(0, ci))
    return () => clearTimeout(t)
  }, [ci, del, wi, words])

  return text
}

function useCountUp(end, trigger) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let cur = 0
    const step = Math.max(1, Math.ceil(end / 50))
    const id = setInterval(() => {
      cur = Math.min(cur + step, end)
      setN(cur)
      if (cur >= end) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [end, trigger])
  return n
}

// ─── REUSABLE ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, dir = 'up', className = '' }) {
  const translate =
    dir === 'up'    ? { y: 40 } :
    dir === 'left'  ? { x:-40 } :
    dir === 'right' ? { x: 40 } : {}

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...translate }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ label, title, accent }) {
  return (
    <motion.div
      style={{ textAlign:'center', marginBottom: 64 }}
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.3 }}
      transition={{ duration:0.6 }}
    >
      <span style={styles.sectionLabel}>{label}</span>
      <h2 style={styles.sectionTitle}>
        {title} <span style={{ color:'#00ffff' }}>{accent}</span>
      </h2>
      <motion.div
        style={styles.sectionLine}
        initial={{ width:0 }}
        whileInView={{ width:80 }}
        viewport={{ once:true }}
        transition={{ duration:0.9, delay:0.3 }}
      />
    </motion.div>
  )
}

function StatBox({ num, suffix, label, trigger }) {
  const n = useCountUp(num, trigger)
  return (
    <div style={styles.statBox}>
      <div style={styles.statNum}>{n}{suffix}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  )
}

// ─── MAIN ───────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive]       = useState('Home')
  const [scrolled, setScrolled]   = useState(false)
  const [statsVis, setStatsVis]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hoverSvc, setHoverSvc]   = useState(null)
  const [form, setForm]           = useState({ name:'', email:'', message:'' })
  const [sent, setSent]           = useState(false)
  const [sending, setSending]     = useState(false)
  const [error, setError]         = useState('')
  const statsRef = useRef(null)
  const typed = useTypewriter(TYPEWORDS)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      NAV.forEach(l => {
        const el = document.getElementById(l.toLowerCase())
        if (el && el.getBoundingClientRect().top < 180) setActive(l)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true) }, { threshold:0.4 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth' })
    setMenuOpen(false)
  }

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('⚠️ Please fill all fields.')
      setTimeout(() => setError(''), 3000)
      return
    }
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      // Fallback: open mail client if Formspree not configured yet
      window.open(
        `mailto:${YOUR_EMAIL}?subject=New Client Message from ${encodeURIComponent(form.name)}&body=Name: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0A%0AMessage:%0A${encodeURIComponent(form.message)}`,
        '_blank'
      )
      setSent(true)
      setForm({ name:'', email:'', message:'' })
      setTimeout(() => setSent(false), 5000)
      return
    }
    setSending(true)
    setError('')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `New Client Message from ${form.name}`,
        }),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name:'', email:'', message:'' })
        setTimeout(() => setSent(false), 5000)
      } else {
        throw new Error('Server error')
      }
    } catch (err) {
      setError(`❌ Failed. Email me directly: ${YOUR_EMAIL}`)
      setTimeout(() => setError(''), 6000)
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={styles.root}>
      <CursorGlow />
      <NeuralBackground />

      {/* HUD grid overlay */}
      <div style={styles.hudGrid} />

      {/* Scan line */}
      <div style={styles.scanLine} />

      {/* ── NAV ── */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navBrand}>
          <div style={styles.navLogoRing} />
          <span style={styles.navLogo}>{'<DS/>'}</span>
        </div>

        <div style={styles.navLinks}>
          {NAV.map((l, i) => (
            <motion.button
              key={l}
              data-hover
              onClick={() => go(l)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity:0, y:-14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{
                ...styles.navLink,
                ...(active === l ? styles.navLinkActive : {}),
              }}
            >
              {l}
              {active === l && (
                <motion.div layoutId="navUnderline" style={styles.navUnderline} />
              )}
            </motion.button>
          ))}
        </div>

        <button style={styles.hamburger} data-hover onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            style={styles.mobileMenu}
          >
            {NAV.map(l => (
              <button key={l} data-hover onClick={() => go(l)} style={styles.mobileLink}>{l}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="home" style={styles.hero}>
        {/* 3D scene on the right */}
        <div style={styles.hero3D}>
          <Hero3D />
        </div>

        {/* Ambient orbs */}
        <div style={{ ...styles.orb, top:'15%', left:'5%',  width:300, height:300, background:'radial-gradient(circle,rgba(0,255,255,.1) 0%,transparent 70%)', animation:'energyPulse 6s ease-in-out infinite' }} />
        <div style={{ ...styles.orb, bottom:'20%', right:'55%', width:200, height:200, background:'radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)', animation:'energyPulse 8s ease-in-out infinite reverse' }} />

        <div style={styles.heroContent}>
          <motion.div
            style={styles.heroBadge}
            initial={{ opacity:0, x:-30 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6 }}
          >
            <span style={styles.heroBadgeDot} />
            🎓 Deepak Singh · MCA · AKTU &nbsp;·&nbsp; Available for Freelance
          </motion.div>

          <motion.h1
            style={{ ...styles.heroTitle, fontSize:'clamp(16px,2.5vw,28px)', color:'#00ffff', marginBottom:4, letterSpacing:3 }}
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.05 }}
          >
            DEEPAK SINGH
          </motion.h1>

          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.1 }}
          >
            Building <span style={{ color:'#00ffff', textShadow:'0 0 30px rgba(0,255,255,0.7)' }}>Smart</span>
          </motion.h1>

          <motion.h1
            style={{ ...styles.heroTitle, minHeight:'1.15em', marginBottom: 24 }}
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.18 }}
          >
            <span style={styles.heroTyped}>{typed}</span>
            <span style={{ color:'#00ffff', animation:'blink .9s step-end infinite' }}>|</span>
          </motion.h1>

          <motion.p
            style={styles.heroSub}
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.28 }}
          >
            Full-Stack Developer with{' '}
            <strong style={{ color:'#e0e0ff' }}>4+ years at IYCWorld</strong> — crafting School ERPs,
            web applications & AI-powered solutions across{' '}
            <strong style={{ color:'#00ffff' }}>India & the UAE</strong>.
          </motion.p>

          <motion.div
            style={styles.heroBtns}
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.36 }}
          >
            <motion.button
              data-hover
              whileHover={{ scale:1.06, boxShadow:'0 0 40px rgba(0,255,255,0.6)' }}
              whileTap={{ scale:0.96 }}
              style={styles.btnPrimary}
              onClick={() => go('Services')}
            >
              🚀 My Services
            </motion.button>
            <motion.button
              data-hover
              whileHover={{ scale:1.06, borderColor:'#00ffff', color:'#00ffff' }}
              whileTap={{ scale:0.96 }}
              style={styles.btnOutline}
              onClick={() => go('Contact')}
            >
              💬 Hire Me
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            style={styles.statsRow}
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.45 }}
          >
            {STATS.map(s => <StatBox key={s.label} {...s} trigger={statsVis} />)}
          </motion.div>
        </div>

        {/* Wave */}
        <div style={styles.heroWave}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width:'100%', height:80 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#020210" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <SectionHeader label="About Me" title="Who I Am" accent="& What I Bring" />
          <div style={styles.aboutGrid}>
            <FadeIn dir="left">
              <div style={styles.glassCard}>
                <div style={styles.cardGlow} />
                {[
                  <>I'm <strong style={{ color:'#00ffff' }}>Deepak Singh</strong>, a passionate <strong style={{ color:'#00ffff' }}>Full-Stack Developer</strong> and MCA graduate from AKTU with over <strong style={{ color:'#ff6b35' }}>4 years of professional experience</strong> at IYCWorld Softinfrastructure Pvt. Ltd. — one of India's leading School ERP companies.</>,
                  <>At IYCWorld, I've deployed <strong style={{ color:'#7c3aed' }}>100+ ERP modules</strong> across schools in India and the UAE — from fee management and attendance to AI-powered BI tools and WhatsApp integrations.</>,
                  <>Now I bring enterprise-grade experience to freelance clients who need reliable, scalable solutions that <strong style={{ color:'#00ffff' }}>actually work in the real world</strong>.</>,
                ].map((t, i) => (
                  <p key={i} style={styles.aboutText}>{t}</p>
                ))}
                <div style={styles.tagsRow}>
                  {['Problem Solver','Clean Code','On-Time','Client-Focused','India-UAE Exp.'].map((t, i) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale:1.08 }}
                      style={styles.chip}
                      data-hover
                    >{t}</motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:'🎓', title:'Education',      desc:'MCA — Dr. A.P.J. Abdul Kalam Technical University (AKTU)' },
                { icon:'🏢', title:'Experience',     desc:'4+ Years — IYCWorld Softinfrastructure Pvt. Ltd.' },
                { icon:'🌍', title:'Clients Served', desc:'Schools across India & UAE (DPS Bopal, DPS Bahrain & more)' },
                { icon:'💡', title:'Specialization', desc:'School ERP, Web Apps, AI Integration, REST APIs' },
              ].map((item, i) => (
                <FadeIn key={item.title} dir="right" delay={i * 0.1}>
                  <motion.div
                    data-hover
                    whileHover={{ x:8, borderColor:'rgba(0,255,255,0.4)' }}
                    style={styles.infoCard}
                  >
                    <span style={{ fontSize:28 }}>{item.icon}</span>
                    <div>
                      <div style={styles.infoTitle}>{item.title}</div>
                      <div style={styles.infoDesc}>{item.desc}</div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILL GALAXY ── */}
      <section id="skills" style={{ ...styles.section, background:'#010108', padding:'80px 0' }}>
        <div style={styles.container}>
          <SectionHeader label="Technical Skills" title="3D Skill" accent="Galaxy" />
          <p style={{ textAlign:'center', color:'#667', marginBottom:32, fontSize:15, letterSpacing:1 }}>
            🖱 DRAG TO ROTATE · HOVER PLANETS FOR SKILL NAMES
          </p>
        </div>
        <div style={{ width:'100%', height:'70vh', position:'relative' }}>
          <SkillGalaxy />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <SectionHeader label="What I Offer" title="My Services" accent="For You" />
          <div style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <motion.div
                  data-hover
                  whileHover={{ y:-8, boxShadow:`0 24px 60px ${s.color}22` }}
                  onHoverStart={() => setHoverSvc(i)}
                  onHoverEnd={() => setHoverSvc(null)}
                  style={{
                    ...styles.serviceCard,
                    borderColor: hoverSvc === i ? `${s.color}55` : 'rgba(255,255,255,0.06)',
                    background:  hoverSvc === i ? `${s.color}06` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span style={{ ...styles.serviceTag, background:`${s.color}18`, color:s.color, border:`1px solid ${s.color}33` }}>
                    {s.tag}
                  </span>
                  <motion.div
                    style={styles.serviceIcon}
                    animate={{ rotate: hoverSvc === i ? -8 : 0, scale: hoverSvc === i ? 1.2 : 1 }}
                    transition={{ type:'spring', stiffness:300 }}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 style={styles.serviceTitle}>{s.title}</h3>
                  <p style={styles.serviceDesc}>{s.desc}</p>
                  <motion.button
                    data-hover
                    whileHover={{ scale:1.04, borderColor:s.color, color:s.color }}
                    style={styles.serviceBtn}
                    onClick={() => go('Contact')}
                  >
                    Get a Quote →
                  </motion.button>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ ...styles.section, background:'#010108' }}>
        <div style={styles.container}>
          <SectionHeader label="Work History" title="My Experience" accent="& Education" />
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.role} dir="left" delay={i * 0.15}>
                <div style={{ position:'relative', paddingLeft:52, marginBottom:48 }}>
                  <div style={{ ...styles.timelineDot, animation:'dotPulse 2s ease-in-out infinite' }} />
                  {i < EXPERIENCE.length-1 && <div style={styles.timelineLine} />}
                  <motion.div
                    whileHover={{ borderColor:'rgba(0,255,255,0.3)' }}
                    style={styles.timelineCard}
                  >
                    <div style={styles.timelineYear}>{e.year}</div>
                    <div style={styles.timelineRole}>{e.role}</div>
                    <div style={styles.timelineCompany}>{e.company}</div>
                    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                      {e.points.map((p, j) => (
                        <li key={j} style={styles.timelinePoint}>
                          <span style={{ color:'#00ffff', flexShrink:0, marginTop:2 }}>▸</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IYC Strip */}
      <div style={styles.iycStrip}>
        <span style={{ fontSize:14, color:'#667' }}>
          🏢 Previously worked at{' '}
          <a href="https://iycworld.net" target="_blank" rel="noreferrer" data-hover
            style={{ color:'#00ffff', fontWeight:700, textDecoration:'none' }}>
            IYCWorld Softinfrastructure Pvt. Ltd.
          </a>
          {' '}— India's leading School ERP platform serving India & UAE
        </span>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <SectionHeader label="Get In Touch" title="Contact Me" accent="Let's Work" />
          
          <div style={styles.contactGrid}>
            <FadeIn dir="left">
              <h3 style={styles.contactHeading}>Ready to build something incredible?</h3>
              <p style={styles.contactSub}>
                School ERP, custom web app, or AI-powered dashboard — I deliver professional,
                scalable solutions with clear communication and on-time delivery.
              </p>
              {[
                { icon:'📧', label:'Email',    val:'deepak954807@gmail.com' },
                { icon:'📱', label:'WhatsApp', val:'+91 6392070633' },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  data-hover
                  whileHover={{ x:6, borderColor:'rgba(0,255,255,0.35)' }}
                  style={styles.contactItem}
                  initial={{ opacity:0, x:-30 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span style={{ fontSize:24 }}>{c.icon}</span>
                  <div>
                    <div style={styles.contactLabel}>{c.label}</div>
                    <div style={styles.contactVal}>{c.val}</div>
                  </div>
                </motion.div>
              ))}
            </FadeIn>

            <FadeIn dir="right">
              <h3 style={styles.contactHeading}>Fill your details below and I will get back to you soon.</h3>
              <div style={styles.formCard}>
                {['name','email','message'].map(f => {
                  const El = f === 'message' ? 'textarea' : 'input'
                  return (
                    <El
                      key={f}
                      rows={f === 'message' ? 5 : undefined}
                      type={f === 'email' ? 'email' : 'text'}
                      placeholder={`Your ${f.charAt(0).toUpperCase()+f.slice(1)} *`}
                      value={form[f]}
                      onChange={e => setForm({ ...form, [f]:e.target.value })}
                      onFocus={e => { e.target.style.borderColor='rgba(0,255,255,0.6)'; e.target.style.boxShadow='0 0 0 3px rgba(0,255,255,0.08)' }}
                      onBlur={e  => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none' }}
                      style={styles.input}
                    />
                  )
                })}
                {error && (
                  <div style={{ background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', color:'#fca5a5', padding:'10px 16px', borderRadius:10, fontSize:13, letterSpacing:0.5 }}>
                    {error}
                  </div>
                )}
                <motion.button
                  data-hover
                  whileHover={{ scale: sending ? 1 : 1.03, boxShadow:'0 0 40px rgba(0,255,255,0.5)' }}
                  whileTap={{ scale: sending ? 1 : 0.97 }}
                  style={{
                    ...styles.btnPrimary,
                    width:'100%',
                    justifyContent:'center',
                    background: sent
                      ? 'linear-gradient(135deg,#00d4aa,#059669)'
                      : sending
                      ? 'linear-gradient(135deg,#334,#445)'
                      : 'linear-gradient(135deg,#00ffff,#7c3aed)',
                    opacity: sending ? 0.7 : 1,
                    cursor: sending ? 'not-allowed' : 'none',
                  }}
                  onClick={submit}
                  disabled={sending}
                >
                  {sent ? '✅ Message Sent to Deepak!' : sending ? '⏳ Sending...' : '🚀 Send Message'}
                </motion.button>
                <p style={{ textAlign:'center', fontSize:12, color:'#334', marginTop:4 }}>
                  Or email directly:{' '}
                  <a href={`mailto:${YOUR_EMAIL}`} style={{ color:'#00ffff', textDecoration:'none' }} data-hover>
                    {YOUR_EMAIL}
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span style={styles.navLogo}>{'<DS/>'}</span>
          <p style={styles.footerText}>© 2025 · <strong style={{color:'#00ffff'}}>Deepak Singh</strong> · MCA Graduate & Full-Stack Developer · Built with React + Three.js</p>
          <p style={{ ...styles.footerText, marginTop:6, color:'#223' }}>
            Experienced at{' '}
            <a href="https://iycworld.net" target="_blank" rel="noreferrer" style={{ color:'#00ffff', textDecoration:'none' }}>
              IYCWorld Softinfrastructure Pvt. Ltd.
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = {
  root: {
    fontFamily: "'Rajdhani', sans-serif",
    background: '#020210',
    color: '#c0c0d0',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative',
  },
  hudGrid: {
    position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    backgroundImage: 'linear-gradient(rgba(0,255,255,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(0,255,255,0.025) 1px,transparent 1px)',
    backgroundSize: '40px 40px',
    animation: 'gridMove 8s linear infinite',
    opacity: 0.5,
  },
  scanLine: {
    position: 'fixed', left: 0, right: 0, height: 2, zIndex: 1, pointerEvents: 'none',
    background: 'linear-gradient(90deg,transparent,rgba(0,255,255,0.15),transparent)',
    animation: 'scanline 6s linear infinite',
  },
  orb: { position: 'absolute', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 },

  // NAV
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px', transition: 'all .4s',
  },
  navScrolled: {
    background: 'rgba(2,2,16,0.96)', backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,255,255,0.1)', padding: '13px 48px',
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: 10, position: 'relative' },
  navLogoRing: {
    position: 'absolute', width: 44, height: 44, borderRadius: '50%',
    border: '1px solid rgba(0,255,255,0.3)', left: -4, top: -8,
    animation: 'logoSpin 8s linear infinite',
  },
  navLogo: {
    fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 900,
    color: '#00ffff', letterSpacing: 1, textShadow: '0 0 20px rgba(0,255,255,0.6)',
    position: 'relative', zIndex: 1,
  },
  navLinks: { display: 'flex', gap: 2 },
  navLink: {
    background: 'none', border: 'none', color: '#667', fontSize: 14, fontWeight: 600,
    padding: '8px 16px', borderRadius: 6, cursor: 'none', transition: 'color .2s',
    fontFamily: "'Rajdhani',sans-serif", position: 'relative', letterSpacing: 1,
    textTransform: 'uppercase',
  },
  navLinkActive: { color: '#00ffff' },
  navUnderline: {
    position: 'absolute', bottom: 4, left: '20%', right: '20%', height: 2,
    background: '#00ffff', borderRadius: 1, boxShadow: '0 0 8px #00ffff',
  },
  hamburger: {
    display: 'none', background: 'none', border: 'none', color: '#00ffff',
    fontSize: 22, cursor: 'none',
  },
  mobileMenu: {
    position: 'fixed', top: 60, left: 0, right: 0, zIndex: 999,
    background: 'rgba(2,2,20,.97)', backdropFilter: 'blur(20px)',
    display: 'flex', flexDirection: 'column', padding: 20, gap: 4,
    borderBottom: '1px solid rgba(0,255,255,.15)',
  },
  mobileLink: {
    background: 'none', border: 'none', color: '#c0c0d0', fontSize: 16,
    padding: '12px 16px', textAlign: 'left', cursor: 'none',
    borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1,
  },

  // HERO
  hero: {
    minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg,#020210 0%,#060620 55%,#020210 100%)',
  },
  hero3D: {
    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
  },
  heroContent: {
    maxWidth: 680, padding: '140px 48px 80px', position: 'relative', zIndex: 1,
  },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.2)',
    color: '#00d4aa', padding: '8px 20px', borderRadius: 50, fontSize: 13,
    fontWeight: 600, marginBottom: 28, letterSpacing: 1,
  },
  heroBadgeDot: {
    width: 8, height: 8, borderRadius: '50%', background: '#00ff88',
    boxShadow: '0 0 10px #00ff88', animation: 'blink 1.4s ease-in-out infinite',
    display: 'inline-block',
  },
  heroTitle: {
    fontFamily: "'Orbitron', monospace", fontSize: 'clamp(32px,5vw,62px)',
    fontWeight: 900, lineHeight: 1.08, letterSpacing: -1, marginBottom: 6,
    color: '#e0e0ff', animation: 'flicker 8s ease-in-out infinite',
  },
  heroTyped: {
    background: 'linear-gradient(90deg,#00ffff,#7c3aed)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: 18, color: '#6677aa', lineHeight: 1.75, marginBottom: 36, maxWidth: 520,
    fontWeight: 400,
  },
  heroBtns: { display: 'flex', gap: 16, marginBottom: 52, flexWrap: 'wrap' },
  btnPrimary: {
    background: 'linear-gradient(135deg,#00ffff,#7c3aed)',
    border: 'none', color: '#020210', padding: '14px 32px', borderRadius: 50,
    fontSize: 15, fontWeight: 700, cursor: 'none',
    fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1,
    boxShadow: '0 8px 30px rgba(0,255,255,0.3)', transition: 'all .2s',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  btnOutline: {
    background: 'transparent', border: '2px solid rgba(0,255,255,0.35)',
    color: '#88aacc', padding: '14px 32px', borderRadius: 50, fontSize: 15,
    fontWeight: 700, cursor: 'none', fontFamily: "'Rajdhani',sans-serif",
    letterSpacing: 1, transition: 'all .2s',
  },
  statsRow: { display: 'flex', gap: 36, flexWrap: 'wrap' },
  statBox: {},
  statNum: {
    fontFamily: "'Orbitron',monospace", fontSize: 32, fontWeight: 900,
    color: '#00ffff', lineHeight: 1, textShadow: '0 0 20px rgba(0,255,255,0.5)',
  },
  statLabel: { fontSize: 11, color: '#445', fontWeight: 600, letterSpacing: 1.5, marginTop: 4, textTransform: 'uppercase' },
  heroWave: { position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 },

  // SECTIONS
  section: { padding: '100px 0', background: '#020210', position: 'relative', zIndex: 1 },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 48px' },
  sectionLabel: {
    display: 'inline-block', color: '#00ffff', fontSize: 11, fontWeight: 700,
    letterSpacing: 4, textTransform: 'uppercase', marginBottom: 14,
    background: 'rgba(0,255,255,0.07)', border: '1px solid rgba(0,255,255,0.2)',
    padding: '5px 18px', borderRadius: 50,
  },
  sectionTitle: {
    fontFamily: "'Orbitron',monospace", fontSize: 'clamp(24px,4vw,44px)',
    fontWeight: 900, color: '#d0d0e8', marginBottom: 16, letterSpacing: -0.5,
  },
  sectionLine: {
    height: 3, background: 'linear-gradient(90deg,#00ffff,#7c3aed)',
    borderRadius: 2, margin: '0 auto',
    boxShadow: '0 0 14px rgba(0,255,255,0.5)',
  },

  // ABOUT
  aboutGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'start',
  },
  glassCard: {
    background: 'rgba(0,255,255,0.02)', border: '1px solid rgba(0,255,255,0.1)',
    borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  cardGlow: {
    position: 'absolute', top: -60, right: -60, width: 180, height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle,rgba(0,255,255,0.08) 0%,transparent 70%)',
  },
  aboutText: { fontSize: 16, color: '#6677aa', lineHeight: 1.82, marginBottom: 18 },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  chip: {
    background: 'rgba(0,255,255,0.07)', border: '1px solid rgba(0,255,255,0.2)',
    color: '#00d4aa', padding: '6px 14px', borderRadius: 50, fontSize: 12,
    fontWeight: 700, letterSpacing: 1, cursor: 'none',
  },
  infoCard: {
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16, padding: '18px 22px', display: 'flex', gap: 18,
    alignItems: 'flex-start', transition: 'border-color .3s', cursor: 'none',
  },
  infoTitle: { fontSize: 14, fontWeight: 700, color: '#c0c0e0', marginBottom: 4, letterSpacing: 1 },
  infoDesc:  { fontSize: 13, color: '#445' },

  // SERVICES
  servicesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24,
  },
  serviceCard: {
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 22, padding: 28, display: 'flex', flexDirection: 'column', gap: 14,
    cursor: 'none', transition: 'all .3s',
  },
  serviceTag: {
    display: 'inline-block', padding: '4px 14px', borderRadius: 50, fontSize: 10,
    fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', width: 'fit-content',
  },
  serviceIcon:  { fontSize: 40 },
  serviceTitle: { fontFamily: "'Orbitron',monospace", fontSize: 17, fontWeight: 700, color: '#d0d0f0', letterSpacing: -0.5 },
  serviceDesc:  { fontSize: 14, color: '#556', lineHeight: 1.72, flex: 1 },
  serviceBtn: {
    background: 'none', border: '1px solid rgba(0,255,255,0.25)', color: '#889',
    padding: '10px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600,
    cursor: 'none', fontFamily: "'Rajdhani',sans-serif", transition: 'all .2s',
    width: 'fit-content', marginTop: 4, letterSpacing: 1,
  },

  // EXPERIENCE
  timelineDot: {
    position: 'absolute', left: 0, top: 14, width: 18, height: 18, borderRadius: '50%',
    background: 'linear-gradient(135deg,#00ffff,#7c3aed)',
    boxShadow: '0 0 22px rgba(0,255,255,0.5)',
  },
  timelineLine: {
    position: 'absolute', left: 8, top: 32, width: 2,
    height: 'calc(100% + 20px)',
    background: 'linear-gradient(180deg,rgba(0,255,255,0.4),transparent)',
  },
  timelineCard: {
    background: 'rgba(0,255,255,0.02)', border: '1px solid rgba(0,255,255,0.1)',
    borderRadius: 20, padding: 30, transition: 'border-color .3s', cursor: 'none',
  },
  timelineYear: {
    fontSize: 11, color: '#00ffff', fontWeight: 700, letterSpacing: 2,
    textTransform: 'uppercase', marginBottom: 8,
  },
  timelineRole: {
    fontFamily: "'Orbitron',monospace", fontSize: 20, fontWeight: 700,
    color: '#d0d0f0', marginBottom: 6, letterSpacing: -0.5,
  },
  timelineCompany: { fontSize: 14, color: '#445', marginBottom: 20 },
  timelinePoint: {
    fontSize: 14, color: '#6677aa', lineHeight: 1.65,
    display: 'flex', gap: 8, alignItems: 'flex-start',
  },

  // IYC STRIP
  iycStrip: {
    background: 'linear-gradient(90deg,rgba(0,255,255,0.04),rgba(124,58,237,0.04),rgba(0,255,255,0.04))',
    borderTop: '1px solid rgba(0,255,255,0.08)', borderBottom: '1px solid rgba(0,255,255,0.08)',
    padding: '20px 48px', textAlign: 'center',
  },

  // CONTACT
  contactGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' },
  contactHeading: {
    fontFamily: "'Orbitron',monospace", fontSize: 24, fontWeight: 700,
    color: '#d0d0f0', marginBottom: 14, letterSpacing: -0.5,
  },
  contactSub: { fontSize: 15, color: '#556', lineHeight: 1.75, marginBottom: 32 },
  contactItem: {
    display: 'flex', gap: 16, alignItems: 'center',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14, padding: '14px 20px', transition: 'border-color .3s',
    cursor: 'none', marginBottom: 14,
  },
  contactLabel: {
    fontSize: 10, color: '#334', fontWeight: 700, letterSpacing: 2,
    textTransform: 'uppercase', marginBottom: 2,
  },
  contactVal: { fontSize: 14, color: '#c0c0e0', fontWeight: 600 },
  formCard: {
    background: 'rgba(0,255,255,0.02)', border: '1px solid rgba(0,255,255,0.12)',
    borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', gap: 16,
  },
  input: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, padding: '14px 18px', color: '#c0c0e0', fontSize: 14,
    fontFamily: "'Rajdhani',sans-serif", outline: 'none', resize: 'vertical', width: '100%',
    transition: 'border-color .22s,box-shadow .22s', letterSpacing: 0.5,
  },

  // FOOTER
  footer: {
    background: '#010108', borderTop: '1px solid rgba(255,255,255,0.04)',
    padding: '36px 48px', textAlign: 'center', position: 'relative', zIndex: 1,
  },
  footerInner: { maxWidth: 1200, margin: '0 auto' },
  footerText: { fontSize: 13, color: '#334', marginTop: 10 },
}
