<script>
  import Header    from '$lib/components/Header.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';

  let depositAmount = $state(300);

  const quickAmounts = [300, 500, 1000, 2000];

  const menuItems = [
    {
      title: 'Free bets & Promotions',
      subtitle: 'View your rewards & promotions',
      colorClass: 'bg-blue-500/10 text-blue-400',
      icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
    },
    {
      title: 'Jackpot Streaks & History',
      subtitle: 'View your streak history and earnings',
      colorClass: 'bg-orange-500/10 text-orange-400',
      icon: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z'
    },
    {
      title: 'My Transactions',
      subtitle: 'View all your debits and credits',
      colorClass: 'bg-green-500/10 text-green-400',
      icon: 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z'
    }
  ];

  function submitDeposit() {
    if (!depositAmount || depositAmount < 300) {
      alert('Minimal deposit is KES 300.');
      return;
    }
    alert(`Initiating M-PESA deposit for KES ${depositAmount}. Check your phone to enter your PIN.`);
  }
</script>

<svelte:head><title>SportOdds – Profile</title></svelte:head>

<Header />

<!-- Sub nav -->
<div class="scroll-nav flex overflow-x-auto whitespace-nowrap gap-5 px-4 py-3 bg-panel border-b border-line">
  {#each ['Shikisha', 'Jackpot', 'Virtual', 'Sababisha'] as link}
    <button class="text-haze text-sm font-semibold bg-transparent border-none cursor-pointer p-0">{link}</button>
  {/each}
</div>

<!-- Content -->
<div class="flex flex-col gap-4 px-4 py-5">

  <!-- Avatar + name -->
  <div class="flex flex-col items-center gap-2 mb-2">
    <div class="w-[70px] h-[70px] rounded-full bg-neon-soft flex items-center justify-center text-black mb-1">
      <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
    <h2 class="text-xl font-extrabold tracking-wide">0715558014</h2>
    <p class="text-xs text-dim font-medium">Account ID: 22</p>
  </div>

  <!-- Balance card -->
  <div class="bg-block rounded-xl flex justify-between items-center px-5 py-4 border border-line">
    <!-- Balance -->
    <div class="flex items-center gap-3">
      <div class="text-[#5c7294]">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0 0 22 15V9a2 2 0 0 0-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"/>
          <circle cx="16" cy="12" r="1.5"/>
        </svg>
      </div>
      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] text-haze font-bold tracking-wide">BALANCE</span>
        <span class="text-[15px] font-extrabold">KES 0.00</span>
      </div>
    </div>

    <div class="w-px h-9 bg-white/10 mx-2.5"></div>

    <!-- Bonus -->
    <div class="flex items-center gap-3">
      <div class="flex flex-col gap-0.5 text-right">
        <span class="text-[10px] text-haze font-bold tracking-wide">BONUS</span>
        <span class="text-[15px] font-extrabold">KES 0.00</span>
      </div>
      <div class="text-[#5c7294]">
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v3h20V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm12 7H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM12 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      </div>
    </div>
  </div>

  <!-- Menu items -->
  {#each menuItems as item}
    <div class="bg-block rounded-xl px-4 py-3.5 flex items-center gap-4 cursor-pointer border border-white/[0.02] active:bg-[#1a2436] transition-colors">
      <div class="w-[38px] h-[38px] rounded-xl flex items-center justify-center flex-shrink-0 {item.colorClass}">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d={item.icon}/>
        </svg>
      </div>
      <div class="flex flex-col gap-0.5 flex-1">
        <span class="text-sm font-bold">{item.title}</span>
        <span class="text-[11px] text-dim font-medium">{item.subtitle}</span>
      </div>
      <span class="text-[#43516b] text-lg font-bold">›</span>
    </div>
  {/each}

  <!-- Deposit card -->
  <div class="bg-block rounded-xl p-4 flex flex-col gap-4 border border-line mt-1">
    <div class="flex flex-col gap-1">
      <span class="text-base font-extrabold">Deposit</span>
      <span class="text-xs text-dim font-medium">Fast M-PESA deposits to your account</span>
    </div>

    <!-- Quick amounts -->
    <div class="grid grid-cols-4 gap-2.5">
      {#each quickAmounts as amt}
        <button
          class="bg-[#1a2332] text-white border border-white/5 py-2.5 rounded-md text-xs font-bold
                 active:bg-[#243145] transition-colors"
          onclick={() => depositAmount = amt}
        >+{amt}</button>
      {/each}
    </div>

    <!-- Amount input -->
    <input
      type="number"
      bind:value={depositAmount}
      placeholder="Amount"
      class="w-full bg-[#0e141d] border border-[#233042] focus:border-neon-soft text-white
             px-4 py-3.5 rounded-lg text-sm font-semibold outline-none transition-colors"
    />

    <!-- Submit -->
    <button
      class="w-full bg-neon-soft text-white py-4 rounded-lg text-[15px] font-extrabold
             active:scale-[0.98] transition-transform"
      onclick={submitDeposit}
    >
      Deposit Now
    </button>

    <p class="text-center text-[11px] text-dim font-medium -mt-1">
      Minimal deposit KES 300. Transactions subject to 5% tax.
    </p>
  </div>

</div>

<BottomNav />
