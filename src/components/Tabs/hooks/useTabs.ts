import { useState } from 'react';

export type Tab = 'text' | 'pepe' | 'ragefaces';

export const TAB_OPTIONS: Tab[] = ['text', 'pepe', 'ragefaces'];

export default function useTabs() {
  const [tab, setTab] = useState<Tab>('text');

  return { tab, setTab };
}
