import { useState } from 'react';

export type Tab = 'text' | 'pepe' | 'faces';

export const TAB_OPTIONS: Tab[] = ['text', 'pepe', 'faces'];

export default function useTabs() {
  const [tab, setTab] = useState<Tab>('text');

  return { tab, setTab };
}
