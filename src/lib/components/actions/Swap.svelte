<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  active = $bindable(false),
  rotate = false,
  flip = false,
  class: className = '',
  on,
  off
}: {
  active?: boolean;
  rotate?: boolean;
  flip?: boolean;
  class?: string;
  on: Snippet;
  off: Snippet;
} = $props();
</script>

<label class={cn('swap', rotate && 'swap-rotate', flip && 'swap-flip', active && 'swap-active', className)}>
  <input type="checkbox" bind:checked={active} class="hidden" />
  <div class="swap-on">
    {@render on()}
  </div>
  <div class="swap-off">
    {@render off()}
  </div>
</label>
