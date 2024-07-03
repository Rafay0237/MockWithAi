import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-600 mt-10">
          How this works.
        </h2>
        <h2 className="text-sm font-[500] text-gray-400">
          Thanks to Google Gemini.
        </h2>
      </div>

      <div className="border p-5 rounded-md w-full sm:w-3/4 lg:w-2/3 text-gray-800">
        <h2>
          Our AI mock interview platform uses the powerful Google Gemini API to
          conduct realistic interview simulations. Users can practice answering
          questions in real-time, and after each response, the platform provides
          a feedback is recorded on their answer. This feedback includes
          insights on strengths and areas for improvement, helping users refine
          their interview skills effectively.After interview Rating,Feedback and
          Correct Answer is provided on feedback page. The integration with
          Google Gemini ensures that the questions and evaluations are
          up-to-date and relevant to industry standards.
        </h2>
      </div>
    </div>
  );
};

export default page;
