<script>
  import Header      from '$lib/components/Header.svelte';
  import BottomNav   from '$lib/components/BottomNav.svelte';
  import MatchCard   from '$lib/components/MatchCard.svelte';
  import PromoBanner from '$lib/components/PromoBanner.svelte';
  import BetslipFab  from '$lib/components/BetslipFab.svelte';
  import { matches } from '$lib/data/matches.js';

  const sportIcons = [
    { icon: '🔥', label: 'All',   active: true },
    { icon: '⏱️', label: 'Live',  red: true, dot: true },
    { icon: '🏈', label: 'NFL'   },
    { icon: '🏈', label: 'NCAAF' },
    { icon: '⚾', label: 'MLB'   },
    { icon: '🏀', label: 'Euro...' }
  ];

  const filters = [
    { label: 'All (249)', active: true },
    { label: '🔴 Live (1)' },
    { label: '1H' },
    { label: '3H' },
    { label: 'Today (4)' },
    { label: 'Upcoming (244)' }
  ];
</script>

<svelte:head><title>SportOdds – Home</title></svelte:head>

<Header />

<!-- ── Nav 1: main links ── -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-5 px-4 py-3 bg-panel border-b border-line">
  {#each ['Shikisha', 'Jackpot', 'Virtual', 'Sababisha'] as link}
    <a href="#" class="text-haze text-sm font-semibold no-underline">{link}</a>
  {/each}
</div>

<!-- ── Nav 2: sport icons ── -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-6 px-4 py-3.5 bg-shelf border-b border-line">
  {#each sportIcons as item}
    <div class="flex flex-col items-center gap-1.5 text-[11px] font-semibold cursor-pointer relative
      {item.active ? 'text-white' : item.red ? 'text-live' : 'text-dim'}">
      <div class="text-lg relative leading-none">
        {item.icon}
        {#if item.dot}
          <span class="w-1.5 h-1.5 bg-live rounded-full absolute top-0.5 right-0 block"></span>
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
  <span>ALL SPORTS – ALL ({matches.length})</span>
  <span>🔄 5:00</span>
</div>

<!-- ── League header ── -->
<div class="bg-shelf px-4 py-2.5 flex justify-between items-center text-xs font-bold border-l-[3px] border-neon text-white">
  <span>🏈 AMERICAN FOOTBALL – NCAAF</span>
  <span class="bg-block text-neon px-2 py-0.5 rounded-full text-[10px]">8</span>
</div>

<!-- ── Match list ── -->
{#each matches as match (match.id)}
  <MatchCard {match} />
{/each}

<BetslipFab />
<BottomNav />
