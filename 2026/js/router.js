const DEFAULT_ROUTE = 'home'

function getRouteFromHash() {
  return location.hash.replace('#', '') || DEFAULT_ROUTE
}

export function initRouter() {
  const $buttons = [...document.querySelectorAll('.nav-btn[data-route]')]
  const $sections = [...document.querySelectorAll('.router > [data-route]')]
  const validRoutes = $sections.map($section => $section.dataset.route)

  function setActive(route) {
    if (!validRoutes.includes(route)) route = DEFAULT_ROUTE

    $sections.forEach($section => {
      $section.classList.toggle('active', $section.dataset.route === route)
    })

    $buttons.forEach($btn => {
      const isActive = $btn.dataset.route === route
      $btn.classList.toggle('active', isActive)
      $btn.setAttribute('aria-current', isActive ? 'page' : 'false')
    })
  }

  $buttons.forEach($btn => {
    $btn.addEventListener('click', () => {
      if (location.hash === `#${$btn.dataset.route}`) return
      location.hash = $btn.dataset.route
    })
  })

  window.addEventListener('hashchange', () => setActive(getRouteFromHash()))

  setActive(getRouteFromHash())
}
