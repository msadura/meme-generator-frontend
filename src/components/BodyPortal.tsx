import React from 'react';
import { createPortal } from 'react-dom';

const domNode = document.createElement('div');
document.body.appendChild(domNode);

const BodyPortal: React.FC = ({ children }) => {
  return createPortal(children, domNode);
};

export default BodyPortal;
