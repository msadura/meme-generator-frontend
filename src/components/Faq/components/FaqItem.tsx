import React from 'react';

type Props = { children: string | JSX.Element | (string | JSX.Element)[]; title: string };

export function FaqItem({ children, title }: Props): JSX.Element {
  return (
    <div
      tabIndex={0}
      className="collapse max-w-3xl border rounded-box border-base-300 collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <p>{children}</p>
      </div>
    </div>
  );
}
