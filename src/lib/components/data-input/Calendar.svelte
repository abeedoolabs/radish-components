<script lang="ts">
import { cn } from '../../utils.js';
import Icon from '../composites/Icon.svelte';

let {
  value = $bindable(''),
  min = '',
  max = '',
  class: className = '',
  onChange
}: {
  value?: string;
  min?: string;
  max?: string;
  class?: string;
  onChange?: (date: string) => void;
  [key: string]: any;
} = $props();

let viewYear = $state(0);
let viewMonth = $state(0);

// Initialize from value or today
$effect(() => {
  const d = value ? new Date(value + 'T00:00:00') : new Date();
  if (!viewYear) { viewYear = d.getFullYear(); viewMonth = d.getMonth(); }
});

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function isDisabled(dateStr: string): boolean {
  if (min && dateStr < min) return true;
  if (max && dateStr > max) return true;
  return false;
}

let days = $derived.by(() => {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; month: number; year: number; dateStr: string; outside: boolean }[] = [];

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = viewMonth - 1;
    const y = m < 0 ? viewYear - 1 : viewYear;
    const am = m < 0 ? 11 : m;
    cells.push({ day: d, month: am, year: y, dateStr: toDateStr(y, am, d), outside: true });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: viewMonth, year: viewYear, dateStr: toDateStr(viewYear, viewMonth, d), outside: false });
  }

  // Next month padding
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = viewMonth + 1;
    const y = m > 11 ? viewYear + 1 : viewYear;
    const am = m > 11 ? 0 : m;
    cells.push({ day: d, month: am, year: y, dateStr: toDateStr(y, am, d), outside: true });
  }

  return cells;
});

const today = $derived(toDateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

function prevMonth() {
  if (viewMonth === 0) { viewMonth = 11; viewYear--; }
  else { viewMonth--; }
}

function nextMonth() {
  if (viewMonth === 11) { viewMonth = 0; viewYear++; }
  else { viewMonth++; }
}

function selectDate(dateStr: string) {
  if (isDisabled(dateStr)) return;
  value = dateStr;
  onChange?.(dateStr);
}
</script>

<div class={cn('bg-base-100 border border-base-300 rounded-box p-4 w-72 select-none', className)}>
  <!-- Header -->
  <div class="flex items-center justify-between mb-3">
    <button type="button" class="btn btn-ghost btn-sm btn-square" onclick={prevMonth}>
      <Icon name="chevron-left" size={16} />
    </button>
    <span class="font-semibold text-sm">
      {monthNames[viewMonth]} {viewYear}
    </span>
    <button type="button" class="btn btn-ghost btn-sm btn-square" onclick={nextMonth}>
      <Icon name="chevron-right" size={16} />
    </button>
  </div>

  <!-- Day names -->
  <div class="grid grid-cols-7 mb-1">
    {#each dayNames as day}
      <div class="text-center text-xs text-base-content/50 py-1">{day}</div>
    {/each}
  </div>

  <!-- Days grid -->
  <div class="grid grid-cols-7">
    {#each days as cell}
      <button
        type="button"
        class={cn(
          'text-center text-sm py-1.5 rounded-btn transition-colors',
          cell.outside && 'text-base-content/30',
          !cell.outside && !isDisabled(cell.dateStr) && 'hover:bg-base-200',
          cell.dateStr === today && !cell.outside && value !== cell.dateStr && 'bg-primary text-primary-content',
          cell.dateStr === value && 'bg-base-content text-base-100 font-semibold',
          isDisabled(cell.dateStr) && 'opacity-30 cursor-not-allowed'
        )}
        disabled={isDisabled(cell.dateStr)}
        onclick={() => selectDate(cell.dateStr)}
      >
        {cell.day}
      </button>
    {/each}
  </div>
</div>
