<script>
  import { betslip } from '$lib/stores/betslip.svelte.js';
</script>

<div
  class="fixed bottom-20 right-5 w-14 h-14 bg-neon rounded-full flex justify-center items-center
         text-2xl text-black shadow-[0_4px_15px_rgba(0,230,118,0.4)] cursor-pointer z-[100]
         transition-transform duration-150 active:scale-90 select-none"
>
  🧾
  <!-- Badge: always visible, shows 0 when empty -->
  <div
    class="absolute top-0 right-0 bg-white text-black text-[11px] font-bold w-[18px] h-[18px]
           rounded-full flex justify-center items-center border-2 border-neon"
  >
    {betslip.count}
  </div>
</div>
