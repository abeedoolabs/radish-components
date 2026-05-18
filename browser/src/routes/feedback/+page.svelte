<script lang="ts">
  import { Alert, Loading, Progress, RadialProgress, Skeleton, Toast, Tooltip, toast, Icon } from '@abeedoo/radish-components';
  import Demo from '$lib/components/Demo.svelte';
  import { alertProps, loadingProps, progressProps, tooltipProps } from '$lib/props';

  let progressVal = $state(65);

  const alertCode = `import { Alert } from '@abeedoo/radish-components';

<Alert variant="info">Informational message.</Alert>
<Alert variant="success">Operation completed!</Alert>
<Alert variant="warning">Please review.</Alert>
<Alert variant="error">Something went wrong.</Alert>`;

  const loadingCode = `import { Loading } from '@abeedoo/radish-components';

<Loading type="spinner" />
<Loading type="dots" />
<Loading type="ring" />
<Loading type="spinner" size="lg" variant="primary" />`;

  const progressCode = `import { Progress } from '@abeedoo/radish-components';

<Progress value={65} variant="primary" />
<Progress value={40} variant="success" />
<Progress variant="warning" />`;

  const radialProgressCode = `import { RadialProgress } from '@abeedoo/radish-components';

<RadialProgress value={70} variant="primary" />
<RadialProgress value={45} variant="success" size="6rem" />
<RadialProgress value={90} variant="error" size="3rem" thickness="2px" />`;

  const skeletonCode = `import { Skeleton } from '@abeedoo/radish-components';

<Skeleton circle width="3rem" height="3rem" />
<Skeleton height="1rem" />
<Skeleton height="8rem" />`;

  const tooltipCode = `import { Tooltip } from '@abeedoo/radish-components';

<Tooltip tip="Top tooltip" position="top">
  <button class="btn btn-sm">Top</button>
</Tooltip>
<Tooltip tip="Primary" variant="primary">
  <button class="btn btn-sm btn-primary">Primary</button>
</Tooltip>`;

  const toastCode = `import { Toast, toast } from '@abeedoo/radish-components';

<Toast />

toast.success('Success!');
toast.error('Error occurred');
toast.warning('Warning!');
toast.info('Info message');`;
</script>

<Toast />

<h1 class="text-3xl font-bold mb-6">Feedback</h1>

<Demo title="Alert" description="Info, success, warning, error variants with auto-icons" code={alertCode} props={alertProps}>
  <div class="space-y-3">
    <Alert variant="info">This is an informational message.</Alert>
    <Alert variant="success">Operation completed successfully!</Alert>
    <Alert variant="warning">Please review before continuing.</Alert>
    <Alert variant="error">Something went wrong.</Alert>
  </div>
</Demo>

<Demo title="Loading" description="Spinner types and sizes" code={loadingCode} props={loadingProps}>
  <div class="flex items-center gap-6 mb-4">
    <Loading type="spinner" />
    <Loading type="dots" />
    <Loading type="ring" />
    <Loading type="ball" />
    <Loading type="bars" />
    <Loading type="infinity" />
  </div>
  <div class="flex items-center gap-6">
    <Loading type="spinner" size="xs" variant="primary" />
    <Loading type="spinner" size="sm" variant="secondary" />
    <Loading type="spinner" size="md" variant="success" />
    <Loading type="spinner" size="lg" variant="error" />
  </div>
</Demo>

<Demo title="Progress" description="Determinate progress bar" code={progressCode} props={progressProps}>
  <div class="space-y-3 max-w-sm">
    <Progress value={progressVal} variant="primary" />
    <Progress value={40} variant="success" />
    <Progress variant="warning" />
    <input type="range" min="0" max="100" bind:value={progressVal} class="range range-xs" />
  </div>
</Demo>

<Demo title="Radial Progress" description="Circular progress indicator" code={radialProgressCode} props={progressProps}>
  <div class="flex gap-6">
    <RadialProgress value={70} variant="primary" />
    <RadialProgress value={45} variant="success" size="6rem" />
    <RadialProgress value={90} variant="error" size="3rem" thickness="2px" />
  </div>
</Demo>

<Demo title="Skeleton" description="Content placeholder" code={skeletonCode}>
  <div class="space-y-3 max-w-sm">
    <div class="flex items-center gap-4">
      <Skeleton circle width="3rem" height="3rem" />
      <div class="flex-1 space-y-2">
        <Skeleton height="1rem" />
        <Skeleton height="1rem" width="80%" />
      </div>
    </div>
    <Skeleton height="8rem" />
  </div>
</Demo>

<Demo title="Tooltip" description="Directional tooltips with variants" code={tooltipCode} props={tooltipProps}>
  <div class="flex gap-4 py-8">
    <Tooltip tip="Top tooltip" position="top">
      <button class="btn btn-sm">Top</button>
    </Tooltip>
    <Tooltip tip="Bottom tooltip" position="bottom">
      <button class="btn btn-sm">Bottom</button>
    </Tooltip>
    <Tooltip tip="Primary" variant="primary">
      <button class="btn btn-sm btn-primary">Primary</button>
    </Tooltip>
    <Tooltip tip="Always open" open>
      <button class="btn btn-sm">Open</button>
    </Tooltip>
  </div>
</Demo>

<Demo title="Toast" description="Click to trigger toast notifications" code={toastCode}>
  <div class="flex gap-2">
    <button class="btn btn-success btn-sm" onclick={() => toast.success('Success!')}>Success</button>
    <button class="btn btn-error btn-sm" onclick={() => toast.error('Error occurred')}>Error</button>
    <button class="btn btn-warning btn-sm" onclick={() => toast.warning('Warning!')}>Warning</button>
    <button class="btn btn-info btn-sm" onclick={() => toast.info('Info message')}>Info</button>
  </div>
</Demo>
