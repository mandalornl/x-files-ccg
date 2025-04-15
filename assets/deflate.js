/**
 * Uint8Array to readable stream
 *
 * @param {Uint8Array} value
 *
 * @returns {ReadableStream<any>}
 */
const uint8ArrayToReadableStream = (value) => (
  new ReadableStream({
    start: (controller) => {
      controller.enqueue(value);
      controller.close();
    }
  })
);

/**
 * Uint8Array to Base64
 *
 * @param {Uint8Array} value
 *
 * @returns {string}
 */
const uint8ArrayToBase64 = (value) => {
  let str = '';

  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }

  return btoa(str);
};

/**
 * Base64 to Uint8Array
 *
 * @param {string} value
 *
 * @returns {Uint8Array}
 */
const base64ToUint8Array = (value) => {
  const str = atob(value);
  const uint8Array = new Uint8Array(str.length);

  for (let i = 0; i < str.length; i++) {
    uint8Array[i] = str.charCodeAt(i);
  }

  return uint8Array;
};

/**
 * Compress
 *
 * @param {?string} value
 *
 * @returns {Promise<?string>}
 */
export const compress = async (value) => {
  if (!value) {
    return null;
  }

  const input = new TextEncoder().encode(value);
  const readable = uint8ArrayToReadableStream(input);

  const writable = new CompressionStream('deflate');
  const output = await new Response(readable.pipeThrough(writable)).arrayBuffer();

  return uint8ArrayToBase64(new Uint8Array(output));
};

/**
 * Decompress
 *
 * @param {?string} value
 *
 * @returns {Promise<?string>}
 */
export const decompress = async (value) => {
  if (!value) {
    return null;
  }

  const readable = uint8ArrayToReadableStream(base64ToUint8Array(value));
  const writable = new DecompressionStream('deflate');

  const output = await new Response(readable.pipeThrough(writable)).arrayBuffer();

  return new TextDecoder().decode(output);
};
