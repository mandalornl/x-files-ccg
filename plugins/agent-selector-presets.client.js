// TODO: Remove temporary fix in the near future.
export default () => {
  const json = localStorage.getItem('x-files-ccg') ?? '';

  if (!json.includes('"presents"')) {
    return;
  }

  localStorage.setItem('x-files-ccg', json.replace('"presents"', '"presets"'));
}
