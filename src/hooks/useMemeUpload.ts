import axios from 'axios';
import { useCallback } from 'react';

const URL = '/api/upload-image';

export function useMemeUpload() {
  const upload = useCallback(async (base64: string) => {
    try {
      const res = await axios.post(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ img: base64 })
      });

      return res;
    } catch (e: any) {
      throw e.response.data.message;
    }
  }, []);

  return upload;
}
