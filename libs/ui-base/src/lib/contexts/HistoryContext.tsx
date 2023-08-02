import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useRef } from 'react';

export type HistoryContextProps = {
  previousRoute: string | null;
};

const initialState: HistoryContextProps = {
  previousRoute: '',
};

const HistoryContext = createContext(initialState);

type HistoryProviderProps = {
  children: ReactNode;
};

function HistoryProvider({ children }: HistoryProviderProps) {
  const { asPath } = useRouter();
  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = asPath;
  }, [asPath]);

  return (
    <HistoryContext.Provider
      value={{
        previousRoute: ref.current,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export { HistoryProvider, HistoryContext };
