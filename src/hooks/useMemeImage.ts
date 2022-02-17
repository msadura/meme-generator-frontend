import { getImageUrl } from '@app/utils/getImageUrl';
import { useState, useEffect } from 'react';

export function useMemeImage(hash: string) {
  const [useIpfs, setUseIpfs] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onError = () => setUseIpfs(true);
  const onLoad = () => setIsLoaded(true);
  const url = getImageUrl(hash, useIpfs);

  useEffect(() => {
    setUseIpfs(false);
    setIsLoaded(false);
  }, [hash]);

  return {
    url,
    onError,
    onLoad,
    isLoaded
  };
}
