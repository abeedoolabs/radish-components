<script lang="ts">
/**
 * Modal component - DaisyUI v5 dialog modal
 */
import type { Snippet } from 'svelte';
import Icon from './Icon.svelte';

let {
  open = $bindable(false),
  title = '',
  size = 'md',
  closeOnBackdrop = true,
  onclose = () => {},
  children,
  footer
}: {
  open: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  onclose?: () => void;
  children: Snippet;
  footer?: Snippet;
} = $props();

let dialogEl: HTMLDialogElement | undefined = $state(undefined);
let closing = false;

const sizeClasses: Record<string, string> = {
  sm: 'modal-box max-w-sm',
  md: 'modal-box',
  lg: 'modal-box max-w-3xl',
  xl: 'modal-box max-w-5xl'
};

$effect(() => {
  if (!dialogEl) return;
  if (open) {
    if (!dialogEl.open) dialogEl.showModal();
  } else {
    if (dialogEl.open && !closing) {
      closing = true;
      dialogEl.close();
      closing = false;
    }
  }
});

function handleClose() {
  if (!closing) {
    open = false;
    onclose();
  }
}

function handleBackdropClick(e: MouseEvent) {
  if (closeOnBackdrop && e.target === dialogEl) {
    handleClose();
  }
}
</script>

<dialog
  bind:this={dialogEl}
  class="modal"
  onclick={handleBackdropClick}
  onclose={handleClose}
>
  <div class={sizeClasses[size] || sizeClasses.md}>
    <div class="flex items-center justify-between mb-4">
      {#if title}
        <h3 class="text-lg font-bold">{title}</h3>
      {/if}
      <button class="btn btn-sm btn-circle btn-ghost ml-auto" onclick={handleClose} type="button">
        <Icon name="x" size={18} />
      </button>
    </div>

    {@render children()}

    {#if footer}
      <div class="modal-action">
        {@render footer()}
      </div>
    {/if}
  </div>
</dialog>
