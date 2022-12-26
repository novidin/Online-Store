class Error404Page {
  render() {
    document.body.innerHTML = `
      <h1>Error 404</h1>
      <a href="/" data-local-link="data-local-link">Home</a>
    `
  }
}

export default Error404Page;
