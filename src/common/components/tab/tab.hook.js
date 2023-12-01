'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function useTabHook({ tabs }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const displayId = searchParams.get('d-id');
  const currentTab = searchParams.get('currentTab');
  const completedTabs = searchParams.get('completedTabs');
  const decodedCompletedTabs =
    completedTabs && completedTabs.split(',').map((tab) => decodeURIComponent(tab));

  const [activeTab, setActiveTab] = useState(currentTab || tabs[0]?.id);
  const [completedTab, setCompletedTab] = useState(decodedCompletedTabs || []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const encodedCompletedTabs =
      completedTab && completedTab.map((tab) => encodeURIComponent(tab)).join(',');

    router.push(
      `${window.location.pathname}?id=${id}&d-id=${displayId}&currentTab=${tabId}&completedTabs=${encodedCompletedTabs}`
    );
  };

  const handleTabCompleted = (tabId) => {
    setCompletedTab([...new Set([...completedTab, tabId])]);
  };

  const resetTabCompleted = () => {
    setCompletedTab([]);
  };

  let Component = tabs.find((tab) => tab.id === activeTab)?.content;
  Component = {
    ...Component,
    props: { handleTabClick, handleTabCompleted, resetTabCompleted }
  };

  tabs[tabs.findIndex((tab) => tab.id === activeTab)].content = Component;

  return {
    syntaticTabs: tabs,
    activeTab,
    setActiveTab,
    completedTab,
    setCompletedTab,
    handleTabClick,
    resetTabCompleted,
    Component
  };
}
