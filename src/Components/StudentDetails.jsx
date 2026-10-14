import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function StudentDetails() {
  const { slug } = useParams();
  const [dhainchas, setDhainchas] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatafunc = async () => {
      try {
        const responded = await fetch('/Datafet.json');
        if (!responded.ok) {
          throw new Error('Failed to fetch data');
        }

        const dataInt = await responded.json();
        const found = dataInt.Dhaicha.find(
          (stu) => stu.Name.toLowerCase() === slug.replace(/-/g, ' ').toLowerCase()
        );

        setDhainchas(found || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setLoading(false);
      }
    };

    fetchDatafunc();
  }, [slug]);

  const getImageUrl = (img) => {
    if (!img) return '/assets/images/default.jpg';
    if (img.startsWith('/')) return img;
    return '/' + img.replace(/^\.?\//, '');
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gray-700 flex flex-col justify-start">
      {loading ? (
        <div className="h-[30rem] w-full flex justify-center items-center">
          <span className="loading loading-infinity h-20 w-20 text-success"></span>
        </div>
      ) : (
        <div className="max-w-6xl w-full mx-auto">
          {/* Header Bar: Horizontal flex with smaller Back to Home button on left */}
          <div className="flex items-center gap-2.5 sm:gap-4 mb-6 sm:mb-8 border-b border-gray-600/80 pb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 bg-green-500 hover:bg-gray-800 text-black hover:text-white border-2 border-gray-800 hover:border-green-400 rounded-lg font-bold font-serif text-xs sm:text-sm transition-all duration-200 shadow-sm shrink-0 active:scale-95"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back To Home</span>
            </Link>

            <h2 className="font-bold text-white text-base sm:text-2xl md:text-3xl tracking-wide font-mono truncate">
              {dhainchas.Name}'s Details
            </h2>
          </div>

          {/* Details Content Container */}
          <div className="flex flex-col lg:flex-row items-center justify-around gap-8 pb-10">
            {/* Student Photo */}
            <figure className="flex justify-center w-full lg:w-auto shrink-0">
              <img
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 max-w-full rounded-xl object-cover hover:scale-105 transition duration-200 shadow-xl border-2 border-gray-600"
                src={getImageUrl(dhainchas.image)}
                alt={dhainchas.Name || 'Student'}
              />
            </figure>

            {/* Student Information Card */}
            <div className="w-full max-w-xl lg:max-w-2xl rounded-xl shadow-lg hover:shadow-green-600/30 p-5 sm:p-7 md:p-8 text-base sm:text-xl md:text-2xl font-bold text-orange-400 border-2 border-amber-400 bg-gray-800 transition duration-200">
              <div className="font-mono space-y-3 justify-start text-start">
                <h2>Name : {dhainchas.Name}</h2>
                <h4>Home Town : {dhainchas.hometown}</h4>
                {dhainchas?.SSC != null && (
                  <p>SSC-GPA : {dhainchas?.SSC === 5 ? dhainchas.SSC + '.00' : dhainchas?.SSC}</p>
                )}
                {dhainchas?.HSC != null && (
                  <p>HSC-GPA : {dhainchas?.HSC === 5 ? dhainchas.HSC + '.00' : dhainchas?.HSC}</p>
                )}

                {dhainchas?.bloodGroup != null && (
                  <div className="text-green-400">Blood Group: {dhainchas.bloodGroup}</div>
                )}

                {dhainchas?.behavior != null && (
                  <div className="space-y-2 text-green-400 font-normal font-serif">
                    <div className="text-lg sm:text-xl md:text-2xl text-yellow-300 font-bold">
                      Diagnostic Property:
                    </div>

                    <ul className="space-y-1">
                      {dhainchas.behavior?.map((behave, index) => (
                        <li key={index} className="pl-4 sm:pl-8 list-disc list-inside">
                          {behave}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;