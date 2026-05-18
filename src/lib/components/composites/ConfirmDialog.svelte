<script lang="ts">
/**
 * ConfirmDialog component - Confirmation modal wrapper
 */
import Modal from './Modal.svelte';
import Icon from './Icon.svelte';

let {
  open = $bindable(false),
  title = 'Confirm',
  message = 'Are you sure?',
  confirmLabel = 'Delete',
  confirmVariant = 'error',
  onConfirm = () => {},
  onCancel = () => {}
}: {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  confirmVariant?: string;
  onConfirm: () => void;
  onCancel: () => void;
} = $props();

const variantClass = $derived(`btn btn-${confirmVariant}`);
</script>

<Modal bind:open size="sm" {title} onclose={onCancel}>
  <div class="py-2">
    <p class="text-base-content/80">{message}</p>
  </div>
  {#snippet footer()}
    <button class="btn btn-ghost" onclick={onCancel} type="button">Cancel</button>
    <button class={variantClass} onclick={onConfirm} type="button">
      {#if confirmVariant === 'error'}
        <Icon name="trash" size={16} />
      {/if}
      {confirmLabel}
    </button>
  {/snippet}
</Modal>
