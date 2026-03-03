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
           class="absolute bottom-[-5px] w-[50px] h-[50px] bg-golden rounded-full flex justify-center items-center text-xl shadow-[0_0_25px_rgba(255,202,40,0.5)] text-black cursor-pointer active:scale-95 transition-transform no-underline">
          🚀
        </a>
      </div>
    {:else}
      <a
        href={item.href}
        class="flex flex-col items-center gap-1 text-[10px] cursor-pointer flex-1 no-underline transition-colors
          {page.url.pathname === item.href
            ? item.live ? 'text-live' : 'text-haze'
            : 'text-dim'}"
      >
        <div class="text-xl relative">
          {item.icon}
          {#if item.live}
            <span class="w-1.5 h-1.5 bg-live rounded-full absolute top-0.5 right-[-2px] block"></span>
          {/if}
        </div>
        <span>{item.label}</span>
      </a>
    {/if}
  {/each}
</nav>
