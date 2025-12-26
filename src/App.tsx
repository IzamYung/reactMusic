import Lyrics from "./lyrics";
import { useEffect, useRef, useState } from "react";
import thumbnail from "./assets/tumbnail.jpg";
import songFile from "./assets/Kasih_Aba-Aba.mp3";

function App() {
  const songRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const ctrlIconRef = useRef<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    const song = songRef.current;
    const progress = progressRef.current;

    if (!song || !progress) return;

    const handleLoadedMetadata = () => {
      progress.max = song.duration.toString();
      setDuration(song.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (ctrlIconRef.current) {
        ctrlIconRef.current.classList.remove("fa-pause");
        ctrlIconRef.current.classList.add("fa-play");
      }
    };

    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        if (song && progress) {
          setCurrentTime(song.currentTime);
          progress.value = song.currentTime.toString();
        }
      }, 500);
    }

    song.addEventListener("loadedmetadata", handleLoadedMetadata);
    song.addEventListener("ended", handleEnded);

    return () => {
      song.removeEventListener("loadedmetadata", handleLoadedMetadata);
      song.removeEventListener("ended", handleEnded);
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const playPause = () => {
    const song = songRef.current;
    const icon = ctrlIconRef.current;

    if (!song || !icon) return;

    if (isPlaying) {
      song.pause();
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
    } else {
      song.play();
      icon.classList.add("fa-pause");
      icon.classList.remove("fa-play");
    }

    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    const song = songRef.current;
    if (song) {
      song.currentTime = Math.max(0, song.currentTime - 10);
    }
  };

  const skipForward = () => {
    const song = songRef.current;
    if (song) {
      song.currentTime = Math.min(song.duration, song.currentTime + 10);
    }
  };

  const handleProgressChange = () => {
    const song = songRef.current;
    const progress = progressRef.current;

    if (song && progress) {
      song.currentTime = parseFloat(progress.value);
      if (isPlaying) {
        song.play();
      } else {
        song.pause();
      }
    }
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  return (
    <>
      <button
        onClick={toggleLyrics}
        className="absolute top-6 right-6 text-white bg-[#6679ff] hover:bg-[#66ff] px-4 py-2 rounded z-50 shadow-[0_0_15px_rgba(26,26,255,0.5)]"
      >
        {showLyrics ? "Show Lyrics" : "Hide Lyrics"}
      </button>
      <div className="w-screen h-screen flex flex-row items-center justify-center">
        <div
          className={`transition-transform duration-700 ease-in-out transform z-[2] ${
            showLyrics ? "-translate-x-[-200px]" : "translate-x-0"
          }`}
        >
          <div className="bg-[#668cff] w-[400px] py-[25px] px-[35px] flex flex-col items-center rounded-[5px] shadow-[0_0_70px_rgba(26,26,255,0.5)]">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-[220px] rounded-full border-[8px] border-white shadow-[0_10px_60px_rgba(26,26,255,0.5)]"
            />
            <h1 className="text-[20px] font-bold text-white mt-[20px]">
              KASIH ABA-ABA
            </h1>
            <p className="text-[14px] text-white mb-4">
              Naykilla, Tenxi & Jemsii
            </p>

            <audio ref={songRef}>
              <source src={songFile} type="audio/mpeg" />
            </audio>

            <div className="my-[30px] mx-0 w-full flex flex-col items-end">
              <input
                type="range"
                id="progress"
                ref={progressRef}
                value={currentTime}
                step="any"
                onChange={handleProgressChange}
              />

              <div id="timer" className="text-white font-medium text-[15px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 controls text-white text-[24px] cursor-pointer">
              <div onClick={skipBackward}>
                <i className="fa-solid fa-backward"></i>
              </div>
              <div onClick={playPause}>
                <i className="fa-solid fa-play" ref={ctrlIconRef}></i>
              </div>
              <div onClick={skipForward}>
                <i className="fa-solid fa-forward"></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 ease-in-out ${
            showLyrics ? "translate-x-[-200px]" : "translate-x-0"
          }`}
        >
          <div className="bg-[#668cff] w-[400px] h-[480px] py-[25px] px-[35px] flex flex-col items-center rounded-r-[5px]">
            <Lyrics />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
