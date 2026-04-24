'use client';

import { useEffect, useRef, useState } from 'react';
import { AwareButton } from './AwareButton';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY = { name: '', email: '', subject: '', message: '' };
type Status = 'idle' | 'sending' | 'success' | 'error';

/* ── Validation ───────────────────────────────────── */

const BLOCKED_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com',
  'throwaway.email', 'yopmail.com', '10minutemail.com',
  'trashmail.com', 'sharklasers.com', 'dispostable.com',
];

function validateName(v: string) {
  const s = v.trim();
  if (!s) return 'Campo obrigatório.';
  if (/^\d+$/.test(s)) return 'Use letras no nome.';
  if (s.length < 2) return 'Mínimo 2 caracteres.';
  return '';
}

function validateEmail(v: string) {
  const s = v.trim();
  if (!s) return 'Campo obrigatório.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'Use um e-mail válido.';
  const domain = s.split('@')[1]?.toLowerCase() ?? '';
  if (BLOCKED_DOMAINS.includes(domain)) return 'Este e-mail não pode ser utilizado.';
  return '';
}

function validateSubject(v: string) {
  const s = v.trim();
  if (!s) return 'Campo obrigatório.';
  if (s.length < 5) return 'Mínimo 5 caracteres.';
  return '';
}

function validateMessage(v: string) {
  const s = v.trim();
  if (!s) return 'Campo obrigatório.';
  if (s.length < 16) return 'Mínimo 16 caracteres.';
  return '';
}

/* ── Component ────────────────────────────────────── */

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastSubmitRef = useRef<number>(0);

  const [fields, setFields] = useState(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  const errors = {
    name:    validateName(fields.name),
    email:   validateEmail(fields.email),
    subject: validateSubject(fields.subject),
    message: validateMessage(fields.message),
  };

  const isValid = Object.values(errors).every((e) => e === '');

  const set = (key: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const blur = (key: string) => () =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  /* Reset when drawer closes */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFields(EMPTY);
        setTouched({});
        setStatus('idle');
        setSubmitError('');
      }, 450);
    }
  }, [isOpen]);

  /* Body scroll lock */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('drawer-open');
      const t = setTimeout(() => firstInputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    } else {
      document.body.classList.remove('drawer-open');
    }
  }, [isOpen]);

  /* ESC closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    /* Mark all fields as touched to show errors */
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid || status === 'sending') return;

    /* Rate limit */
    const now = Date.now();
    if (now - lastSubmitRef.current < 8000) {
      setSubmitError('Aguarde alguns segundos para tentar novamente.');
      return;
    }
    lastSubmitRef.current = now;

    setStatus('sending');
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setSubmitError(data.error ?? 'Erro desconhecido.');
        setStatus('error');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro de conexão.');
      setStatus('error');
    }
  }

  const submitLabel =
    status === 'sending' ? 'Enviando…' :
    status === 'error'   ? 'Tentar novamente' :
    'Enviar mensagem';

  const canSubmit = isValid && status !== 'sending';

  return (
    <div
      className={`contact-drawer${isOpen ? ' is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="contact-drawer-overlay" onClick={onClose} />

      <aside
        className="contact-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-drawer-title"
      >
        <div className="contact-drawer-top">
          <AwareButton onClick={onClose} className="contact-drawer-close" alt="Fechar">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="10" height="10" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round"/>
            </svg>
          </AwareButton>
        </div>

        <div className="contact-drawer-content">
          {status === 'success' ? (
            <div className="contact-success">
              <p>Mensagem recebida.</p>
              <span>Obrigado por entrar em contato. Vou analisar com atenção e responder em breve.</span>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h2 className="contact-drawer-title" id="contact-drawer-title">
                Vamos conversar
              </h2>
              <div className="contact-fields">

                <div className={`contact-field${touched.name && errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="contact-name">Nome</label>
                  <input
                    ref={firstInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome"
                    value={fields.name}
                    onChange={set('name')}
                    onBlur={blur('name')}
                  />
                  {touched.name && errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className={`contact-field${touched.email && errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    value={fields.email}
                    onChange={set('email')}
                    onBlur={blur('email')}
                  />
                  {touched.email && errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className={`contact-field${touched.subject && errors.subject ? ' has-error' : ''}`}>
                  <label htmlFor="contact-subject">Assunto</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Sobre o que você quer conversar?"
                    value={fields.subject}
                    onChange={set('subject')}
                    onBlur={blur('subject')}
                  />
                  {touched.subject && errors.subject && (
                    <span className="field-error">{errors.subject}</span>
                  )}
                </div>

                <div className={`contact-field${touched.message && errors.message ? ' has-error' : ''}`}>
                  <label htmlFor="contact-message">Mensagem</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Conte mais sobre o projeto ou a oportunidade…"
                    value={fields.message}
                    onChange={set('message')}
                    onBlur={blur('message')}
                  />
                  {touched.message && errors.message && (
                    <span className="field-error">{errors.message}</span>
                  )}
                </div>

              </div>

              {submitError && (
                <p className="contact-error">{submitError}</p>
              )}

              <div className="contact-drawer-bottom">
                <AwareButton
                  type="submit"
                  className={`contact-submit${!canSubmit ? ' is-disabled' : ''}`}
                  disabled={!canSubmit}
                >
                  {submitLabel}
                </AwareButton>
              </div>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
