export const getStatus = async (status: number) => {
  const res = await fetch(`http://httpstat.us/${status}`);
  return await res.text();
};
