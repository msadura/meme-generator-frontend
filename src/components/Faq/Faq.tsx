import { FaqItem } from '@app/components/Faq/components/FaqItem';
import { DISCORD_URL, HOST_URL, MEME_PATH, OPENSEA_COLLECTION } from '@app/constants';
import React from 'react';

export function Faq(): JSX.Element {
  return (
    <div className="flex flex-col mx-auto my-5">
      <p className="font-salt text-primary text-xl ml-5 mb-3">FAQ</p>

      <FaqItem title="What is the Meme Generator?">
        It&apos;s a free online image editor that lets you add custom resizable text, images, and
        much more to templates. <br />
        <br />
        You can use it to customize one of the established themes found on the internet, or you can
        upload your own template and start from scratch. You can mint finished meme as NFT in
        blockchain. This will make you an owner of that particular piece of art, which you can trade
        at opensea.
      </FaqItem>

      <FaqItem title="How do I make a meme?">
        <span className="font-bold text-primary">1 ) Choose a background image </span>- You can use
        one of the popular templates, by clicking on one of the predefined templates on the grid.
        You can upload an image from your computer by clicking “pick image” or you can paste a link
        to an image found on the internet into the “paste image url” field.
        <br />
        If you wish to select a different background theme and start over you can click the “change
        image” button at any time.
        <br />
        <br />
        <span className="font-bold text-primary">2 ) Add customizations </span>- Add, edit and move
        around texts you want. Place additional stickers (currently supported pepe and ragefaces).
        Make your meme fun.
        <br />
        <br />
        <span className="font-bold text-primary">3) Create and share </span>- Connect meme generator
        with metamask by clicking “connect” in the upper corner. When your meme is ready click
        &quot;Generate Meme&quot; - it will upload your image to IPFS and then mint it onchain as
        NFT for free (only gas fee applies). When NFT is minted and saved you can preview it on your
        webapp, share it on opensea or social media. Share it with the community and make it viral!
      </FaqItem>

      <FaqItem title="How can I customize my meme?">
        <span className="font-bold text-primary mb-2">Texts</span>
        <br />
        - You can add as many textbooks as you want by clicking the “Add text” button.
        <br />
        - Click on existing text to select it - it will enable dragging and resizing the textbox.
        You click and drag to move text around.
        <br />
        - Change the text size by moving the “Font size” slider Customize text color by clicking
        “color” or “stroke” and picking the desired color. You can also input custom hex color
        values.
        <br />- Remove text by clicking the trash icon in the left panel or in text canvas it is
        selected.
        <br />
        <br />
        <span className="font-bold text-primary mb-2">Stickers</span>
        <br />
        -We prepared a set of Pepe and ragefaces stickers that you can use to customize your meme.
        <br />
        - Click on “Pepe” or “rage faces” tab to activate it, click on the selected sticker to add
        it to your meme
        <br />
        - Select sticker on your meme by clicking it. It will enable dragging and resizing the
        image.
        <br />
        - Move and resize the image by dragging around
        <br />
        - Remove the image by clicking on the trash icon in the image canvas, when the image is
        selected.
        <br />
        - Flip sticker horizontally by clicking arrows button sticker canvas.
        <br />
      </FaqItem>

      <FaqItem title="What is the price for generating NFT meme?">
        You can generate your NFT for free, we are not taking any charge. You only need to pay the
        transaction gas fee (link) which depends on chain.
      </FaqItem>

      <FaqItem title="What chains do you support?">
        Currently, you can generate your meme on polygon (matic) chain. It offers fairly cheap gas
        fees and supports trading on opensea. We might extend our app to other chains if the
        community will require such a thing.
      </FaqItem>
      <FaqItem title="What is metamask and how do I connect matic chain?">
        -{' '}
        <a className="link" href="https://metamask.io/" target="_blank" rel="noreferrer">
          Visit official metamask docs
        </a>
        <br />-{' '}
        <a
          className="link"
          href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844"
          target="_blank"
          rel="noreferrer">
          Read medium article on how to connect to matic chain
        </a>
        <br />
      </FaqItem>
      <FaqItem title="Where are my images stored?">
        Your images are uploaded to IPFS (link) service, which offers decentralized and immutable
        storage.
      </FaqItem>
      <FaqItem title="Where can I see or trade my memes?">
        You can see the whole gallery and trade your memes in our opensea gallery{' '}
        <a className="link" href={OPENSEA_COLLECTION} target="_blank" rel="noreferrer">
          here
        </a>
        . Additionally, you can view memes one by one in your app{' '}
        <a className="link" href={HOST_URL + MEME_PATH + '1'} target="_blank" rel="noreferrer">
          here
        </a>
      </FaqItem>
      <FaqItem title="Omg something is not working as it is supposed to!">
        Give us a report via discord{' '}
        <a className="link" href={DISCORD_URL} target="_blank" rel="noreferrer">
          here
        </a>
        . We are still working on our generator to make it perfect :)
      </FaqItem>
    </div>
  );
}
