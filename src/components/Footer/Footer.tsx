import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import React from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="flex flex-1 flex-col md:flex-row items-center justify-between p-5 gap-5">
      <div></div>
      <div className="text-white-secondary justify-center">
        <span>©dogeartclub 2021.</span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        <span>Connect with us:</span>
        <SocialIcons />
      </div>
    </footer>
  );
}
