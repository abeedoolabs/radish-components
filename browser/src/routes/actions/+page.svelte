<script lang="ts">
  import { Button, Dropdown, Swap, Icon } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { buttonProps, dropdownProps, swapProps } from '$lib/props';

  let swapActive = $state(false);

  const buttonCode = `import { Button, Icon } from '@abeedoo/radish-components';

<Button variant="primary">Primary</Button>
<Button variant="success" size="sm">Small</Button>
<Button variant="primary" outline>Outline</Button>
<Button variant="primary" loading>Loading</Button>
<Button variant="primary" href="/dashboard">Dashboard</Button>

<Button variant="success" onclick={() => save()}>
  <Icon name="check" size={16} /> Save
</Button>`;

  const dropdownCode = `import { Dropdown, Icon } from '@abeedoo/radish-components';

<Dropdown label="Click me" variant="primary">
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
</Dropdown>

<Dropdown variant="ghost" hover>
  {#snippet trigger()}
    <Icon name="more-vertical" size={16} />
  {/snippet}
  <li><button>Edit</button></li>
</Dropdown>

<Dropdown label="Menu" mode="popover">
  <li><button>Profile</button></li>
</Dropdown>`;

  const swapCode = `import { Swap, Icon } from '@abeedoo/radish-components';

let active = $state(false);

<Swap bind:active={active}>
  {#snippet on()}
    <Icon name="eye" size={32} />
  {/snippet}
  {#snippet off()}
    <Icon name="lock" size={32} />
  {/snippet}
</Swap>`;
</script>

<h1 class="text-3xl font-bold mb-6">Actions</h1>

<Demo title="Button" description="Variants, sizes, states, outline, loading" code={buttonCode} props={buttonProps}>
  <div class="flex flex-wrap gap-2 mb-4">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="accent">Accent</Button>
    <Button variant="success">Success</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="error">Error</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="neutral">Neutral</Button>
  </div>
  <div class="flex flex-wrap gap-2 mb-4">
    <Button variant="primary" size="xs">Tiny</Button>
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary">Medium</Button>
    <Button variant="primary" size="lg">Large</Button>
  </div>
  <div class="flex flex-wrap gap-2 mb-4">
    <Button variant="primary" outline>Outline</Button>
    <Button variant="primary" loading>Loading</Button>
    <Button variant="primary" disabled>Disabled</Button>
    <Button variant="primary" wide>Wide</Button>
  </div>
  <div class="flex flex-wrap gap-2">
    <Button variant="primary" href="#link">Link Button</Button>
    <Button variant="success"><Icon name="check" size={16} /> With Icon</Button>
  </div>
</Demo>

<Demo title="Dropdown" description="Details mode (default) and Popover mode" code={dropdownCode} props={dropdownProps}>
  <div class="flex gap-4 flex-wrap">
    <Dropdown label="Click me" variant="primary">
      <li><button type="button">Item 1</button></li>
      <li><button type="button">Item 2</button></li>
      <li><button type="button">Item 3</button></li>
    </Dropdown>

    <Dropdown label="Top" variant="secondary" position="top">
      <li><button type="button">Item 1</button></li>
      <li><button type="button">Item 2</button></li>
    </Dropdown>

    <Dropdown variant="ghost" hover>
      {#snippet trigger()}
        <Icon name="more-vertical" size={16} />
      {/snippet}
      <li><button type="button">Edit</button></li>
      <li><button type="button">Delete</button></li>
    </Dropdown>

    <Dropdown label="Popover" variant="accent" mode="popover">
      <li><button type="button">Profile</button></li>
      <li><button type="button">Settings</button></li>
      <li><button type="button">Logout</button></li>
    </Dropdown>
  </div>
</Demo>

<Demo title="Swap" description="Toggle between two states" code={swapCode} props={swapProps}>
  <div class="flex items-center gap-4">
    <Swap bind:active={swapActive}>
      {#snippet on()}
        <Icon name="eye" size={32} />
      {/snippet}
      {#snippet off()}
        <Icon name="lock" size={32} />
      {/snippet}
    </Swap>
    <span class="text-sm text-base-content/60">Active: {swapActive}</span>
  </div>
</Demo>
