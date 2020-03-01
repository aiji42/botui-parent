const loading = document.createElement('div');

loading.classList.add('loading-panel');

loading.innerHTML = `
  <div class="ball-scale-ripple-multiple">
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

document.body.insertBefore(loading, document.body.firstChild);

export default loading;