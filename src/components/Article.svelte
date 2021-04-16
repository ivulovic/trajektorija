<script>
  import Tag from "components/Tag.svelte";
  import { fade } from "svelte/transition";

  import ButtonReadMore from "components/ButtonReadMore.svelte";

  export let title;
  export let description;
  export let slug;
  export let categories;
  export let category;
</script>

<style>
  .article-medium {
    display: grid;
    grid-gap: 12px;
    width: 100%;
    min-height: 115px;
    -webkit-tap-highlight-color: transparent;
  }
  .title {
    font-size: 22px;
    line-height: 30px;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 400;
    transition: color 0.3s ease;
  }
  .description {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    margin: 6px 0px 6px 0px;
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  a {
    text-decoration: none;
  }
  a:hover :global(.link),
  a:hover :global(.arrow-right) {
    color: var(--primary);
    fill: var(--primary);
  }
  @media (max-width: 1040px) {
    .title {
      font-size: 20px;
      line-height: 24px;
    }
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info .categories {
    display: flex;
    align-items: center;
  }
  .info a {
    padding: 0px;
    margin-right: 5px;
    text-decoration: none;
  }
  .info a:last-child {
    margin-right: 0px;
  }
  .active :global(.tag) {
    background: var(--primary);
    color: white;
  }

  @media (max-width: 480px) {
    .article-medium {
      min-height: unset;
    }
    .title {
      font-size: 18px;
      line-height: 24px;
    }
    .description {
      font-size: 14px;
      margin-bottom: 6px;
    }
  }
</style>

<a
  href={slug}
  rel="prefetch"
  class="article-medium"
  in:fade={{ duration: 250 }}>
  <div class="details">
    <h1 class="title">{title}</h1>
    <p class="description">{description}</p>
    <div class="info">
      <div class="categories">
        {#each categories as { id, label }}
          <a
            rel="prefetch"
            class={id === category ? 'active' : ''}
            href={category === id ? '/' : '/?category=' + id}>
            <Tag title={label} />
          </a>
        {/each}
      </div>
      <ButtonReadMore link={slug} />
    </div>
  </div>
</a>
