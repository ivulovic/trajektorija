<script>
  export let categories;
  export let category;
</script>

<style>
  @keyframes animation-lightspeed-in {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .chart-wrapper {
    overflow: hidden;
  }
  .chart-vertical {
    display: flex;
    height: 150px;
    padding-top: 24px;
    overflow: hidden;
    align-items: flex-end;
    justify-content: space-between;
    overflow: auto hidden;
    box-sizing: content-box;
  }
  .chart-vertical .chart-bar {
    animation: 1s animation-lightspeed-in ease forwards;
    opacity: 0;
    background: var(--shadow-light);
    list-style: none;
    margin-right: 10px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }
  .chart-vertical .chart-bar:last-child {
    margin-right: 0px;
  }
  .chart-vertical .chart-bar span {
    bottom: 100%;
    z-index: 1;
    font-size: 14px;
    text-align: center;
    position: absolute;
    word-break: break-word;
    text-decoration: none;
    text-transform: capitalize;
    padding: 6px 0px;
  }

  .chart-vertical .chart-bar:hover {
    background-color: var(--background-light);
  }

  .chart-vertical .chart-bar.active {
    background: var(--primary);
  }

  @media (max-width: 480px) {
    .chart-vertical .chart-bar span {
      padding: 4px 0px;
      font-size: 10px;
    }
    .chart-vertical {
      height: 150px;
    }
    .chart-vertical .chart-bar {
      margin-right: 5px;
    }
  }

  .chart-vertical .chart-bar {
    height: 10%;
  }
</style>

<div class="wrap">
  <section class="chart-wrapper">
    <ul class="chart-vertical">
      {#each categories as { percentage, id, label }, i}
        <a
          class="chart-bar {id === category ? 'active' : ''}"
          style="height: {percentage}%; animation-delay: {0.1 * i}s;"
          href={category === id ? '/' : '/?category=' + id}><span>{label}</span></a>
      {/each}
    </ul>
  </section>
</div>
