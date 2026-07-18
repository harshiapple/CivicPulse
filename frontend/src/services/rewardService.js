

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getRewards = async () => {
  await delay(400);
  return rewards;
};