export const download = {
  methods: {
    download(url, name) {
      const anchor = document.createElement('a');

      if (name) {
        anchor.download = name;
      }

      anchor.href = url;
      anchor.target = '_blank';
      anchor.click();
    }
  }
}
