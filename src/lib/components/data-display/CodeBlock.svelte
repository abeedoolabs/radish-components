<script lang="ts">
import { cn } from '../../utils.js';
import Icon from '../composites/Icon.svelte';

let {
  code = '',
  language = '',
  title = '',
  showLineNumbers = false,
  copyable = true,
  class: className = ''
}: {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  class?: string;
} = $props();

let copied = $state(false);

function copy() {
  navigator.clipboard.writeText(code);
  copied = true;
  setTimeout(() => copied = false, 2000);
}

let lines = $derived(code.split('\n'));
</script>

<div class={cn('rounded-box border border-base-300 bg-base-200 overflow-hidden', className)}>
  {#if title || language || copyable}
    <div class="flex items-center justify-between px-4 py-2 bg-base-300/50 border-b border-base-300">
      <div class="flex items-center gap-2">
        {#if title}
          <span class="text-sm font-medium">{title}</span>
        {/if}
        {#if language}
          <span class="badge badge-ghost badge-xs">{language}</span>
        {/if}
      </div>
      {#if copyable}
        <button
          type="button"
          class="btn btn-ghost btn-xs gap-1 opacity-60 hover:opacity-100"
          onclick={copy}
        >
          {#if copied}
            <Icon name="check" size={14} />
            Copied
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy
          {/if}
        </button>
      {/if}
    </div>
  {/if}

  <div class="p-4 overflow-x-auto">
    {#if showLineNumbers}
      <table class="text-sm font-mono w-full">
        <tbody>
          {#each lines as line, i}
            <tr>
              <td class="text-right pr-4 select-none text-base-content/30 w-8 align-top">{i + 1}</td>
              <td class="whitespace-pre">{line}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <pre class="text-sm font-mono whitespace-pre-wrap">{code}</pre>
    {/if}
  </div>
</div>
