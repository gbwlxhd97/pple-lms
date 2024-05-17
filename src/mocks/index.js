async function initMocks() {
  if (typeof window === 'undefined') {
    // const { server } = await import('./server.js');
    // server.listen();
  } else {
    const { worker } = await import('./browser.js');
    worker.start();
  }
}

export default initMocks;
