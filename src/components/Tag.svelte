<script>
  export let title;
  export let isActive = false;
</script>

<style>
  .tag-wrapper {
    cursor: pointer;
    display: flex;
    flex-direction: row;
  }
  .tag {
    font-size: 12px;
    background-color: var(--background-light);
    color: var(--text);
    padding: 2px 2px 1px 2px;
    border-radius: 0px;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @media (hover: hover) and (pointer: fine) {
    .tag-wrapper:hover .tag {
      background-color: var(--primary);
      color: white;
    }
  }
  .tag.active {
    background-color: var(--primary);
    color: white;
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 480px) {
    .tag {
      font-size: 10px;
      padding: 2px 2px 2px 2px;
    }
  }
</style>

<span class="tag-wrapper">
  <span class={`tag ${isActive ? 'active' : ''}`}>{title}</span>
</span>
