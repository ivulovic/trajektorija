<script>
  import Warning from "../icons/Warning.svelte";

  export let date;
  const currentYear = new Date().getFullYear();
  const dateYear = new Date(date).getFullYear();
</script>

<style>
  div {
    display: flex;
    align-items: center;
    padding: 6px 16px;
    margin-bottom: 12px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.43;
    border-radius: 4px;
    letter-spacing: 0.01071em;
    color: var(--text);
    background-color: var(--shadow-light);
  }
  span {
    margin-right: 12px;
    position: relative;
    top: 2px;
  }
  p {
    font-style: normal;
  }
</style>

{#if currentYear - dateYear >= 2}
  <div>
    <span>
      <Warning />
    </span>
    <p>
      Овај чланак је стар више од две године. Сасвим је могуће да се моје
      мишљење на ову тему данас уопште не слаже са овде написаним.
    </p>
  </div>
{/if}
