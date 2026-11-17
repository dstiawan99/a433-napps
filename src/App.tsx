import { useEffect, useState } from 'react';

interface Info {
  app: string; version: string; note: string;
  commit: string; builtAt: string; startedAt: string;
}

export default function App() {
  const [info, setInfo] = useState<Info | null>(null);
  useEffect(() => { fetch('/api/info').then(r => r.json()).then(setInfo); }, []);
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>ModulBiz Dagang - Simulasi</h1>
      {!info ? <p>Loading...</p> : (
        <table cellPadding={6}>
          <tbody>
            <tr><td>Versi</td><td><b>{info.version}</b></td></tr>
            <tr><td>Catatan</td><td>{info.note}</td></tr>
            <tr><td>Commit</td><td>{info.commit}</td></tr>
            <tr><td>Build time</td><td>{info.builtAt}</td></tr>
            <tr><td>Started at</td><td>{info.startedAt}</td></tr>
          </tbody>
        </table>
      )}
    </main>
  );
}
