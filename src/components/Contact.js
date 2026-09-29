import { useRef, useState } from 'react';
import { useReveal } from './useReveal';
import './Contact.css';

const CV_DRIVE_URL = "https://drive.google.com/file/d/1tS5gmjfwO0FfwcUSPFAeK---B0jL16Fu/view?usp=sharing";

const SOCIALS = [
  {
    name: 'Phone',
    handle: '+20 120 429 2945',
    href: 'tel:+201204292945',
    copyText: '+201204292945',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+20 120 429 2945',
    href: 'https://wa.me/201204292945?text=Hello%20John%2C%0AI%20would%20like%20to%20connect%20with%20you%20via%20your%20portfolio%20website.',
    copyText: '+201204292945',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'johnremoun789@gmail.com',
    href: 'mailto:johnremoun789@gmail.com',
    copyText: 'johnremoun789@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'John Remoun',
    href: 'https://www.linkedin.com/in/john-remoun-a1857b354/?isSelfProfile=true',
    copyText: 'https://www.linkedin.com/in/john-remoun-a1857b354/?isSelfProfile=true',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  useReveal(ref, []);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();

    let text = `Hello John,\nI would like to connect with you via your portfolio website.\n\n`;
    if (form.name.trim())    text += ` *Name:* ${form.name.trim()}\n`;
    if (form.email.trim())   text += ` *Email:* ${form.email.trim()}\n`;
    if (form.subject.trim()) text += ` *Subject:* ${form.subject.trim()}\n`;
    if (form.message.trim()) text += ` *Message:* ${form.message.trim()}\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/201204292945?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }, 4500);
  };

  const handleCopy = (e, text, index) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const fields = [
    { name:'name',    label:'Full Name',    type:'text',  placeholder:'John Doe',           full:false },
    { name:'email',   label:'Email Address',type:'email', placeholder:'your@email.com',       full:false },
    { name:'subject', label:'Subject',      type:'text',  placeholder:'Project inquiry…',     full:true  },
    { name:'message', label:'Message',      type:'area',  placeholder:'Tell me about your project…', full:true },
  ];

  const FieldArc = () => (
    <svg className="field-arc-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path d="M 0,2 Q 50,18 100,2" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-num">05.</span>
          <h2 className="sec-title">Contact</h2>
          <div className="sec-line" />
        </div>

        <div className="contact-grid">
          {/* LEFT: SOCIAL CARDS */}
          <div className="contact-left reveal-l">
            <h3 className="contact-headline">
              Let's Build Something<br />
              <span className="g">Remarkable Together</span>
            </h3>
            <p className="contact-sub">
              Whether you have a project in mind, need a back-end architect,
              or just want to talk code — my inbox is always open.
            </p>

            <a 
              href={CV_DRIVE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cv-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>

            <div className="socials">
              {SOCIALS.map((s, idx) => (
                <a key={s.name} href={s.href} className="social-row" target="_blank" rel="noreferrer">
                  <span className="social-icon">{s.icon}</span>
                  <div>
                    <div className="social-name">{s.name}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>

                  <div className="social-right-actions">
                    <button 
                      className="copy-btn" 
                      title="Copy"
                      onClick={(e) => handleCopy(e, s.copyText, idx)}
                    >
                      {copiedIndex === idx ? (
                        <span className="copied-tag">Copied!</span>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                      )}
                    </button>
                    <svg className="social-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — ORIGINAL FORM WITH ARC */}
          <div className="contact-right reveal-r">
            {sent ? (
              <div className="sent-wrap">
                <div className="sent-icon">✓</div>
                <p className="sent-txt">Message formatted! Opening WhatsApp...</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <div className="form-row">
                  {fields.filter(f => !f.full).map(f => (
                    <div key={f.name} className={`fgroup ${focus === f.name ? 'focused' : ''} ${form[f.name] ? 'filled' : ''}`}>
                      <label className="flabel">{f.label}</label>
                      <div className="input-wrap">
                        <input
                          className="finput"
                          type={f.type}
                          name={f.name}
                          value={form[f.name]}
                          onChange={change}
                          placeholder={f.placeholder}
                          onFocus={() => setFocus(f.name)}
                          onBlur={() => setFocus('')}
                        />
                        <FieldArc />
                      </div>
                    </div>
                  ))}
                </div>

                {fields.filter(f => f.full && f.type !== 'area').map(f => (
                  <div key={f.name} className={`fgroup ${focus === f.name ? 'focused' : ''} ${form[f.name] ? 'filled' : ''}`}>
                    <label className="flabel">{f.label}</label>
                    <div className="input-wrap">
                      <input
                        className="finput"
                        type={f.type}
                        name={f.name}
                        value={form[f.name]}
                        onChange={change}
                        placeholder={f.placeholder}
                        onFocus={() => setFocus(f.name)}
                        onBlur={() => setFocus('')}
                      />
                      <FieldArc />
                    </div>
                  </div>
                ))}

                {fields.filter(f => f.type === 'area').map(f => (
                  <div key={f.name} className={`fgroup ${focus === f.name ? 'focused' : ''} ${form[f.name] ? 'filled' : ''}`}>
                    <label className="flabel">{f.label}</label>
                    <div className="input-wrap">
                      <textarea
                        className="finput ftextarea"
                        name={f.name}
                        value={form[f.name]}
                        onChange={change}
                        placeholder={f.placeholder}
                        rows={5}
                        onFocus={() => setFocus(f.name)}
                        onBlur={() => setFocus('')}
                      />
                      <FieldArc />
                    </div>
                  </div>
                ))}

                <button type="submit" className="btn btn-gold form-submit">
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}