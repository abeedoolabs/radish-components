<script lang="ts">
  import { Card, Divider, Drawer, Hero, Footer, Stack } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { cardProps, dividerProps, drawerProps } from '$lib/props';

  let drawerOpen = $state(false);

  const cardCode = `import { Card } from '@abeedoo/radish-components';

<Card title="Default Card" description="With subtitle">
  <p>Card content goes here.</p>
</Card>

<Card title="With Actions" compact>
  {#snippet headerActions()}
    <button class="btn btn-sm btn-primary">Action</button>
  {/snippet}
  <p>Compact card with header action.</p>
</Card>

<Card flat>
  <p>Flat card (no shadow).</p>
</Card>`;

  const dividerCode = `import { Divider } from '@abeedoo/radish-components';

<Divider />
<Divider text="OR" />
<Divider text="Section" variant="primary" />
<Divider vertical text="or" />`;

  const drawerCode = `import { Drawer } from '@abeedoo/radish-components';

let open = $state(false);

<Drawer bind:open={open} id="my-drawer">
  {#snippet sidebar()}
    <ul class="menu bg-base-200 min-h-full w-60 p-4">
      <li><button>Item 1</button></li>
    </ul>
  {/snippet}
  <label for="my-drawer" class="btn btn-primary btn-sm drawer-button">
    Open Drawer
  </label>
</Drawer>`;

  const heroCode = `import { Hero } from '@abeedoo/radish-components';

<Hero class="bg-base-200 min-h-[20vh]">
  <div>
    <h2 class="text-3xl font-bold">Hello there</h2>
    <p class="py-4">A hero section for landing pages.</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</Hero>`;

  const stackCode = `import { Stack } from '@abeedoo/radish-components';

<Stack>
  <div class="card bg-primary text-primary-content w-48 shadow-md">
    <div class="card-body p-4">Card 1</div>
  </div>
  <div class="card bg-secondary text-secondary-content w-48 shadow-md">
    <div class="card-body p-4">Card 2</div>
  </div>
</Stack>`;

  const footerCode = `import { Footer } from '@abeedoo/radish-components';

<Footer center>
  <p>Copyright 2024 Acme Inc.</p>
</Footer>`;
</script>

<h1 class="text-3xl font-bold mb-6">Layout</h1>

<Demo title="Card" description="With title, description, headerActions, compact, flat" code={cardCode} props={cardProps}>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card title="Default Card" description="With title and description">
      <p>Card content goes here.</p>
    </Card>
    <Card title="With Actions" compact>
      {#snippet headerActions()}
        <button class="btn btn-sm btn-primary">Action</button>
      {/snippet}
      <p>Compact card with header action.</p>
    </Card>
    <Card flat>
      <p>Flat card (no shadow).</p>
    </Card>
  </div>
</Demo>

<Demo title="Divider" description="Horizontal and vertical with text" code={dividerCode} props={dividerProps}>
  <div class="space-y-4">
    <Divider />
    <Divider text="OR" />
    <Divider text="Section" variant="primary" />
    <div class="flex h-16 items-center">
      <span>Left</span>
      <Divider vertical text="or" />
      <span>Right</span>
    </div>
  </div>
</Demo>

<Demo title="Drawer" description="Sidebar drawer (toggle to open)" code={drawerCode} props={drawerProps}>
  <div class="h-48 border border-base-300 rounded-lg overflow-hidden">
    <Drawer bind:open={drawerOpen} id="demo-drawer">
      {#snippet sidebar()}
        <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          <li><button type="button">Sidebar Item 1</button></li>
          <li><button type="button">Sidebar Item 2</button></li>
          <li><button type="button">Sidebar Item 3</button></li>
        </ul>
      {/snippet}
      <div class="p-4">
        <label for="demo-drawer" class="btn btn-primary btn-sm drawer-button">
          Open Drawer
        </label>
        <p class="text-sm text-base-content/60 mt-2">Click the button to open the sidebar.</p>
      </div>
    </Drawer>
  </div>
</Demo>

<Demo title="Hero" description="Hero section" code={heroCode}>
  <Hero class="bg-base-200 rounded-lg min-h-[20vh]">
    <div>
      <h2 class="text-3xl font-bold">Hello there</h2>
      <p class="py-4">A hero section for landing pages.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </Hero>
</Demo>

<Demo title="Stack" description="Stacked cards effect" code={stackCode}>
  <Stack>
    <div class="card bg-primary text-primary-content w-48 shadow-md"><div class="card-body p-4">Card 1</div></div>
    <div class="card bg-secondary text-secondary-content w-48 shadow-md"><div class="card-body p-4">Card 2</div></div>
    <div class="card bg-accent text-accent-content w-48 shadow-md"><div class="card-body p-4">Card 3</div></div>
  </Stack>
</Demo>
