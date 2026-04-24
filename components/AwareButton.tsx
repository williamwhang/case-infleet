'use client';

import { useRef, type ReactNode } from 'react';

const EASING = 'cubic-bezier(0.25, 0.25, 0, 1)';

function getMouseDir(e: React.MouseEvent<HTMLElement>): 'top' | 'right' | 'bottom' | 'left' {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle > -45 && angle <= 45)  return 'right';
  if (angle > 45  && angle <= 135) return 'bottom';
  if (angle > 135 || angle <= -135) return 'left';
  return 'top';
}

function dirToTransform(dir: 'top' | 'right' | 'bottom' | 'left'): string {
  if (dir === 'top')    return 'translateY(-101%)';
  if (dir === 'right')  return 'translateX(101%)';
  if (dir === 'bottom') return 'translateY(101%)';
  return 'translateX(-101%)';
}

interface AwareButtonProps {
  href?: string;
  children: ReactNode;
  /** Alt label shown on hover (slide-swap). Omit for no text swap. */
  alt?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function AwareButton({
  href,
  children,
  alt,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: AwareButtonProps) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    const dir = getMouseDir(e);
    fill.style.transition = 'none';
    fill.style.transform = dirToTransform(dir);
    fill.getBoundingClientRect(); // force reflow → commit before animating
    fill.style.transition = `transform 0.42s ${EASING}`;
    fill.style.transform = 'translate(0, 0)';
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = `transform 0.42s ${EASING}`;
    fill.style.transform = dirToTransform(getMouseDir(e));
  };

  const label = alt ? (
    <span className="btn-labels">
      <span className="btn-label">{children}</span>
      <span className="btn-label-alt">{alt}</span>
    </span>
  ) : (
    <span className="btn-single-label">{children}</span>
  );

  const cls = `btn-aware btn-primary${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a href={href} className={cls} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <span ref={fillRef} className="btn-fill" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onMouseEnter={!disabled ? onEnter : undefined}
      onMouseLeave={!disabled ? onLeave : undefined}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <span ref={fillRef} className="btn-fill" aria-hidden="true" />
      {label}
    </button>
  );
}
