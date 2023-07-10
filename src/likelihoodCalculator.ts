const generateRacerWinLikelihoodCalculator = () => {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning = Math.random();

  return (callback: (result: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
};

export { generateRacerWinLikelihoodCalculator }
