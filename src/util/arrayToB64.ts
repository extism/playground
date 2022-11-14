function arrayTob64(buffer: Uint8Array) {
  var binary = '';
  var bytes = [].slice.call(buffer);
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

export default arrayTob64;
