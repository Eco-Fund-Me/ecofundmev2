// components/MixpanelProvider.tsx
'use client'; // This component must be a Client Component

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { mixpanel, initMixpanel } from '@/lib/mixpanelClient'; // Import both

interface MixpanelProviderProps {
  children: React.ReactNode;
}

export default function MixpanelProvider({ children }: MixpanelProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Call your initialization function here
    initMixpanel();

    // Track page views manually when route changes
    // Ensure mixpanel.track is available before calling it
    if (mixpanel.track) {
      const url = `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;
      mixpanel.track('Page View', {
        'Page URL': url,
        // You might want to add more properties like referrer if available
      });
    }
  }, [pathname, searchParams]); // Re-run when pathname or searchParams change

  return <>{children}</>; // Render children without any extra DOM
}