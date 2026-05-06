import React, { useState, useEffect, useMemo } from "react";
import { Phone, Mail, ChevronRight, Search, Filter, Check, Circle, TrendingUp, TrendingDown, AlertTriangle, Zap, Clock, X } from "lucide-react";

const data = {
  director: "North GA",
  masthead: { top: "NORTH", bot: "GEORGIA" },
  kpis: {
    total_collected: 121273,
    total_goal: 138600,
    pct_to_goal: 0.875,
    total_players: 51,
    total_subs: 54,
    behind_count: 14,
    behind_collected: 19902,
    behind_rate: 25.9,
    stale_count: 0,
    winback_count: 1,
    winback_value: 3600,
  },
  teams: [
    { name: "13U", players: 13, collected: 40446, projected: 45396, goal: 39600, pct: 1.021, variance: 846, status: "AHEAD" },
    { name: "9U", players: 13, collected: 29250, projected: 30000, goal: 33000, pct: 0.886, variance: -3750, status: "CLOSE" },
    { name: "10U", players: 17, collected: 28090, projected: 35869, goal: 33000, pct: 0.851, variance: -4910, status: "CLOSE" },
    { name: "11U", players: 11, collected: 23487, projected: 25279, goal: 33000, pct: 0.712, variance: -9513, status: "BEHIND" },
  ],
  behind: [
    { player: "Ethan Robinson", email: "eerobinson14@aol.com", phone: "7065062534", team: "10U", skips: 6, paid: 588, plan_total: 2352, error: "Payment method was revoked", status: "Active" },
    { player: "Jacob Simmons", email: "jakesimmons369@gmail.com", phone: null, team: "13U", skips: 6, paid: 450, plan_total: 3600, error: "Payment method was revoked", status: "Active" },
    { player: "Khadja Holmes", email: "khadja421@yahoo.com", phone: "4709912841", team: "10U", skips: 5, paid: 1176, plan_total: 2352, error: "There was an error performing the payment.", status: "Active" },
    { player: "Lauren Coleman", email: "laurengcoleman@gmail.com", phone: null, team: "10U", skips: 5, paid: 1470, plan_total: 2352, error: "Payment method was revoked", status: "Active" },
    { player: "Jenny Smith", email: "jb_smith1@yahoo.com", phone: null, team: "11U", skips: 4, paid: 1470, plan_total: 2352, error: "Invalid account.", status: "Active" },
    { player: "Justin Wiggins", email: "j.wiggins2312@yahoo.com", phone: null, team: "10U", skips: 4, paid: 1176, plan_total: 2352, error: "There was an error performing the payment.", status: "Active" },
    { player: "Ashley Bell", email: "langstona88@gmail.com", phone: null, team: "9U", skips: 3, paid: 2250, plan_total: 3000, error: "There was an error performing the payment.", status: "Active" },
    { player: "Joshua Rodriguez", email: "joshua.rodriguez89@outlook.com", phone: "17069795400", team: "9U", skips: 3, paid: 375, plan_total: 3000, error: "Payment method was revoked", status: "Paid in Full" },
    { player: "Joshua Rodriguez", email: "joshua_rodriguez@mohawkind.com", phone: null, team: "9U", skips: 3, paid: 750, plan_total: 3000, error: "Your card has insufficient funds.", status: "Paid in Full" },
    { player: "Davion Dias", email: "davionsd@gmail.com", phone: null, team: "10U", skips: 2, paid: 1764, plan_total: 2352, error: "There was an error performing the payment.", status: "Active" },
    { player: "Brittany Moore", email: "bmoe_20@hotmail.com", phone: null, team: "9U", skips: 1, paid: 3000, plan_total: 3000, error: "There was an error performing the payment.", status: "Paid in Full" },
    { player: "Brody Bragg", email: "kkboyd498@gmail.com", phone: null, team: "9U", skips: 1, paid: 1500, plan_total: 3000, error: "Payment method was revoked", status: "Paid in Full" },
    { player: "Timothy Sims", email: "timasims@me.com", phone: null, team: "11U", skips: 1, paid: 2058, plan_total: 2352, error: "Your card has insufficient funds.", status: "Active" },
    { player: "Joshua Rodriguez", email: "joshua.rodriguez89@outlook.com", phone: "17069795400", team: "9U", skips: 1, paid: 1875, plan_total: 3000, error: "Payment method was revoked", status: "Paid in Full" },
  ],
  calls: [
    { rank: 1, player: "Charles Gunsallus", phone: null, email: "egunsallus@gmail.com", category: "WIN-BACK", at_stake: 3600, why: "Cancelled — $3,600 plan value", script: "Hey Charles, we miss having North GA 13U on the roster — spot's still open if you want back in" },
    { rank: 2, player: "Jacob Simmons", phone: null, email: "jakesimmons369@gmail.com", category: "BEHIND", at_stake: 3150, why: "6 failed payments — Payment method was revoked", script: "Hey Jacob, your card on file stopped working — quick text to update?" },
    { rank: 3, player: "Joshua Rodriguez", phone: "17069795400", email: "joshua.rodriguez89@outlook.com", category: "BEHIND", at_stake: 2625, why: "3 failed payments — Payment method was revoked", script: "Hey Joshua, your card on file stopped working — quick text to update?" },
    { rank: 4, player: "Joshua Rodriguez", phone: null, email: "joshua_rodriguez@mohawkind.com", category: "BEHIND", at_stake: 2250, why: "3 failed payments — Your card has insufficient funds.", script: "Hey Joshua, your card on file stopped working — quick text to update?" },
    { rank: 5, player: "Ethan Robinson", phone: "7065062534", email: "eerobinson14@aol.com", category: "BEHIND", at_stake: 1764, why: "6 failed payments — Payment method was revoked", script: "Hey Ethan, your card on file stopped working — quick text to update?" },
    { rank: 6, player: "Ashley Bell", phone: null, email: "langstona88@gmail.com", category: "BEHIND", at_stake: 1500, why: "3 failed payments — error performing payment", script: "Hey Ashley, your card on file stopped working — quick text to update?" },
    { rank: 7, player: "Brittany Moore", phone: null, email: "bmoe_20@hotmail.com", category: "BEHIND", at_stake: 1500, why: "1 failed payment — error performing payment", script: "Hey Brittany, your card on file stopped working — quick text to update?" },
    { rank: 8, player: "Brody Bragg", phone: null, email: "kkboyd498@gmail.com", category: "BEHIND", at_stake: 1500, why: "1 failed payment — Payment method was revoked", script: "Hey Brody, your card on file stopped working — quick text to update?" },
    { rank: 9, player: "Khadja Holmes", phone: "4709912841", email: "khadja421@yahoo.com", category: "BEHIND", at_stake: 1176, why: "5 failed payments — error performing payment", script: "Hey Khadja, your card on file stopped working — quick text to update?" },
    { rank: 10, player: "Davion Dias", phone: null, email: "davionsd@gmail.com", category: "BEHIND", at_stake: 1175, why: "2 failed payments — error performing payment", script: "Hey Davion, your card on file stopped working — quick text to update?" },
  ],
};

const formatPhone = (p) => {
  if (!p) return null;
  const cleaned = p.replace(/\D/g, "");
  if (cleaned.length === 11) return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  if (cleaned.length === 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  return p;
};

const fmtDollar = (n) => `$${Math.round(n).toLocaleString()}`;
const fmtDollarK = (n) => `$${(n / 1000).toFixed(0)}K`;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [calledIds, setCalledIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [behindFilter, setBehindFilter] = useState("all"); // all | active | paid
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const toggleCalled = (id) => {
    setCalledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const callsRemaining = data.calls.length - calledIds.size;
  const dollarsRemaining = data.calls.filter((c) => !calledIds.has(c.rank)).reduce((s, c) => s + c.at_stake, 0);
  const totalCallValue = data.calls.reduce((s, c) => s + c.at_stake, 0);
  const dollarsRecovered = totalCallValue - dollarsRemaining;

  const filteredBehind = useMemo(() => {
    let rows = data.behind;
    if (behindFilter === "active") rows = rows.filter((r) => r.status === "Active");
    else if (behindFilter === "paid") rows = rows.filter((r) => r.status === "Paid in Full");
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter((r) => r.player.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.team.toLowerCase().includes(q));
    }
    return rows;
  }, [behindFilter, search]);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-red { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); } }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .shimmer-bar { background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0) 100%); background-size: 200% 100%; animation: shimmer 8s linear infinite; }
        .pulse-red { animation: pulse-red 2s infinite; }
        .grid-bg { background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 64px 64px; }
        .number-tabular { font-variant-numeric: tabular-nums; }
        .tab-btn { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .row-hover { transition: background-color 0.15s ease; }
        .row-hover:hover { background-color: rgba(255,255,255,0.025); }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />

      {/* HEADER */}
      <header className="border-b border-neutral-900 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center display-font text-2xl">WF</div>
            <div className="flex items-baseline gap-3">
              <span className="text-xs text-neutral-500 uppercase tracking-[0.2em] mono">{data.masthead.top}</span>
              <span className="display-font text-3xl">{data.masthead.bot}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-neutral-800 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-neutral-400 mono">LIVE</span>
            </div>
            <div className="text-xs text-neutral-500 mono">
              {time.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="border-b border-neutral-900 sticky top-[73px] bg-black/80 backdrop-blur-xl z-40">
        <div className="max-w-[1600px] mx-auto px-8 flex gap-0">
          {[
            { id: "today", label: "Today", count: callsRemaining, urgent: true },
            { id: "scoreboard", label: "Scoreboard", count: null },
            { id: "behind", label: "Behind Payments", count: data.kpis.behind_count, urgent: true },
            { id: "teams", label: "Teams", count: data.teams.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn px-6 py-4 text-sm font-medium relative flex items-center gap-2 ${
                activeTab === tab.id ? "text-white" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full mono number-tabular ${
                    tab.urgent && tab.count > 0 ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-10 relative">
        {/* TODAY TAB — Daily Call List */}
        {activeTab === "today" && (
          <div className="fade-up">
            {/* Hero */}
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 md:col-span-7">
                <div className="text-xs text-neutral-500 mono uppercase tracking-[0.3em] mb-4">Daily Call List · {time.toLocaleDateString("en-US", { weekday: "long" })}</div>
                <h1 className="display-font text-[clamp(48px,8vw,120px)] leading-[0.9] mb-6">
                  {callsRemaining}<span className="text-neutral-700">/{data.calls.length}</span>
                </h1>
                <div className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  Calls remaining today. <span className="text-white font-semibold">{fmtDollar(dollarsRemaining)}</span> still on the table — close them and you protect the existing revenue stream.
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
                <StatBlock label="Recovered" value={fmtDollar(dollarsRecovered)} sub={`${calledIds.size} calls done`} accent="white" />
                <StatBlock label="At stake" value={fmtDollar(dollarsRemaining)} sub="if not contacted" accent={dollarsRemaining > 5000 ? "red" : "white"} />
                <StatBlock label="% to goal" value={`${(data.kpis.pct_to_goal * 100).toFixed(1)}%`} sub={fmtDollarK(data.kpis.total_goal - data.kpis.total_collected) + " remaining"} accent="white" />
                <StatBlock label="Behind rate" value={`${data.kpis.behind_rate}%`} sub={`${data.kpis.behind_count} of ${data.kpis.total_subs}`} accent="red" />
              </div>
            </div>

            {/* Call cards */}
            <div className="space-y-2">
              {data.calls.map((call, i) => (
                <CallCard key={call.rank} call={call} done={calledIds.has(call.rank)} onToggle={() => toggleCalled(call.rank)} delay={i * 30} />
              ))}
            </div>
          </div>
        )}

        {/* SCOREBOARD TAB */}
        {activeTab === "scoreboard" && (
          <div className="fade-up">
            <div className="text-xs text-neutral-500 mono uppercase tracking-[0.3em] mb-4">Scoreboard · Overall</div>

            {/* Big metric */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              <div className="col-span-12 md:col-span-8">
                <div className="display-font text-[clamp(60px,12vw,160px)] leading-[0.85] number-tabular">
                  {fmtDollarK(data.kpis.total_collected)}
                </div>
                <div className="text-sm text-neutral-500 mt-2 mono">collected of {fmtDollarK(data.kpis.total_goal)} goal</div>

                <div className="mt-10 h-1 bg-neutral-900 relative overflow-hidden rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(data.kpis.pct_to_goal * 100, 100)}%` }}
                  />
                  <div className="shimmer-bar absolute inset-0" />
                </div>
                <div className="flex justify-between mt-3 text-xs mono text-neutral-500">
                  <span>0%</span>
                  <span className="text-white">{(data.kpis.pct_to_goal * 100).toFixed(1)}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4 content-start">
                <StatBlock label="Players" value={data.kpis.total_players} sub={`${data.kpis.total_subs} subs`} />
                <StatBlock label="Behind" value={data.kpis.behind_count} sub={`${data.kpis.behind_rate}%`} accent="red" />
                <StatBlock label="Already paid" value={fmtDollarK(data.kpis.behind_collected)} sub="from behind players" />
                <StatBlock label="Win-back" value={data.kpis.winback_count} sub={fmtDollar(data.kpis.winback_value)} />
              </div>
            </div>

            <div className="text-xs text-neutral-500 mono uppercase tracking-[0.3em] mb-4">Teams</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.teams.map((team, i) => (
                <TeamCard key={team.name} team={team} delay={i * 50} />
              ))}
            </div>
          </div>
        )}

        {/* BEHIND PAYMENTS TAB */}
        {activeTab === "behind" && (
          <div className="fade-up">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="text-xs text-neutral-500 mono uppercase tracking-[0.3em] mb-3">Behind Payments</div>
                <h1 className="display-font text-6xl leading-none">
                  {data.kpis.behind_count} <span className="text-neutral-700">players</span>
                </h1>
                <div className="text-sm text-neutral-400 mt-3">
                  {fmtDollar(data.kpis.behind_collected)} already collected from these players · don't lose them
                </div>
              </div>

              {/* Search + filter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 border border-neutral-800 rounded-md min-w-[260px]">
                  <Search size={14} className="text-neutral-500" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search player, team, email…"
                    className="bg-transparent outline-none text-sm w-full placeholder:text-neutral-600"
                  />
                  {search && <X size={14} onClick={() => setSearch("")} className="text-neutral-500 hover:text-white cursor-pointer" />}
                </div>
                <div className="flex border border-neutral-800 rounded-md overflow-hidden">
                  {["all", "active", "paid"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setBehindFilter(f)}
                      className={`px-3 py-2 text-xs uppercase tracking-wider mono ${
                        behindFilter === f ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-neutral-900 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-neutral-900 text-[10px] uppercase tracking-[0.15em] text-neutral-500 mono">
                <div className="col-span-3">Player / Team</div>
                <div className="col-span-3">Contact</div>
                <div className="col-span-1 text-center">Skips</div>
                <div className="col-span-2 text-right">Paid / Plan</div>
                <div className="col-span-2">Issue</div>
                <div className="col-span-1 text-center">Status</div>
              </div>
              {filteredBehind.map((row, i) => (
                <BehindRow key={`${row.email}-${i}`} row={row} delay={i * 20} />
              ))}
              {filteredBehind.length === 0 && (
                <div className="px-6 py-12 text-center text-neutral-500 text-sm">No matching players. {search && "Try clearing your search."}</div>
              )}
            </div>
          </div>
        )}

        {/* TEAMS TAB */}
        {activeTab === "teams" && (
          <div className="fade-up">
            <div className="text-xs text-neutral-500 mono uppercase tracking-[0.3em] mb-3">Teams</div>
            <h1 className="display-font text-6xl leading-none mb-8">{data.teams.length} teams</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.teams.map((team, i) => (
                <TeamDetail key={team.name} team={team} delay={i * 50} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-neutral-900 mt-20">
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex justify-between items-center text-xs text-neutral-600 mono">
          <div>WF ATHLETICS · Director Dashboard · v1.0</div>
          <div>Last sync: {time.toLocaleTimeString()}</div>
        </div>
      </footer>
    </div>
  );
}

function StatBlock({ label, value, sub, accent = "white" }) {
  const accentClass = accent === "red" ? "text-red-500" : "text-white";
  return (
    <div className="border border-neutral-900 p-5 hover:border-neutral-700 transition-colors duration-200">
      <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mono mb-3">{label}</div>
      <div className={`display-font text-4xl number-tabular ${accentClass}`}>{value}</div>
      <div className="text-xs text-neutral-500 mt-2">{sub}</div>
    </div>
  );
}

function CallCard({ call, done, onToggle, delay }) {
  const isWinback = call.category === "WIN-BACK";
  const formatted = formatPhone(call.phone);

  return (
    <div
      className={`fade-up border border-neutral-900 hover:border-neutral-700 transition-all duration-300 ${done ? "opacity-40" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-12 gap-4 items-center px-6 py-5">
        {/* Rank */}
        <div className="col-span-1">
          <div className="display-font text-4xl text-neutral-700 number-tabular">{call.rank.toString().padStart(2, "0")}</div>
        </div>

        {/* Player + meta */}
        <div className="col-span-4">
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-[9px] uppercase tracking-[0.2em] mono px-2 py-0.5 border ${
              isWinback ? "border-white/30 text-white" : "border-red-500/40 text-red-400 bg-red-500/5"
            }`}>
              {call.category}
            </span>
            <span className={`text-xl font-medium ${done ? "line-through" : ""}`}>{call.player}</span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">{call.why}</div>
        </div>

        {/* Contact */}
        <div className="col-span-3 flex flex-col gap-1.5">
          {formatted ? (
            <a href={`tel:${call.phone}`} className="flex items-center gap-2 text-sm hover:text-white text-neutral-300 group">
              <Phone size={12} className="text-neutral-600 group-hover:text-white" />
              <span className="mono">{formatted}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Phone size={12} />
              <span className="mono">no phone</span>
            </div>
          )}
          <a href={`mailto:${call.email}`} className="flex items-center gap-2 text-xs hover:text-white text-neutral-500 group">
            <Mail size={11} className="text-neutral-600 group-hover:text-white" />
            <span className="truncate max-w-[200px]">{call.email}</span>
          </a>
        </div>

        {/* $ at stake */}
        <div className="col-span-2 text-right">
          <div className="display-font text-3xl number-tabular">{fmtDollar(call.at_stake)}</div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider mono">at stake</div>
        </div>

        {/* Done toggle */}
        <div className="col-span-2 flex justify-end">
          <button
            onClick={onToggle}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              done ? "bg-white border-white text-black" : "border-neutral-800 hover:border-white text-neutral-600 hover:text-white"
            }`}
          >
            {done ? <Check size={20} strokeWidth={3} /> : <Circle size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Script — collapsed by default, shown on hover via CSS, or always for clarity */}
      {!done && (
        <div className="px-6 pb-4 -mt-1">
          <div className="text-xs italic text-neutral-500 pl-[8.33%] flex items-start gap-2">
            <span className="text-neutral-700 mono not-italic text-[10px] uppercase tracking-wider mt-0.5">say</span>
            <span>"{call.script}"</span>
          </div>
        </div>
      )}
    </div>
  );
}

function BehindRow({ row, delay }) {
  const formatted = formatPhone(row.phone);
  const pctPaid = row.plan_total > 0 ? row.paid / row.plan_total : 0;

  return (
    <div
      className="row-hover grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-900 last:border-b-0 fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="col-span-3">
        <div className="font-medium">{row.player}</div>
        <div className="text-xs text-neutral-500 mt-0.5 mono">{row.team}</div>
      </div>
      <div className="col-span-3 flex flex-col gap-1">
        {formatted ? (
          <a href={`tel:${row.phone}`} className="text-sm text-neutral-300 hover:text-white mono flex items-center gap-1.5">
            <Phone size={11} /> {formatted}
          </a>
        ) : (
          <span className="text-sm text-neutral-600 mono flex items-center gap-1.5"><Phone size={11} /> —</span>
        )}
        <a href={`mailto:${row.email}`} className="text-xs text-neutral-500 hover:text-white truncate flex items-center gap-1.5">
          <Mail size={10} /> {row.email}
        </a>
      </div>
      <div className="col-span-1 text-center">
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold mono number-tabular ${
            row.skips >= 4 ? "bg-red-500/20 text-red-400" : row.skips >= 2 ? "bg-neutral-800 text-white" : "bg-neutral-900 text-neutral-400"
          }`}
        >
          {row.skips}
        </div>
      </div>
      <div className="col-span-2 text-right">
        <div className="text-sm number-tabular">
          <span className="text-white">{fmtDollar(row.paid)}</span>
          <span className="text-neutral-600"> / {fmtDollar(row.plan_total)}</span>
        </div>
        <div className="h-0.5 bg-neutral-900 mt-1.5 relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${Math.min(pctPaid * 100, 100)}%` }} />
        </div>
      </div>
      <div className="col-span-2 text-xs text-neutral-400 leading-snug">{row.error}</div>
      <div className="col-span-1 text-center">
        <span className={`text-[10px] uppercase tracking-wider mono px-2 py-1 ${
          row.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
          row.status === "Paid in Full" ? "bg-neutral-800 text-neutral-300" :
          "bg-neutral-900 text-neutral-500"
        }`}>
          {row.status === "Paid in Full" ? "PIF" : row.status}
        </span>
      </div>
    </div>
  );
}

function TeamCard({ team, delay }) {
  const variancePos = team.variance >= 0;
  return (
    <div className="border border-neutral-900 hover:border-neutral-700 transition-all duration-300 p-6 fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs text-neutral-500 mono uppercase tracking-[0.2em] mb-2">North GA</div>
          <div className="display-font text-5xl">{team.name}</div>
        </div>
        <span className={`text-[9px] uppercase tracking-[0.2em] mono px-2 py-1 border ${
          team.status === "AHEAD" ? "border-white bg-white text-black" :
          team.status === "CLOSE" ? "border-neutral-700 text-white" :
          "border-red-500/50 text-red-400 bg-red-500/5"
        }`}>{team.status}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="text-[10px] mono text-neutral-500 uppercase tracking-wider">Players</div>
          <div className="text-2xl mt-1 number-tabular">{team.players}</div>
        </div>
        <div>
          <div className="text-[10px] mono text-neutral-500 uppercase tracking-wider">Collected</div>
          <div className="text-2xl mt-1 number-tabular">{fmtDollarK(team.collected)}</div>
        </div>
        <div>
          <div className="text-[10px] mono text-neutral-500 uppercase tracking-wider">Goal</div>
          <div className="text-2xl mt-1 number-tabular text-neutral-500">{fmtDollarK(team.goal)}</div>
        </div>
      </div>

      <div className="h-1.5 bg-neutral-900 relative overflow-hidden rounded-full mb-2">
        <div
          className={`absolute inset-y-0 left-0 ${team.pct >= 1 ? "bg-white" : team.pct >= 0.85 ? "bg-neutral-300" : "bg-red-500"}`}
          style={{ width: `${Math.min(team.pct * 100, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs mono text-neutral-500">
        <span>{(team.pct * 100).toFixed(1)}%</span>
        <span className={variancePos ? "text-white" : "text-red-500"}>
          {variancePos ? "+" : ""}{fmtDollar(team.variance)}
        </span>
      </div>
    </div>
  );
}

function TeamDetail({ team, delay }) {
  return <TeamCard team={team} delay={delay} />;
}
