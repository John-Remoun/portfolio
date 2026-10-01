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
  {
    name: 'GitHub',
    handle: 'John-Remoun',
    href: 'https://github.com/John-Remoun',
    copyText: 'https://github.com/John-Remoun',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
              Whether you have a project in mind — my inbox is always open.
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

              <div className="submit-btn-wrapper">
                <button
                  type="submit"
                  className={`animated-send-btn form-submit ${sent ? 'is-sent' : ''}`}
                >
                  <div className="outline"></div>
                  <div className="state state--default">
                    <div className="icon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g style={{ filter: 'url(#shadow-send-btn)' }}>
                          <path
                            d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                            fill="currentColor"
                          ></path>
                        </g>
                        <defs>
                          <filter id="shadow-send-btn">
                            <feDropShadow
                              dx="0"
                              dy="1"
                              stdDeviation="0.6"
                              floodOpacity="0.5"
                            ></feDropShadow>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <p>
                      <span style={{ '--i': 0 }}>S</span>
                      <span style={{ '--i': 1 }}>e</span>
                      <span style={{ '--i': 2 }}>n</span>
                      <span style={{ '--i': 3 }}>d</span>
                      <span style={{ '--i': 4 }}>M</span>
                      <span style={{ '--i': 5 }}>e</span>
                      <span style={{ '--i': 6 }}>s</span>
                      <span style={{ '--i': 7 }}>s</span>
                      <span style={{ '--i': 8 }}>a</span>
                      <span style={{ '--i': 9 }}>g</span>
                      <span style={{ '--i': 10 }}>e</span>
                    </p>
                  </div>
                  <div className="state state--sent">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        strokeWidth="0.5px"
                        stroke="currentColor"
                      >
                        <g style={{ filter: 'url(#shadow-send-btn)' }}>
                          <path
                            fill="currentColor"
                            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <p>
                      <span style={{ '--i': 5 }}>S</span>
                      <span style={{ '--i': 6 }}>e</span>
                      <span style={{ '--i': 7 }}>n</span>
                      <span style={{ '--i': 8 }}>t</span>
                    </p>
                  </div>
                </button>

                {sent && (
                  <div className="form-success-note">
                    ✓ Message formatted! Opening WhatsApp...
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}