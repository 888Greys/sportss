<script>
  import { page } from '$app/state';

  const navItems = [
    { label: 'Home',    icon: '🏠',  href: '/'       },
    { label: 'Live',    icon: '⏱️',  href: '/live', live: true },
    { label: '',        icon: '🚀',  href: '/aviator', rocket: true },
    { label: 'My Bets', icon: '📋',  href: '/mybets' },
    { label: 'Profile', icon: '👤',  href: '/profile' }
  ];
</script>

<nav class="fixed bottom-0 w-full max-w-[480px] bg-panel flex justify-around items-center py-2 border-t border-line z-[90]">
  {#each navItems as item}
    {#if item.rocket}
      <!-- Centre glowing rocket -->
      <div class="relative flex-1 flex justify-center items-center">
        <a href={item.href}
           class="absolute bottom-[-5px] w-[50px] h-[50px] bg-golden rounded-full flex justify-center items-center text-xl shadow-[0_0_25px_rgba(255,202,40,0.5)] text-black cursor-pointer active:scale-90 transition-transform duration-150 no-underline hover:shadow-[0_0_35px_rgba(255,202,40,0.7)]">
          🚀
        </a>
      </div>
    {:else}
      {@const isActive = page.url.pathname === item.href}
      <a
        href={item.href}
        class="flex flex-col items-center gap-1 text-[10px] cursor-pointer flex-1 no-underline relative
          {isActive
            ? item.live ? 'text-live' : 'text-haze'
            : 'text-dim'}"
      >
        <!-- Active indicator bar -->
        {#if isActive}
          <span class="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full
            {item.live ? 'bg-live' : 'bg-haze'}"
            style="transition: width 200ms ease;"
          ></span>
        {/if}
        <div class="text-xl relative transition-transform duration-150 {isActive ? 'scale-110' : 'scale-100'}">
          {item.icon}
          {#if item.live}
            <span class="w-1.5 h-1.5 bg-live rounded-full absolute top-0.5 right-[-2px] block live-blink"></span>
          {/if}
        </div>
        <span class="transition-all duration-150 {isActive ? 'font-bold' : 'font-normal'}">{item.label}</span>
      </a>
    {/if}
  {/each}
</nav>
