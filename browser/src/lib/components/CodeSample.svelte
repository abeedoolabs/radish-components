<script lang="ts">
/**
 * CodeSample — renders a code block with copy button.
 * Used alongside PropTable inside Demo's usage section.
 */
import { Icon } from '@abeedoo/radish-components';

let {
  code = ''
}: {
  code: string;
} = $props();

let copied = $state(false);

function copy() {
  navigator.clipboard.writeText(code);
  copied = true;
  setTimeout(() => copied = false, 2000);
}
</script>

<div class="relative">
  <button
    type="button"
    class="absolute top-2 right-2 btn btn-ghost btn-xs gap-1 opacity-60 hover:opacity-100 z-10"
    onclick={copy}
  >
    {#if copied}
      <Icon name="check" size={14} /> Copied
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      Copy
    {/if}
  </button>
  <div class="bg-base-200 p-4 pr-20 overflow-x-auto rounded-lg">
    <pre class="text-sm"><code>{code}</code></pre>
  </div>
</div>
