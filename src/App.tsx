import React, { useEffect, useState } from "react";

type ClusterInfo = {
  podName: string;
  namespace: string;
  nodeName: string;
  clusterName: string;
  appVersion: string;
  timestamp: string;
};

function App() {
  const [info, setInfo] = useState<ClusterInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadInfo = async () => {
    try {
      setError(null);
      const res = await fetch("/api/info");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as ClusterInfo;
      setInfo(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load cluster info");
    }
  };

  useEffect(() => {
    loadInfo();
    const id = setInterval(loadInfo, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-slate-800/80 shadow-xl rounded-xl p-6 border border-slate-700">
        <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          Kubernetes Cluster Info
        </h1>
        <p className="text-sm text-slate-300 mb-4">
          If you can see this page, your Gateway, Service, and Deployment are
          all wired up correctly.
        </p>

        {error && (
          <div className="mb-4 rounded border border-rose-500/60 bg-rose-950/40 px-3 py-2 text-sm text-rose-100">
            Failed to load cluster info: {error}
          </div>
        )}

        {info ? (
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                Pod identity
              </h2>
              <dl className="mt-1 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-slate-400">Pod name</dt>
                  <dd className="font-mono text-emerald-300 break-all">
                    {info.podName}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Namespace</dt>
                  <dd className="font-mono text-sky-300">{info.namespace}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Node</dt>
                  <dd className="font-mono text-amber-300 break-all">
                    {info.nodeName}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Cluster</dt>
                  <dd className="font-mono text-fuchsia-300">
                    {info.clusterName}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-slate-700 pt-3 flex items-center justify-between text-xs text-slate-400">
              <span>App version: {info.appVersion}</span>
              <span>Updated: {new Date(info.timestamp).toLocaleString()}</span>
            </div>

            <button
              onClick={loadInfo}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-emerald-500/70 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/10"
            >
              Refresh info
            </button>
          </div>
        ) : !error ? (
          <p className="text-sm text-slate-300">Loading cluster info…</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
