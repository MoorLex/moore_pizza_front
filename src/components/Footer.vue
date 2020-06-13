<template>
  <footer class="">
    <div class="container border-top pt-4 pt-md-5 mb-md-5 d-flex align-items-center flex-column">
      <img class="mb-2"
           src="/static/img/logo.svg"
           alt=""
           height="60">
      <ul class="nav mb-3">
        <li class="nav-item">
          <RouterLink class="nav-link"
             :to="{ name: 'Home' }">
            Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link"
             :to="{ name: 'Menu' }">
            Menu
          </RouterLink>
        </li>
      </ul>
      <small class="d-block text-muted">© 2020-2020</small>
    </div>
  </footer>
</template>
