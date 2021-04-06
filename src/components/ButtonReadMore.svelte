<script>
  import ArrowRight from "icons/ArrowRight.svelte";

  export let link;
</script>

<style>
  a {
    text-decoration: none;
    display: block;
    text-transform: uppercase;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: color 0.3s ease;
  }
  a :global(.arrow-right) {
    margin-left: 4px;
    transition: all 0.3s ease;
  }
  @media (max-width: 480px) {
    a {
      font-size: 14px;
    }
  }
</style>

<a class="link" href="/{link}">
  Прочитај
  <ArrowRight props={{ width: 22, height: 22 }} />
</a>
