<script lang="ts">
import type { Snippet } from 'svelte';
import { cn } from '../../utils.js';
import Icon from '../composites/Icon.svelte';

let {
  accept = '',
  multiple = false,
  maxSize,
  disabled = false,
  class: className = '',
  children,
  onDrop,
  onError
}: {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  class?: string;
  children?: Snippet;
  onDrop?: (files: File[]) => void;
  onError?: (message: string) => void;
} = $props();

let dragging = $state(false);
let fileInput: HTMLInputElement;

function validateFiles(files: File[]): File[] {
  const valid: File[] = [];
  const acceptTypes = accept ? accept.split(',').map(t => t.trim()) : [];

  for (const file of files) {
    if (acceptTypes.length > 0) {
      const matches = acceptTypes.some(t => {
        if (t.startsWith('.')) return file.name.toLowerCase().endsWith(t.toLowerCase());
        if (t.endsWith('/*')) return file.type.startsWith(t.replace('/*', '/'));
        return file.type === t;
      });
      if (!matches) {
        onError?.(`File "${file.name}" is not an accepted type`);
        continue;
      }
    }
    if (maxSize && file.size > maxSize) {
      onError?.(`File "${file.name}" exceeds max size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      continue;
    }
    valid.push(file);
  }

  if (!multiple && valid.length > 1) return [valid[0]];
  return valid;
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  dragging = false;
  if (disabled) return;

  const files = Array.from(e.dataTransfer?.files || []);
  const valid = validateFiles(files);
  if (valid.length > 0) onDrop?.(valid);
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  if (!disabled) dragging = true;
}

function handleDragLeave() {
  dragging = false;
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  const valid = validateFiles(files);
  if (valid.length > 0) onDrop?.(valid);
  input.value = '';
}

function openPicker() {
  if (!disabled) fileInput?.click();
}
</script>

<div
  role="button"
  tabindex="0"
  class={cn(
    'border-2 border-dashed rounded-box p-8 text-center transition-colors cursor-pointer',
    dragging ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-base-content/30',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )}
  ondrop={handleDrop}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  onclick={openPicker}
  onkeydown={(e) => e.key === 'Enter' && openPicker()}
>
  <input
    bind:this={fileInput}
    type="file"
    class="hidden"
    {accept}
    {multiple}
    {disabled}
    onchange={handleFileSelect}
  />

  {#if children}
    {@render children()}
  {:else}
    <div class="flex flex-col items-center gap-2">
      <Icon name={dragging ? 'download' : 'upload'} size={32} class="text-base-content/30" />
      <p class="text-sm text-base-content/60">
        {#if dragging}
          Drop files here
        {:else}
          Drag & drop files here, or <span class="text-primary font-medium">browse</span>
        {/if}
      </p>
      {#if accept}
        <p class="text-xs text-base-content/40">Accepted: {accept}</p>
      {/if}
      {#if maxSize}
        <p class="text-xs text-base-content/40">Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB</p>
      {/if}
    </div>
  {/if}
</div>
