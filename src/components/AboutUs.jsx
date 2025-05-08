import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
          About Me
        </h2>

        {/* About Me Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-md ring-4 ring-amber-400 mb-4">

              </div>
              <h2 className="text-xl font-semibold">S Kaushik Rao</h2>
              <p className="text-sm text-gray-300">Frontend Developer | AI Enthusiast</p>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h5 className="text-lg font-semibold text-amber-400 mb-2">Project Vision</h5>
                <p className="text-gray-300">
                  The goal of this project is to build a real-time crypto tracker that feels
                  modern and informative. I aim to provide a clean UI, and data that is demanded exactly as per the Assignment.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-amber-400 mb-4">Contact</h5>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email Card */}
                  <a
                    href="mailto:skaushikrao@gmail.com"
                    className="transition transform hover:scale-105 duration-300 bg-gray-800 rounded-xl shadow-lg p-5 text-center border border-gray-600 hover:border-blue-400"
                  >
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Email</h6>
                    <p className="text-sm break-words">skaushikrao@gmail.com</p>
                  </a>

                  {/* GitHub Card */}
                  <a
                    href="https://github.com/SKaushikRao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition transform hover:scale-105 duration-300 bg-gray-800 rounded-xl shadow-lg p-5 text-center border border-gray-600 hover:border-purple-400"
                  >
                    <h6 className="text-lg font-semibold text-purple-400 mb-2">GitHub</h6>
                    <p className="text-sm break-words">github.com/SKaushikRao</p>
                  </a>

                  {/* Portfolio Card */}
                  <a
                    href="https://skaushikrao.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition transform hover:scale-105 duration-300 bg-gray-800 rounded-xl shadow-lg p-5 text-center border border-gray-600 hover:border-pink-400"
                  >
                    <h6 className="text-lg font-semibold text-pink-400 mb-2">Portfolio</h6>
                    <p className="text-sm break-words">Click to visit</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Project Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-8 text-pink-400">About This Project</h3>
          <div className="space-y-10">

            {/* Technologies Used */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-pink-400 transition duration-300">
              <h5 className="text-lg font-semibold text-pink-400 mb-3">Technologies Used</h5>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>React & Redux Toolkit for state management</li>
                <li>Binance WebSocket API for real-time data</li>
                <li>Tailwind CSS for sleek responsive design</li>
              </ul>
            </div>

            {/* Key Features */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-pink-400 transition duration-300">
              <h5 className="text-lg font-semibold text-pink-400 mb-3">Key Features</h5>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>Color-coded price change indicators</li>
                <li>Responsive and mobile-friendly design</li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
