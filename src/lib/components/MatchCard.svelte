<script>
  import { betslip } from '$lib/stores/betslip.svelte.js';

  let { match } = $props();

  function toggle(side) {
    betslip.toggle({
      matchId: match.id,
      team: side,
      odds: match.odds[side],
      label: `${match.teams[0]} vs ${match.teams[1]}`
    });
  }
</script>

<div class="bg-block px-4 py-3.5 border-b border-white/5">
  <!-- Match meta -->
  <div class="flex justify-between text-[11px] text-dim mb-3">
    <span>{match.icon} {match.league}</span>
    <span>{match.date}</span>
  </div>

  <!-- Teams -->
  <div class="text-sm font-bold leading-snug mb-4 text-white">
    {match.teams[0]}<br />{match.teams[1]}
  </div>

  <!-- Odds buttons -->
  <div class="grid grid-cols-2 gap-2.5 mb-3">
    {#each ['home', 'away'] as side, i}
      <div class="flex flex-col gap-1 text-center">
        <div class="text-[10px] text-dim font-semibold">{i + 1} {side.toUpperCase()}</div>
        <button
          class="py-3 rounded-md text-sm font-bold transition-all duration-150 active:scale-95
            {betslip.isSelected(match.id, side)
              ? 'bg-neon text-black shadow-[0_0_14px_rgba(0,230,118,0.45)] scale-[1.03]'
              : 'bg-chip text-white hover:bg-chip-hover hover:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'}"
          onclick={() => toggle(side)}
        >
          {match.odds[side].toFixed(2)}
        </button>
      </div>
    {/each}
  </div>

  <!-- Footer -->
  <div class="flex justify-between text-[11px] text-dim font-bold">
    <span>📊 STATS</span>
    <span>+{match.markets} ›</span>
  </div>
</div>
