<script>
import { text } from "svelte/internal";

</script>

<style>
  .Search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  input[type=text] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid var(--white);
    background: transparent;
    outline: none;
    margin-top: 10px;
    width: 85%;
    margin-bottom: 10px;
    color: var(--white);
  }
  ::placeholder {
    color: var(--white);
  }
</style>

<div class="Search">
  <input type="text" placeholder="Busca tu película favorita..."/>
</div>