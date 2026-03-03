<script>
  import '../app.css';
  import { page } from '$app/state';
  import { fade, fly } from 'svelte/transition';

  let { children } = $props();
</script>

<!-- Mobile app shell: centred, max 480 px, dark canvas -->
<div class="w-full max-w-[480px] bg-canvas min-h-screen relative pb-[70px] overflow-x-hidden mx-auto">
  {#key page.url.pathname}
    <div in:fly={{ y: 18, duration: 220, opacity: 0 }} out:fade={{ duration: 100 }}>
      {@render children()}
    </div>
  {/key}
</div>
