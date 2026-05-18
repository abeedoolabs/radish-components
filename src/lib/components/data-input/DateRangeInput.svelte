<script lang="ts">
import { cn } from '../../utils.js';
import Calendar from './Calendar.svelte';
import Icon from '../composites/Icon.svelte';

let {
  startDate = $bindable(''),
  endDate = $bindable(''),
  min = '',
  max = '',
  class: className = '',
  onChange
}: {
  startDate?: string;
  endDate?: string;
  min?: string;
  max?: string;
  class?: string;
  onChange?: (range: { start: string; end: string }) => void;
} = $props();

let showCalendar = $state(false);
let selecting = $state('start' as 'start' | 'end');

function formatDate(d: string): string {
  if (!d) return '';
  try { return new Date(d + 'T00:00:00').toLocaleDateString(); }
  catch { return d; }
}

function handleDateChange(date: string) {
  if (selecting === 'start') {
    startDate = date;
    if (endDate && date > endDate) endDate = '';
    selecting = 'end';
  } else {
    if (date < startDate) {
      startDate = date;
      selecting = 'end';
    } else {
      endDate = date;
      showCalendar = false;
      selecting = 'start';
      onChange?.({ start: startDate, end: endDate });
    }
  }
}

function clear() {
  startDate = '';
  endDate = '';
  selecting = 'start';
  onChange?.({ start: '', end: '' });
}
</script>

<div class={cn('relative inline-block', className)}>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="input input-bordered input-sm flex items-center gap-2 min-w-48"
      onclick={() => { showCalendar = !showCalendar; selecting = 'start'; }}
    >
      <Icon name="clock" size={14} class="opacity-50" />
      <span class="text-sm">
        {#if startDate && endDate}
          {formatDate(startDate)} — {formatDate(endDate)}
        {:else if startDate}
          {formatDate(startDate)} — select end
        {:else}
          Select date range
        {/if}
      </span>
    </button>
    {#if startDate || endDate}
      <button type="button" class="btn btn-ghost btn-xs btn-circle" onclick={clear}>
        <Icon name="x" size={12} />
      </button>
    {/if}
  </div>

  {#if showCalendar}
    <div class="absolute z-20 mt-1 shadow-lg">
      <div class="text-xs text-center py-1 bg-base-200 rounded-t-box font-medium">
        {selecting === 'start' ? 'Select start date' : 'Select end date'}
      </div>
      <Calendar
        value={selecting === 'start' ? startDate : endDate}
        {min}
        max={selecting === 'end' && max ? max : max}
        onChange={handleDateChange}
      />
    </div>
  {/if}
</div>
