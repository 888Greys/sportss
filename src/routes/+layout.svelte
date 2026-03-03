<script>
  import '../app.css';
  let { children } = $props();
</script>

<!-- Mobile app shell: centred, max 480 px, dark canvas -->
<div class="w-full max-w-[480px] bg-canvas min-h-screen relative pb-[70px] overflow-x-hidden mx-auto">
  {@render children()}
</div>
