import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';

export default function useResetLastMinted() {
  const router = useRouter();
  const { resetLastMinted } = useMeme();

  useEffect(() => {
    router.events.on('routeChangeComplete', resetLastMinted);

    return () => {
      router.events.off('routeChangeStart', resetLastMinted);
    };
  }, [resetLastMinted, router.events]);
}
