<script>
  import { betslip } from '$lib/stores/betslip.svelte.js';
</script>

<div
  class="fixed bottom-20 right-5 w-14 h-14 bg-neon rounded-full flex justify-center items-center
         text-2xl text-black cursor-pointer z-[100] select-none fab-glow
         transition-transform duration-150 active:scale-90 hover:scale-105"
>
  🧾
  <!-- Badge -->
  <div
    class="absolute top-0 right-0 bg-white text-black text-[11px] font-bold w-[18px] h-[18px]
           rounded-full flex justify-center items-center border-2 border-neon
           transition-transform duration-200 {betslip.count > 0 ? 'scale-110' : 'scale-100'}"
  >
    {betslip.count}
  </div>
</div>
