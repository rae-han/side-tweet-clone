import '@/styles/globals.css';
import '@/styles/reset.css';

import { SWRConfig } from 'swr';
import axios from 'axios';

import type { AppProps } from 'next/app';

const fetcher = (url: string) => axios.get(url).then((response) => response.data);
// const fetcher = (url: string) => fetch(url).then((response) => response.json());

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <div className="bg-slate-900 min-h-screen text-slate-100">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
};

export default App;
