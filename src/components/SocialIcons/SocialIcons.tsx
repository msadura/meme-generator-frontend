import Opensea from './Opensea';
import { DISCORD_URL, INSTAGRAM_URL, OPENSEA_COLLECTION, TWITTER_URL } from '@app/constants';
import React from 'react';
import Discord from './Discord';
import Instagram from './Instagram';
import Twitter from './Twitter';

type Props = {};

export default function SocialIcons(props: Props): JSX.Element {
  return (
    <div className="flex flex-row gap-5 transform">
      <Opensea url={OPENSEA_COLLECTION} />
      <Discord url={DISCORD_URL} />
      <Twitter url={TWITTER_URL} />
      <Instagram url={INSTAGRAM_URL} />
    </div>
  );
}
