<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import Icon from './Icon.svelte';

interface Message {
  id: string;
  sender: string;
  text: string;
  time?: string;
  position?: 'start' | 'end';
  avatar?: string;
  variant?: string;
}

let {
  messages = [] as Message[],
  title = 'Chat',
  placeholder = 'Type a message...',
  class: className = '',
  onSend,
  header,
  renderMessage
}: {
  messages?: Message[];
  title?: string;
  placeholder?: string;
  class?: string;
  onSend?: (text: string) => void;
  header?: Snippet;
  renderMessage?: Snippet<[Message]>;
} = $props();

let input = $state('');
let messagesEl: HTMLDivElement;

$effect(() => {
  if (messages.length && messagesEl) {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
});

function send() {
  const text = input.trim();
  if (!text) return;
  onSend?.(text);
  input = '';
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}

const variantMap: Record<string, string> = {
  primary: 'chat-bubble-primary', secondary: 'chat-bubble-secondary', accent: 'chat-bubble-accent',
  info: 'chat-bubble-info', success: 'chat-bubble-success', warning: 'chat-bubble-warning', error: 'chat-bubble-error'
};
</script>

<div class={cn('flex flex-col border border-base-300 rounded-box bg-base-100 overflow-hidden', className)}>
  <!-- Header -->
  <div class="px-4 py-3 border-b border-base-300 bg-base-200/50">
    {#if header}
      {@render header()}
    {:else}
      <h3 class="font-semibold text-sm">{title}</h3>
    {/if}
  </div>

  <!-- Messages -->
  <div bind:this={messagesEl} class="flex-1 overflow-y-auto p-4 space-y-1 min-h-48 max-h-96">
    {#each messages as msg (msg.id)}
      {#if renderMessage}
        {@render renderMessage(msg)}
      {:else}
        <div class={cn('chat', msg.position === 'end' ? 'chat-end' : 'chat-start')}>
          {#if msg.avatar}
            <div class="chat-image avatar">
              <div class="w-8 rounded-full">
                <img src={msg.avatar} alt={msg.sender} />
              </div>
            </div>
          {/if}
          {#if msg.sender || msg.time}
            <div class="chat-header text-xs">
              {msg.sender}
              {#if msg.time}
                <time class="opacity-50 ml-1">{msg.time}</time>
              {/if}
            </div>
          {/if}
          <div class={cn('chat-bubble chat-bubble-sm', msg.variant && variantMap[msg.variant])}>
            {msg.text}
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <!-- Input -->
  <div class="border-t border-base-300 p-3">
    <div class="flex gap-2">
      <input
        type="text"
        class="input input-bordered input-sm flex-1"
        {placeholder}
        bind:value={input}
        onkeydown={handleKeydown}
      />
      <button
        type="button"
        class="btn btn-primary btn-sm"
        disabled={!input.trim()}
        onclick={send}
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </div>
  </div>
</div>
