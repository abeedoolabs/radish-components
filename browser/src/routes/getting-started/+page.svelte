<script lang="ts">
  import Demo from '$lib/components/Demo.svelte';
  import CodeSample from '$lib/components/CodeSample.svelte';
  import { Button, Alert, toast, Toast, Icon } from '@abeedoo/radish-components';

  const installCode = `npm install @abeedoo/radish-components

# Peer dependencies
npm install svelte@^5 tailwindcss@^4 daisyui@^5`;

  const cssCode = `/* app.css */
@import "tailwindcss";
@source "../node_modules/@abeedoo/radish-components/dist/**/*.svelte";
@plugin "daisyui";`;

  const basicCode = `import { Button, Card, Modal, toast } from '@abeedoo/radish-components';

<Button variant="primary" onclick={() => toast.success('Hello!')}>
  Click me
</Button>`;

  const bindingCode = `import { TextInput, Checkbox, Toggle, Select, Rating, Range } from '@abeedoo/radish-components';

let name = $state('');
let agreed = $state(false);
let darkMode = $state(false);
let role = $state('user');

<TextInput bind:value={name} placeholder="Your name" />
<Checkbox bind:checked={agreed} label="I agree to terms" />
<Toggle bind:checked={darkMode} label="Dark mode" />
<Select bind:value={role} options={[
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' }
]} />`;

  const snippetCode = `import { Card, Modal, Button } from '@abeedoo/radish-components';

<Card title="Users">
  {#snippet headerActions()}
    <Button size="sm" variant="primary">Add User</Button>
  {/snippet}
  <p>Card content here.</p>
</Card>

<Modal bind:open={showModal} title="Edit">
  <p>Modal body content.</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => showModal = false}>Cancel</Button>
    <Button variant="primary" onclick={save}>Save</Button>
  {/snippet}
</Modal>`;

  const eventCode = `<!-- All interactive components forward rest props -->
<Button
  variant="primary"
  onclick={() => save()}
  aria-label="Save document"
  data-testid="save-btn"
>
  Save
</Button>

<TextInput
  bind:value={email}
  onfocus={() => clearError()}
  aria-describedby="email-help"
/>`;

  const toastCode = `<!-- Mount once in root +layout.svelte -->
import { Toast } from '@abeedoo/radish-components';
<Toast />

<!-- Call from anywhere -->
import { toast } from '@abeedoo/radish-components';

toast.success('Saved successfully');
toast.error('Something went wrong');
toast.warning('Please review');
toast.info('New update available');`;
</script>

<Toast />

<div class="max-w-3xl">
  <h1 class="text-3xl font-bold mb-2">Getting Started</h1>
  <p class="text-lg text-base-content/60 mb-8">
    Install @abeedoo/radish-components and start building with 70+ Svelte 5 components.
  </p>

  <!-- Step 1: Install -->
  <div class="mb-8">
    <h3 class="text-lg font-semibold mb-1">1. Install</h3>
    <p class="text-sm text-base-content/60 mb-3">Add the package and its peer dependencies</p>
    <CodeSample code={installCode} />
  </div>

  <!-- Step 2: Configure CSS -->
  <div class="mb-8">
    <h3 class="text-lg font-semibold mb-1">2. Configure CSS</h3>
    <p class="text-sm text-base-content/60 mb-3">Set up Tailwind with DaisyUI and source scanning in your <code>app.css</code></p>
    <CodeSample code={cssCode} />
    <Alert variant="warning" class="mt-3">
      The <code>@source</code> directive ensures Tailwind detects classes used inside library components.
    </Alert>
  </div>

  <!-- Step 3: Basic Usage -->
  <div class="mb-8">
    <h3 class="text-lg font-semibold mb-1">3. Import and Use</h3>
    <p class="text-sm text-base-content/60 mb-3">Import components and start building</p>
    <CodeSample code={basicCode} />
    <div class="border border-base-300 rounded-lg bg-base-100 p-6 mt-3">
      <div class="flex gap-2">
        <Button variant="primary" onclick={() => toast.success('Hello from @abeedoo/radish-components!')}>
          Click me
        </Button>
        <Button variant="secondary" outline>Secondary</Button>
      </div>
    </div>
  </div>

  <!-- Step 4: Bindings -->
  <Demo title="4. Bindable Values" description="Input components support two-way binding with $bindable" code={bindingCode}>
    <Alert variant="info">
      All input components (<code>TextInput</code>, <code>Checkbox</code>, <code>Toggle</code>, <code>Select</code>, <code>Radio</code>, <code>Range</code>, <code>Rating</code>) support <code>bind:value</code> or <code>bind:checked</code>.
    </Alert>
  </Demo>

  <!-- Step 5: Snippets -->
  <Demo title="5. Snippets" description="Use Svelte 5 snippets for flexible composition" code={snippetCode}>
    <Alert variant="info">
      Components like <code>Card</code>, <code>Modal</code>, <code>DataTable</code>, and <code>EmptyState</code> accept named snippets for headers, footers, and action areas.
    </Alert>
  </Demo>

  <!-- Step 6: Events -->
  <Demo title="6. Event Handlers" description="All components forward rest props — onclick, aria-*, data-*, etc." code={eventCode}>
    <Alert variant="info">
      No need to declare every event — <code>...rest</code> props are spread onto the primary HTML element automatically.
    </Alert>
  </Demo>

  <!-- Step 7: Toast -->
  <Demo title="7. Toast Notifications" description="Mount once, call from anywhere" code={toastCode}>
    <div class="flex gap-2">
      <Button variant="success" size="sm" onclick={() => toast.success('Success!')}>
        <Icon name="check-circle" size={16} /> Success
      </Button>
      <Button variant="error" size="sm" onclick={() => toast.error('Error!')}>
        <Icon name="alert-circle" size={16} /> Error
      </Button>
      <Button variant="warning" size="sm" onclick={() => toast.warning('Warning!')}>
        <Icon name="alert-triangle" size={16} /> Warning
      </Button>
      <Button variant="info" size="sm" onclick={() => toast.info('Info!')}>
        <Icon name="info" size={16} /> Info
      </Button>
    </div>
  </Demo>
</div>
