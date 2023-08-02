import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AnalyticsInstance } from 'analytics';

type ApplicationAnalyticsValues = {
  analytics: AnalyticsInstance | null;
};

const defaultValues: ApplicationAnalyticsValues = {
  analytics: null,
};

const ApplicationAnalyticsContext = createContext(defaultValues);

export default function ApplicationAnalyticsContextProvider({
  children,
  analyticsInstance,
}: {
  children: ReactNode;
  analyticsInstance: AnalyticsInstance;
}) {
  const [analytics, setAnalytics] = useState<AnalyticsInstance | null>(null);

  useEffect(() => {
    if (analyticsInstance) {
      setAnalytics(analyticsInstance);
    }
  }, [analyticsInstance]);

  useEffect(() => {
    if (analytics) {
      analytics.page();
    }
  }, [analytics]);

  return (
    <ApplicationAnalyticsContext.Provider
      value={{
        analytics,
      }}
    >
      {children}
    </ApplicationAnalyticsContext.Provider>
  );
}

export const useApplicationAnalyticsContext = () => useContext(ApplicationAnalyticsContext);
