<script>
  import { authorization, username } from '../../stores/stores.js'
  let name = ''
  let password = ''
  let error = ''
  const signup = (e) => {
    e.preventDefault()
    fetch('/api/signup', {
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
      if (res.status === 400) {
        error = 'Invalid input'
      } else if (res.status === 409) {
        error = `username ${name} already exists`
      } else if (res.status === 201) {
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
    on:submit={signup}
  >
    <h1 class="text-white text-2xl text-bold mb-6">Signup form</h1>
    <div class="w-full flex justify-center">
      <input 
        class="p-2 border border-gray-300 rounded-lg shadow-sm" 
        placeholder="username"
        minlength="1"
        maxlength="15"
        bind:value={name}
      />
    </div>
    <div class="w-full flex justify-center mt-4">
      <input 
        class="p-2 border border-gray-300 rounded-lg shadow-sm"
        placeholder="password"
        type="password"
        minlength="5"
        maxlength="30"
        bind:value={password}
      />
    </div>
    <button class="p-3 bg-white rounded-lg w-52 hover:bg-gray-300 mt-6">Signup</button>
    <a class="text-blue-500 hover:text-violet-500 mt-4" href='/login'>Already have an account?</a>
    <div class="text-red-500">{error}</div>
  </form>
</div>
  