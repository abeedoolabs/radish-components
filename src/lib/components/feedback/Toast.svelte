<script lang="ts">
/**
 * Toast component - Renders toast notifications
 * Mount once in your root layout: <Toast />
 */
import { toast, type Toast } from '../../stores/toast.js';
import Icon from '../composites/Icon.svelte';

let toasts = $derived($toast);

function getAlertClass(type: Toast['type']) {
  const classes: Record<Toast['type'], string> = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };
  return classes[type];
}

function getIcon(type: Toast['type']) {
  const icons: Record<Toast['type'], string> = {
    success: 'check-circle',
    error: 'alert-circle',
    warning: 'alert-triangle',
    info: 'info'
  };
  return icons[type];
}
</script>

{#if toasts.length > 0}
  <div class="toast toast-end toast-bottom z-50">
    {#each toasts as t (t.id)}
      <div class="alert {getAlertClass(t.type)} shadow-lg flex items-center gap-2">
        <Icon name={getIcon(t.type)} size={18} />
        <span class="flex-1">{t.message}</span>
        <button
          type="button"
          class="btn btn-sm btn-ghost btn-square"
          onclick={() => toast.dismiss(t.id)}
        >
          <Icon name="x" size={14} />
        </button>
      </div>
    {/each}
  </div>
{/if}
