<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import type { ColorVariant } from '../../types.js';

let {
  sender = '',
  time = '',
  variant,
  position = 'start' as 'start' | 'end',
  avatar = '',
  class: className = '',
  children,
  footer
}: {
  sender?: string;
  time?: string;
  variant?: ColorVariant;
  position?: 'start' | 'end';
  avatar?: string;
  class?: string;
  children: Snippet;
  footer?: Snippet;
} = $props();

const variantMap: Record<string, string> = {
  primary: 'chat-bubble-primary', secondary: 'chat-bubble-secondary', accent: 'chat-bubble-accent',
  info: 'chat-bubble-info', success: 'chat-bubble-success', warning: 'chat-bubble-warning', error: 'chat-bubble-error'
};
</script>

<div class={cn('chat', position === 'end' ? 'chat-end' : 'chat-start', className)}>
  {#if avatar}
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img src={avatar} alt={sender} />
      </div>
    </div>
  {/if}
  {#if sender || time}
    <div class="chat-header">
      {sender}
      {#if time}
        <time class="text-xs opacity-50">{time}</time>
      {/if}
    </div>
  {/if}
  <div class={cn('chat-bubble', variant && variantMap[variant])}>
    {@render children()}
  </div>
  {#if footer}
    <div class="chat-footer opacity-50">
      {@render footer()}
    </div>
  {/if}
</div>
