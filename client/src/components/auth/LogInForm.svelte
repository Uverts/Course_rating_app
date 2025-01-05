<script>
  import { authorization, username } from '../../stores/stores.js'
  let name = ''
  let password = ''
  let error = ''

  const login = (e) => {
    e.preventDefault()
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
    .then((res) => {
      if (res.status === 401) {
        error = 'Wrong username or password.'
      } else if (res.status === 200) {
        authorization.set(res.headers.get('Authorization'))
        username.set(name)
        document.location = '/'
      }
    })
    .catch(err => console.error(err))
  }
</script>

<div class="flex flex-col items-center h-screen">
  <form 
    class="w-2/5 bg-prim basis-3/4 flex flex-col justify-center
    items-center p-5 border-8 rounded-full mt-10"
    on:submit={login}
  >
    <h1 class="text-white text-2xl text-bold mb-6">Login form</h1>
    <div class="w-full flex justify-center">
      <input 
        class="p-2 border border-gray-300 rounded-lg shadow-sm" 
        placeholder="username"
        bind:value={name}
      />
    </div>
    <div class="w-full flex justify-center mt-4">
      <input 
        class="p-2 border border-gray-300 rounded-lg shadow-sm"
        placeholder="password"
        bind:value={password}
      />
    </div>
    <button class="p-3 bg-white rounded-lg w-52 hover:bg-gray-300 mt-6">Login</button>
    <a class="text-blue-500 hover:text-violet-500 mt-4" href='/signup'>Don't have an account?</a>
    <div class="text-red-500">{error}</div>
  </form>
</div>
