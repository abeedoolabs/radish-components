<script lang="ts">
/**
 * EmptyState component - Icon + message + optional action button
 */
import type { Snippet } from 'svelte';
import Icon from './Icon.svelte';

let {
  icon = 'database',
  title = '',
  message = 'No items found.',
  actions,
  class: className = ''
}: {
  icon?: string;
  title?: string;
  message?: string;
  actions?: Snippet;
  class?: string;
} = $props();
</script>

<div class="text-center py-12 px-6 {className}">
  <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-200 mb-4">
    <Icon name={icon} size={28} class="text-base-content/30" />
  </div>

  {#if title}
    <h3 class="text-lg font-semibold mb-1">{title}</h3>
  {/if}

  <p class="text-base-content/50 max-w-md mx-auto">{message}</p>

  {#if actions}
    <div class="mt-4">
      {@render actions()}
    </div>
  {/if}
</div>
