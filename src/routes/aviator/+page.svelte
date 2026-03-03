<script>
  import { onMount, onDestroy } from 'svelte';
  import Header   from '$lib/components/Header.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';

  // ── Multiplier animation ──────────────────────────────────────────────────
  let multiplier = $state(1.55);
  let crashed    = $state(false);
  let interval;

  // ── Bet panels ────────────────────────────────────────────────────────────
  let stake1 = $state(10.00);
  let stake2 = $state(10.00);
  let mode1  = $state('Bet');
  let mode2  = $state('Bet');

  const historyPills = [
    { value: '1.27x',  purple: false },
    { value: '10.81x', purple: true  },
    { value: '1.44x',  purple: false },
    { value: '2.52x',  purple: true  },
    { value: '1.16x',  purple: false },
    { value: '2.34x',  purple: true  },
    { value: '1.21x',  purple: false },
    { value: '1.88x',  purple: false },
  ];

  const quickAmounts = [100, 250, 1000, 25000];

  onMount(() => {
    interval = setInterval(() => {
      if (!crashed && multiplier < 50) {
        multiplier = parseFloat((multiplier + 0.01).toFixed(2));
      }
    }, 100);
  });

  onDestroy(() => clearInterval(interval));

  function modify(panel, delta) {
    if (panel === 1) stake1 = Math.max(1, parseFloat((stake1 + delta).toFixed(2)));
    else             stake2 = Math.max(1, parseFloat((stake2 + delta).toFixed(2)));
  }

  function setQuick(panel, amount) {
    if (panel === 1) stake1 = amount;
    else             stake2 = amount;
  }

  function placeBet(panel) {
    const stake = panel === 1 ? stake1 : stake2;
    alert(`Bet placed on Panel ${panel} for ${stake.toFixed(2)} KES!`);
  }
</script>

<svelte:head><title>SportOdds – Aviator</title></svelte:head>

<style>
  /* Game screen grid + sunburst – can't do this purely in Tailwind */
  .game-screen {
    height: 220px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #1a1a1a;
    background-color: #050505;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
      repeating-conic-gradient(from 0deg at 0% 100%, #1a0808 0deg, #1a0808 5deg, transparent 5deg, transparent 10deg);
    background-size: 20px 20px, 20px 20px, 100% 100%;
  }

  .plane-icon {
    position: absolute;
    left: 30%;
    bottom: 30%;
    width: 50px;
    height: 50px;
    z-index: 5;
    filter: drop-shadow(0 0 8px rgba(229,57,53,0.8));
    animation: float 2s infinite ease-in-out alternate;
  }

  @keyframes float {
    0%   { transform: translateY(0px)   rotate(15deg); }
    100% { transform: translateY(-10px) rotate(12deg); }
  }

  .plane-trail {
    position: absolute;
    left: 0; bottom: 0;
    width: 32%; height: 32%;
    background: linear-gradient(to top right, rgba(229,57,53,0.5), transparent);
    clip-path: polygon(0 100%, 100% 100%, 100% 0);
    z-index: 4;
  }
</style>

<Header />

<!-- Sub nav -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-5 px-4 py-3 bg-panel border-b border-line">
  {#each ['Shikisha', 'Jackpot', 'Virtual', 'Sababisha'] as link}
    <a href="#" class="text-haze text-sm font-semibold no-underline">{link}</a>
  {/each}
</div>

<!-- Action bar -->
<div class="flex justify-between px-4 py-2.5 text-[11px] font-bold text-white bg-shelf">
  <a href="/" class="flex items-center gap-1 no-underline text-white">‹ Go Back</a>
  <span class="flex items-center gap-1 cursor-pointer">View Fullscreen ⛶</span>
</div>

<!-- Aviator header -->
<div class="flex justify-between items-center px-4 py-2.5 bg-avi-dark">
  <div class="text-avi-red text-lg font-black italic tracking-tight">Aviator</div>
  <div class="flex items-center gap-4">
    <div class="bg-avi-green/10 text-avi-green border border-avi-green/30 px-3 py-1 rounded-full font-extrabold text-[13px]">
      0.00 KES
    </div>
    <div class="flex gap-3 text-dim text-lg">
      <span class="text-avi-red cursor-pointer">🔊</span>
      <span class="cursor-pointer">☰</span>
      <span class="cursor-pointer">💬</span>
    </div>
  </div>
</div>

<!-- Multiplier history bar -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-1.5 px-4 py-2 bg-avi-dark border-b-2 border-black">
  {#each historyPills as pill}
    <div class="px-2.5 py-1 rounded-xl text-xs font-extrabold cursor-pointer
      {pill.purple
        ? 'text-purple-400 bg-purple-500/10'
        : 'text-blue-400 bg-blue-500/10'}">
      {pill.value}
    </div>
  {/each}
</div>

<!-- Game view -->
<div class="p-2.5 bg-black">
  <div class="game-screen">
    <div class="text-5xl font-black z-10 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]
      {multiplier >= 2 ? 'text-avi-green' : 'text-white'}">
      {multiplier.toFixed(2)}x
    </div>
    <div class="plane-trail"></div>
    <svg class="plane-icon" viewBox="0 0 24 24" fill="#e53935">
      <path d="M2,12 L20,3 L15,14 L10,14 L7,19 L5,15 L2,12 Z"/>
    </svg>
  </div>
</div>

<!-- Bet controls -->
<div class="flex flex-col gap-2.5 px-2.5 pb-6 bg-black">

  {#each [
    { id: 1, stake: stake1, mode: mode1 },
    { id: 2, stake: stake2, mode: mode2 }
  ] as panel}
    <div class="bg-avi-panel rounded-2xl p-3 flex flex-col gap-3 border border-white/5">

      <!-- Bet / Auto toggle -->
      <div class="flex justify-center">
        <div class="bg-canvas rounded-2xl flex p-[3px]">
          {#each ['Bet', 'Auto'] as tab}
            <button
              class="px-6 py-1.5 rounded-[18px] text-xs font-bold transition-all
                {(panel.id === 1 ? mode1 : mode2) === tab
                  ? 'bg-avi-btn text-white'
                  : 'text-dim'}"
              onclick={() => { if (panel.id === 1) mode1 = tab; else mode2 = tab; }}
            >{tab}</button>
          {/each}
        </div>
      </div>

      <!-- Input + button -->
      <div class="grid grid-cols-2 gap-2.5">
        <div class="flex flex-col gap-2">

          <!-- Stake input row -->
          <div class="flex justify-between items-center bg-avi-input rounded-3xl p-1">
            <button
              class="w-7 h-7 rounded-full bg-avi-btn text-white text-lg font-bold flex items-center justify-center active:bg-[#3e4652]"
              onclick={() => modify(panel.id, -1)}
            >−</button>
            <input
              type="number"
              class="w-12 bg-transparent border-none text-white text-center text-[15px] font-extrabold outline-none"
              value={panel.id === 1 ? stake1.toFixed(2) : stake2.toFixed(2)}
              step="0.01" min="1"
              oninput={(e) => { const v = parseFloat(e.target.value)||0; if(panel.id===1) stake1=v; else stake2=v; }}
            />
            <button
              class="w-7 h-7 rounded-full bg-avi-btn text-white text-lg font-bold flex items-center justify-center active:bg-[#3e4652]"
              onclick={() => modify(panel.id, 1)}
            >+</button>
          </div>

          <!-- Quick amounts -->
          <div class="grid grid-cols-2 gap-1.5">
            {#each quickAmounts as amt}
              <button
                class="bg-avi-input text-dim rounded-xl py-2 text-xs font-extrabold active:bg-avi-btn active:text-white"
                onclick={() => setQuick(panel.id, amt)}
              >{amt}</button>
            {/each}
          </div>
        </div>

        <!-- Place bet -->
        <button
          class="bg-avi-green rounded-2xl text-white flex flex-col justify-center items-center cursor-pointer
                 shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none transition-transform"
          onclick={() => placeBet(panel.id)}
        >
          <span class="text-lg font-black">BET</span>
          <span class="text-xs font-bold opacity-90 mt-0.5">
            {(panel.id === 1 ? stake1 : stake2).toFixed(2)} KES
          </span>
        </button>
      </div>

    </div>
  {/each}

</div>

<BottomNav />
