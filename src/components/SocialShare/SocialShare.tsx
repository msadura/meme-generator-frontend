import React from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share';

type Props = {
  url: string;
  title: string;
};

export function SocialShare({ url, title }: Props): JSX.Element {
  return (
    <div className="flex flex-row gap-2">
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <RedditShareButton url={url} title={title} windowWidth={660} windowHeight={460}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
