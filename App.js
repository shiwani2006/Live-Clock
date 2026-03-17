import React, { useState, useEffect } from "react";

export default function App() {

  /* LIVE CLOCKS */
  const [times, setTimes] = useState({
    india: "",
  });

  useEffect(() => {
    const clock = setInterval(() => {
      const now = new Date();

      setTimes({
        india: now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

    }, 1000);

    return () => clearInterval(clock);
  }, []);


  /* TIMER */

  const [timerValue, setTimerValue] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {

    if (!timerActive) return;

    const timer = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerActive(false);
          alert("⏰ Timer Finished!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);

  }, [timerActive]);

  const startTimer = () => setTimerActive(true);
  const stopTimer = () => setTimerActive(false);

  const resetTimer = () => {
    setTimerValue(0);
    setTimerActive(false);
  };


  /* STOPWATCH */

  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);

  useEffect(() => {

    if (!stopwatchRunning) return;

    const watch = setInterval(() => {
      setStopwatchTime((prev) => prev + 10);
    }, 10);

    return () => clearInterval(watch);

  }, [stopwatchRunning]);

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
  };


  /* FORMAT TIME */

  const formatTime = (ms) => {

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };



  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* DASHBOARD TITLE */}

      <h1 className="text-4xl font-bold mb-10 text-center">
        Live Clock
      </h1>


{/* CLOCKS */}

<div className="flex justify-center gap-6 mb-12">


  <ClockCard country="India Standard Time" time={times.india} />

</div>



      {/* MAIN PANELS */}

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* TIMER CARD */}

        <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl shadow-lg">

          <h2 className="text-xl mb-6 font-semibold">
            Countdown Timer
          </h2>

          <input
            type="number"
            placeholder="Enter seconds"
            className="w-full mb-4 p-2 rounded bg-slate-800 border border-slate-600"
            onChange={(e) => setTimerValue(Number(e.target.value))}
          />

          <h3 className="text-4xl mb-6 text-center font-bold">
            {timerValue}s
          </h3>

          <div className="flex justify-center gap-3 mb-6">

            <button
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              onClick={startTimer}
            >
              Start
            </button>

            <button
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              onClick={stopTimer}
            >
              Stop
            </button>

            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              onClick={resetTimer}
            >
              Reset
            </button>

          </div>

          <p className="text-sm opacity-70 mb-2">
            Frequently Used Timers
          </p>

          <div className="flex gap-2 flex-wrap">

            {[5,10,30,60,120].map((sec)=>(
              <button
                key={sec}
                onClick={()=>setTimerValue(sec)}
                className="bg-slate-700 px-3 py-1 rounded text-sm hover:bg-slate-600"
              >
                {sec}s
              </button>
            ))}

          </div>

        </div>



        {/* STOPWATCH CARD */}

        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-10">

          <h2 className="text-xl mb-6 font-semibold">
            Stopwatch
          </h2>

          <h3 className="text-4xl mb-6 text-center font-bold">
            {formatTime(stopwatchTime)}
          </h3>

          <div className="flex justify-center gap-3">

            <button
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setStopwatchRunning(true)}
            >
              Start
            </button>

            <button
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => setStopwatchRunning(false)}
            >
              Stop
            </button>

            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              onClick={resetStopwatch}
            >
              Reset
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}



/* CLOCK CARD COMPONENT */
function ClockCard({country,time}){

  return(
    <div className="bg-slate-900 border border-slate-700 px-12 py-8 rounded-xl text-center shadow-lg">

      <p className="text-sm opacity-70 mb-2">
        {country}
      </p>

      <h2 className="text-5xl font-bold tracking-widest text-blue-400">
        {time}
      </h2>

    </div>
  )
}