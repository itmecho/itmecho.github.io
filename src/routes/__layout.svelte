<script context="module" lang="ts">
  import '../global.css';
  import '../prism-nord.css';

  let darkMode: boolean = true;

  export const prerender = true;
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Expletus+Sans&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class:dark={darkMode}>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-200 to-white dark:from-gray-800 dark:to-indigo-800 dark:text-gray-50"
  >
    <header class="max-w-screen-lg mx-auto flex justify-between items-center py-6">
      <h1 class="font-brand text-4xl">itmecho</h1>
      <nav class="flex gap-4">
        <a href="/blog" class="cursor-pointer hover:underline">Blog</a>
        <!-- TODO: Style with icons -->
        <span on:click={() => (darkMode = !darkMode)}>dm</span>
      </nav>
    </header>

    <main class="max-w-screen-md m-auto flex flex-col">
      <slot />
    </main>
  </div>
</div>
