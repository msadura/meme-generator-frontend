import { Theme } from '@app/types';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

const url = 'https://api.imgflip.com/get_memes';

export function useLoadThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);

  const loadThemes = useCallback(async () => {
    const { data } = await axios.get(url);
    setThemes(data.data.memes);
  }, []);

  useEffect(() => {
    loadThemes();
  }, [loadThemes]);

  return { loadThemes, themes };
}
