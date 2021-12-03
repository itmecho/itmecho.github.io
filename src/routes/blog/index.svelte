<script context="module" lang="ts">
  const rawPosts = import.meta.glob('./*.svx');

  interface Frontmatter {
    title: string;
    summary: string;
    date: Date;
    slug: string;
  }

  let body = [];

  for (const path in rawPosts) {
    body.push(
      rawPosts[path]().then(({ metadata }) => ({
        slug: path.replace(/.\/(.+).svx/, '$1'),
        ...metadata,
      }))
    );
  }
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const posts: Frontmatter[] = await Promise.all(body);
    return {
      props: {
        posts,
      },
    };
  }
</script>

<script lang="ts">
  export let posts: Frontmatter[];
</script>

{#each posts as { title, summary, date, slug }}
  <a href="/blog/{slug}">{title}</a>
  <p>{summary}</p>
  <p>{date}</p>
{/each}
