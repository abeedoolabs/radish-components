<script lang="ts">
/**
 * FormField component - Label + input/select/textarea + error + help text
 */
import { cn } from '../../utils.js';

let {
  name,
  label = '',
  type = 'text',
  value = '',
  placeholder = '',
  required = false,
  disabled = false,
  readonly = false,
  error = '',
  helpText = '',
  options = [] as { value: string; label: string }[],
  rows = 3,
  class: className = ''
}: {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'date' | 'datetime-local' | 'select' | 'textarea' | 'checkbox';
  value?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  class?: string;
} = $props();

const inputClass = $derived(error ? 'input-error' : '');
</script>

<div class={cn('form-control w-full', className)}>
  {#if label && type !== 'checkbox'}
    <label class="label" for={name}>
      <span class="label-text">
        {label}
        {#if required}<span class="text-error">*</span>{/if}
      </span>
    </label>
  {/if}

  {#if type === 'select'}
    <select
      id={name}
      {name}
      class={cn('select select-bordered w-full', inputClass)}
      {required}
      {disabled}
    >
      {#if placeholder}
        <option value="" disabled selected>{placeholder}</option>
      {/if}
      {#each options as opt}
        <option value={opt.value} selected={String(value) === String(opt.value)}>{opt.label}</option>
      {/each}
    </select>

  {:else if type === 'textarea'}
    <textarea
      id={name}
      {name}
      class={cn('textarea textarea-bordered w-full', inputClass)}
      {placeholder}
      {required}
      {disabled}
      {readonly}
      {rows}
    >{value}</textarea>

  {:else if type === 'checkbox'}
    <label class="label cursor-pointer justify-start gap-3">
      <input
        id={name}
        {name}
        type="checkbox"
        class={cn('checkbox', inputClass)}
        checked={!!value}
        {disabled}
      />
      <span class="label-text">{label}{#if required}<span class="text-error">*</span>{/if}</span>
    </label>

  {:else}
    <input
      id={name}
      {name}
      {type}
      {value}
      class={cn('input input-bordered w-full', inputClass)}
      {placeholder}
      {required}
      {disabled}
      {readonly}
    />
  {/if}

  {#if error}
    <label class="label">
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {:else if helpText}
    <label class="label">
      <span class="label-text-alt text-base-content/50">{helpText}</span>
    </label>
  {/if}
</div>
