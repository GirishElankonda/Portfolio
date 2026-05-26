import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

// SVG silhouettes — abstract aerodynamic human form (driver pose)
const DriverSilhouette = ({ teamId, primary }) => {
  // Each driver has a slightly different silhouette pose via SVG path transforms/clip
  const poses = {
    ferrari: {
      // Hamilton — slightly leaned forward, helmet tilt
      body: "M200,320 C180,320 160,300 155,280 L148,240 C145,225 140,210 138,195 L132,165 C130,152 135,140 145,135 L155,130 L160,110 C162,95 170,82 180,75 L185,55 C188,45 196,38 205,38 C214,38 222,45 225,55 L230,75 C240,82 248,95 250,110 L255,130 L265,135 C275,140 280,152 278,165 L272,195 C270,210 265,225 262,240 L255,280 C250,300 230,320 210,320 Z",
      helmet: "M180,72 C180,42 196,22 210,22 C224,22 238,42 238,72 C238,95 228,112 218,118 L202,118 C192,112 180,95 180,72 Z",
      visor: "M188,68 C188,52 198,42 210,42 C222,42 232,52 232,68 L232,78 C232,86 222,92 210,92 C198,92 188,86 188,78 Z",
    },
    mercedes: {
      // Russell — upright, slightly longer neck
      body: "M200,320 C180,320 158,298 154,278 L147,238 C144,222 140,207 138,192 L133,160 C131,147 136,135 147,130 L158,126 L162,106 C164,90 173,78 184,71 L188,50 C191,40 199,34 208,34 C217,34 225,40 228,50 L232,71 C243,78 252,90 254,106 L258,126 L269,130 C280,135 285,147 283,160 L278,192 C276,207 272,222 269,238 L262,278 C258,298 236,320 216,320 Z",
      helmet: "M182,68 C182,38 198,18 208,18 C218,18 234,38 234,68 C234,92 224,110 214,116 L202,116 C192,110 182,92 182,68 Z",
      visor: "M190,64 C190,48 200,38 208,38 C216,38 226,48 226,64 L226,76 C226,84 216,90 208,90 C200,90 190,84 190,76 Z",
    },
    redbull: {
      // Verstappen — slightly bulkier upper body, lower center of gravity
      body: "M200,325 C178,325 155,302 150,280 L143,238 C140,220 136,204 134,188 L128,158 C126,144 132,132 143,127 L155,122 L160,100 C162,84 172,70 184,63 L188,42 C191,31 200,24 210,24 C220,24 229,31 232,42 L236,63 C248,70 258,84 260,100 L265,122 L277,127 C288,132 294,144 292,158 L286,188 C284,204 280,220 277,238 L270,280 C265,302 242,325 220,325 Z",
      helmet: "M178,60 C178,28 196,8 210,8 C224,8 242,28 242,60 C242,86 231,106 220,112 L200,112 C189,106 178,86 178,60 Z",
      visor: "M186,56 C186,38 198,26 210,26 C222,26 234,38 234,56 L234,70 C234,80 222,88 210,88 C198,88 186,80 186,70 Z",
    }
  };

  const pose = poses[teamId] || poses.mercedes;

  return (
    <svg
      viewBox="0 0 420 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Glow effect */}
      <defs>
        <filter id={`glow-${teamId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`bodyGrad-${teamId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Body silhouette */}
      <path
        d={pose.body}
        fill={`url(#bodyGrad-${teamId})`}
        filter={`url(#glow-${teamId})`}
        opacity={0.85}
      />

      {/* Helmet */}
      <path
        d={pose.helmet}
        fill={primary}
        filter={`url(#glow-${teamId})`}
        opacity={0.95}
      />

      {/* Visor */}
      <path
        d={pose.visor}
        fill="#050810"
        opacity={0.9}
      />

      {/* Visor reflection */}
      <path
        d={pose.visor}
        fill="none"
        stroke={primary}
        strokeWidth="1.5"
        opacity={0.5}
      />
    </svg>
  );
};

const driverNames = {
  mercedes: 'George Russell',
  ferrari: 'Lewis Hamilton',
  redbull: 'Max Verstappen',
};

const RECEIVER_EMAIL = 'elamkondagirish@gmail.com';

async function submitViaWeb3Forms({ name, email, message, accessKey }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `Pit Stop — message from ${name}`,
      from_name: 'Portfolio Pit Stop',
      replyto: email,
      botcheck: '',
    }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Web3Forms submission failed');
  }
}

const Contact = () => {
  const { primary, teamId } = useTheme();
  const [formState, setFormState] = useState('idle');
  const [errorDetail, setErrorDetail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorDetail('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setErrorDetail(
        'Email service not configured. Get a free key at web3forms.com → copy .env.example to .env → restart npm run dev.'
      );
      setFormState('error');
      setTimeout(() => {
        setFormState('idle');
        setErrorDetail('');
      }, 8000);
      return;
    }

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    try {
      await submitViaWeb3Forms({ name, email, message, accessKey });
      form.reset();
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    } catch (err) {
      setErrorDetail(err.message || 'Transmission failed. Please try again.');
      setFormState('error');
      setTimeout(() => {
        setFormState('idle');
        setErrorDetail('');
      }, 6000);
    }
  };

  const driverName = driverNames[teamId] || 'George Russell';

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-white/5 overflow-hidden">
      {/* Driver Silhouette — positioned at the right edge */}
      <div className="absolute right-0 bottom-0 w-64 md:w-80 h-[480px] pointer-events-none z-0 opacity-15">
        <DriverSilhouette teamId={teamId} primary={primary} />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="w-[1px] h-12 mb-4" style={{ backgroundColor: primary }}></div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
            Pit <span style={{ color: primary }}>Stop</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Need to optimize your digital presence or build something from scratch? Send a signal to the paddock.
          </p>

          {/* Driver attribution */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-[1px] w-8" style={{ backgroundColor: primary }}></div>
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: `${primary}90` }}>
              Co-piloted by {driverName}
            </span>
            <div className="h-[1px] w-8" style={{ backgroundColor: primary }}></div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-slate-900/60 border border-white/10 p-8 md:p-12 text-left relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: primary }}></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: primary }}></div>

          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-slate-500 uppercase tracking-wider">Driver Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-slate-950 border border-white/10 px-4 py-3 text-white focus:outline-none transition-colors rounded-none placeholder-slate-700"
                  style={{ '--tw-ring-color': primary }}
                  onFocus={e => e.target.style.borderColor = primary}
                  onBlur={e => e.target.style.borderColor = ''}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-slate-500 uppercase tracking-wider">Comms Link (Email)</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-slate-950 border border-white/10 px-4 py-3 text-white focus:outline-none transition-colors rounded-none placeholder-slate-700"
                  onFocus={e => e.target.style.borderColor = primary}
                  onBlur={e => e.target.style.borderColor = ''}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs text-slate-500 uppercase tracking-wider">Telemetry Data (Message)</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-slate-950 border border-white/10 px-4 py-3 text-white focus:outline-none transition-colors rounded-none placeholder-slate-700 resize-none"
                onFocus={e => e.target.style.borderColor = primary}
                onBlur={e => e.target.style.borderColor = ''}
                placeholder="How can we help you win the race?"
              ></textarea>
            </div>

            {formState === 'error' && (
              <p className="font-mono text-xs text-red-400 uppercase tracking-wider text-center leading-relaxed">
                {errorDetail || `Transmission failed — please try again or email ${RECEIVER_EMAIL} directly.`}
              </p>
            )}

            <button
              type="submit"
              disabled={formState !== 'idle' && formState !== 'error'}
              className="w-full relative font-display font-bold uppercase tracking-widest py-4 overflow-hidden rounded-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              style={{
                backgroundColor:
                  formState === 'idle' || formState === 'error'
                    ? primary
                    : formState === 'success'
                      ? '#22c55e'
                      : '#1e293b',
                color:
                  formState === 'idle' || formState === 'error'
                    ? '#050810'
                    : formState === 'success'
                      ? 'white'
                      : '#64748b',
              }}
            >
              {formState === 'idle' && (
                <span className="flex items-center gap-2">
                  <Send size={18} /> Transmit Data
                </span>
              )}
              {formState === 'submitting' && (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                  Establishing Connection...
                </span>
              )}
              {formState === 'success' && (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} /> Signal Received
                </span>
              )}
              {formState === 'error' && (
                <span className="flex items-center gap-2">
                  <Send size={18} /> Retry Transmission
                </span>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
