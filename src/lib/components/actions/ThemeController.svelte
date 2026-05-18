<script lang="ts">
import { cn } from '../../utils.js';

let {
  theme = $bindable('light'),
  themes = ['light', 'dark'] as string[],
  class: className = ''
}: {
  theme?: string;
  themes?: string[];
  class?: string;
} = $props();
</script>

<div class={cn('flex items-center gap-2', className)}>
  {#each themes as t}
    <input
      type="radio"
      name="theme-controller"
      class="btn btn-sm btn-ghost"
      aria-label={t}
      value={t}
      bind:group={theme}
      data-set-theme={t}
    />
  {/each}
</div>
