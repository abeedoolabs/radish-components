<script lang="ts">
/**
 * Card component - DaisyUI card with optional title, description, actions
 */
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  title = '',
  description = '',
  compact = false,
  flat = false,
  class: className = '',
  children,
  headerActions,
  ...rest
}: {
  title?: string;
  description?: string;
  compact?: boolean;
  flat?: boolean;
  class?: string;
  children: Snippet;
  headerActions?: Snippet;
  [key: string]: any;
} = $props();
</script>

<div class={cn('card bg-base-100 border border-base-300', !flat && 'shadow-sm', className)} {...rest}>
  <div class={cn('card-body', compact && 'p-4')}>
    {#if title || headerActions}
      <div class="flex items-center justify-between mb-2">
        <div>
          {#if title}
            <h3 class="font-semibold text-lg">{title}</h3>
          {/if}
          {#if description}
            <p class="text-sm text-base-content/60">{description}</p>
          {/if}
        </div>
        {#if headerActions}
          <div class="flex items-center gap-2">
            {@render headerActions()}
          </div>
        {/if}
      </div>
    {/if}
    {@render children()}
  </div>
</div>
