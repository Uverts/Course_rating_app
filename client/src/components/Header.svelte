<script>
  import { username, authorization } from '../stores/stores.js'
  const logout = () => {
    username.set(null)
    authorization.set(null)
  }
</script>

<nav class="p-3 mb-4 shadow-lg text-right">
  {#if $username}
  <span class="text-2xl text-gray-700 font-serif mr-44">
    Logged in as {$username}
  </span>
  <span class="text-2xl text-gray-700 font-serif mr-2">
    <button on:click={logout}>logout</button>
  </span>
  {:else}
    <a href='/login'>sign in</a>
  {/if}
</nav> 
