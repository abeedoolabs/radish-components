<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';

let {
  src = '',
  alt = '',
  size = 'md',
  rounded = true,
  online,
  placeholder = '',
  class: className = '',
  children
}: {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  online?: boolean;
  placeholder?: string;
  class?: string;
  children?: Snippet;
} = $props();

const sizeMap: Record<string, string> = { xs: 'w-8', sm: 'w-12', md: 'w-16', lg: 'w-24' };
</script>

<div class={cn('avatar', online !== undefined && (online ? 'online' : 'offline'), !src && placeholder && 'placeholder', className)}>
  <div class={cn(sizeMap[size], rounded && 'rounded-full', !src && placeholder && 'bg-neutral text-neutral-content flex items-center justify-center')}>
    {#if src}
      <img {src} {alt} />
    {:else if placeholder}
      <span class={size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : ''}>{placeholder}</span>
    {:else if children}
      {@render children()}
    {/if}
  </div>
</div>
