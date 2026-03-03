<script>
  import { onMount, onDestroy } from 'svelte';
  import Header      from '$lib/components/Header.svelte';
  import BottomNav   from '$lib/components/BottomNav.svelte';
  import PromoBanner from '$lib/components/PromoBanner.svelte';
  import BetslipFab  from '$lib/components/BetslipFab.svelte';
  import { supabase } from '$lib/supabase.js';

  let liveMatches  = $state([]);
  let currentPage  = $state(1);
  let channel;

  const sportIcons = [
    { icon: '🔥', label: 'All' },
    { icon: '⏱️', label: 'Live', red: true, dot: true },
    { icon: '🏈', label: 'NFL'   },
    { icon: '🏈', label: 'NCAAF' },
    { icon: '⚾', label: 'MLB'   },
    { icon: '🏀', label: 'Euro...' }
  ];

  const filters = [
    { label: 'All (248)' },
    { label: '🔴 Live', active: true },
    { label: '1H' },
    { label: '3H' },
    { label: 'Today (4)' },
    { label: 'Upcoming (244)' }
  ];

  onMount(async () => {
    // ── Initial fetch ──────────────────────────────────────────────────────────
    try {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('is_live', true);
      if (data) liveMatches = data;
    } catch {
      // Supabase not configured yet – empty state shown below
    }

    // ── Real-time subscription ─────────────────────────────────────────────────
    channel = supabase
      .channel('live-matches')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'matches', filter: 'is_live=eq.true' },
        ({ eventType, new: newRow, old: oldRow }) => {
          if (eventType === 'INSERT') {
            liveMatches.push(newRow);
          } else if (eventType === 'UPDATE') {
            const idx = liveMatches.findIndex((m) => m.id === oldRow.id);
            if (idx >= 0) liveMatches.splice(idx, 1, newRow);
          } else if (eventType === 'DELETE') {
            const idx = liveMatches.findIndex((m) => m.id === oldRow.id);
            if (idx >= 0) liveMatches.splice(idx, 1);
          }
        }
      )
      .subscribe();
  });

  onDestroy(() => channel?.unsubscribe());
</script>

<svelte:head><title>SportOdds – Live</title></svelte:head>

<Header />

<!-- ── Nav 1 ── -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-5 px-4 py-3 bg-panel border-b border-line">
  {#each ['Shikisha', 'Jackpot', 'Virtual', 'Sababisha'] as link}
    <button class="text-haze text-sm font-semibold bg-transparent border-none cursor-pointer p-0">{link}</button>
  {/each}
</div>

<!-- ── Nav 2: sport icons ── -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-6 px-4 py-3.5 bg-panel border-b border-line">
  {#each sportIcons as item}
    <div class="flex flex-col items-center gap-1.5 text-[11px] font-semibold cursor-pointer relative
      {item.red ? 'text-live' : 'text-dim'}">
      <div class="text-lg relative leading-none">
        {item.icon}
        {#if item.dot}
          <span class="w-1.5 h-1.5 bg-live rounded-full absolute top-0.5 right-[-2px] block"></span>
        {/if}
      </div>
      <span>{item.label}</span>
    </div>
  {/each}
</div>

<!-- ── Nav 3: filters ── -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-4 px-4 py-2.5 bg-canvas border-b border-line text-[13px] font-semibold">
  {#each filters as f}
    <span class={f.active ? 'text-neon' : 'text-dim'}>{f.label}</span>
  {/each}
</div>

<PromoBanner />

<!-- ── Section header ── -->
<div class="flex justify-between items-center px-4 py-2.5 bg-[#111822] text-[11px] text-dim font-bold">
  <span>ALL SPORTS – LIVE ({liveMatches.length})</span>
  <span class="animate-pulse text-live">● LIVE</span>
</div>

<!-- ── Content ── -->
{#if liveMatches.length === 0}
  <!-- Empty state -->
  <div class="flex flex-col items-center justify-center py-14 px-5 text-center">
    <div class="opacity-60 mb-4">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#8aa1c2"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
        <path d="M12 12v.01"/>
        <path d="M8.5 8.5a5 5 0 0 1 7 0"/>
        <path d="M10.5 10.5a2.5 2.5 0 0 1 3 0"/>
      </svg>
    </div>
    <p class="text-haze text-sm">No live events right now.</p>
    <p class="text-dim text-xs mt-1">Events will appear here automatically once they start.</p>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-7">
      {#each ['‹', '1', '2', '3', '›'] as p}
        <button
          class="w-9 h-9 rounded-lg text-[13px] font-bold flex items-center justify-center transition-all
            {p === String(currentPage)
              ? 'bg-neon text-black shadow-[0_0_15px_rgba(0,230,118,0.3)]'
              : 'bg-[#111824] text-dim hover:bg-chip'}"
          onclick={() => { if (!isNaN(Number(p))) currentPage = Number(p); }}
        >
          {p}
        </button>
      {/each}
    </div>
  </div>
{:else}
  <!-- Live match cards (real Supabase data) -->
  {#each liveMatches as match (match.id)}
    <div class="bg-block px-4 py-3.5 border-b border-white/5 text-white">
      <div class="flex justify-between text-[11px] text-dim mb-2">
        <span>🔴 LIVE</span>
        <span>{match.elapsed ?? ''}′</span>
      </div>
      <div class="text-sm font-bold leading-snug">
        {match.home_team} <span class="text-neon">{match.home_score ?? 0}</span>
        –
        <span class="text-neon">{match.away_score ?? 0}</span> {match.away_team}
      </div>
    </div>
  {/each}
{/if}

<BetslipFab />
<BottomNav />
