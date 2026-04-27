import { useState, useEffect, useCallback, useRef } from "react";
import { callELDProxy, applyELDData, sendNotification } from "../utils/eld";
import { minsSince } from "../utils/helpers";

// Auto-syncs ELD data every `intervalMinutes` minutes.
// Shows browser notification when token expires (>60 min).
export function useELDSync({ settings, data, setData, onSyncDone, onTokenExpired }) {
  const [syncing,    setSyncing]    = useState(false);
  const [lastSync,   setLastSync]   = useState(null);
  const [syncLog,    setSyncLog]    = useState(null);
  const intervalRef  = useRef(null);
  const snoozedRef   = useRef({});

  // ── Core sync function ─────────────────────────────────
  const runSync = useCallback(async (overrideSettings) => {
    const s = overrideSettings || settings;
    const hF = s.factorToken?.trim();
    const hL = s.leaderToken?.trim();
    if (!hF && !hL) return;

    setSyncing(true);
    const logs = [];
    let latestData = data;

    for (const [provider, token, url] of [
      ["factor", hF, s.factorUrl],
      ["leader", hL, s.leaderUrl],
    ]) {
      if (!token) continue;
      const result = await callELDProxy(provider, token, url);
      if (result.ok) {
        const { newData, stats } = applyELDData(latestData, result);
        latestData = newData;
        logs.push({
          provider: provider === "factor" ? "⚡ Factor ELD" : "🔷 Leader ELD",
          ok: true,
          matched:   stats.matched,
          unmatched: stats.unmatched,
          newFromELD:stats.newFromELD,
          log:       stats.log,
          endpoint:  result.vehicles?.endpoint || result.drivers?.endpoint || "auto",
        });
      } else {
        logs.push({
          provider: provider === "factor" ? "⚡ Factor ELD" : "🔷 Leader ELD",
          ok: false,
          error: result.error || "Connection failed",
          log: [],
        });
      }
    }

    setData(latestData);
    const ts = new Date();
    setLastSync(ts);
    const totalMatched = logs.reduce((a,l) => a + (l.matched||0), 0);
    setSyncLog({ logs, time: ts.toLocaleTimeString(), total: totalMatched });
    if (onSyncDone) onSyncDone({ logs, total: totalMatched });
    setSyncing(false);
  }, [settings, data, setData, onSyncDone]);

  // ── Token expiry check ─────────────────────────────────
  const checkExpiry = useCallback(() => {
    const now = Date.now();
    for (const p of ["factor","leader"]) {
      const setAt = settings[`${p}SetAt`];
      const token = settings[`${p}Token`];
      if (!token || !setAt) continue;
      const snooze = snoozedRef.current[p];
      if (snooze && now < snooze) continue;
      if (now - setAt > 60 * 60 * 1000) {
        sendNotification(
          "ELD Token Expired",
          `${p === "factor" ? "Factor" : "Leader"} ELD token is over 1 hour old — please refresh.`
        );
        if (onTokenExpired) onTokenExpired(p);
        return;
      }
    }
  }, [settings, onTokenExpired]);

  const snoozeExpiry = (provider, minutes = 15) => {
    snoozedRef.current[provider] = Date.now() + minutes * 60 * 1000;
  };

  // ── Auto-sync interval ─────────────────────────────────
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const mins = settings.syncIntervalMinutes || 15;
    intervalRef.current = setInterval(() => {
      runSync();
      checkExpiry();
    }, mins * 60 * 1000);
    return () => clearInterval(intervalRef.current);
  }, [settings.syncIntervalMinutes, settings.factorToken, settings.leaderToken, runSync, checkExpiry]);

  // ── Check expiry every 2 min ───────────────────────────
  useEffect(() => {
    const id = setInterval(checkExpiry, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [checkExpiry]);

  return { syncing, lastSync, syncLog, setSyncLog, runSync, snoozeExpiry };
}
