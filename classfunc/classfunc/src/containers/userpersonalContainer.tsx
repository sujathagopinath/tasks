import * as React from "react";

const isStepOptional = (step: number) => {
  return step === 1;
};

const isStepSkipped = (step: number) => {
  return skipped.has(step);
};

const handleNext = () => {
  let newSkipped = skipped;
  if (isStepSkipped(activeStep)) {
    newSkipped = new Set(newSkipped.values());
    newSkipped.delete(activeStep);
  }

  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  setSkipped(newSkipped);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleSkip = () => {
  if (!isStepOptional(activeStep)) {
    throw new Error("You can't skip a step that isn't optional.");
  }

  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  setSkipped((prevSkipped) => {
    const newSkipped = new Set(prevSkipped.values());
    newSkipped.add(activeStep);
    return newSkipped;
  });
};

const handleReset = () => {
  setActiveStep(0);
};
