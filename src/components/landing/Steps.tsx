import React, { useEffect, useState } from "react";

const steps = [
  {
    title: "Design",
    text: "Your dream space begins with a thoughtful design plan.",
  },
  {
    title: "Build",
    text: "From materials to finishes — every detail is executed flawlessly.",
  },
  {
    title: "Move-In",
    text: "Enjoy your new space — with our hassle-free civil work and installation services.",
  },
];

const Steps: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto transition every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-6">
        Complete home interiors in 3 easy steps
      </h2>

      {/* Steps bar */}
      <div className="flex justify-center items-center mb-6">
        {steps.map((_, i) => (
          <React.Fragment key={i}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                i === activeStep ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-16 border-t-2 border-dashed border-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="transition-all duration-1000 ease-in-out">
        <h3 className="text-xl font-semibold text-red-500 mb-2">
          {steps[activeStep].title}
        </h3>
        <p className="text-gray-600">{steps[activeStep].text}</p>
      </div>
    </div>
  );
};

export default Steps;