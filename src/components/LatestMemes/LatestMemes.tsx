import { useLatestMemes } from '@app/components/LatestMemes/LatestMemesProvider';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MemeThumb } from '@app/components/MemeThumb/MemeThumb';

export function LatestMemes() {
  const { latest, refreshLatest } = useLatestMemes();

  useEffect(() => {
    if (!latest) {
      refreshLatest();
    }
  }, [latest, refreshLatest]);

  if (!latest?.length) {
    return null;
  }

  const lastId = latest[latest.length - 1].id;

  return (
    <div className="flex flex-col flex-1 mt-5">
      <Link href={`/m/${lastId}`}>
        <a className="text-lg text-primary-content py-3 font-semibold underline">
          View latest memes »
        </a>
      </Link>

      <div className="overflow-hidden">
        <Swiper spaceBetween={16} slidesPerView="auto">
          {latest.map((item) => (
            <SwiperSlide key={item.id} className="!w-[200px]">
              <Link href={`/m/${item.id}`}>
                <a className="text-lg text-primary-content py-3 font-semibold underline">
                  <MemeThumb meme={item} size={200} />
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
