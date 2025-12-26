import { useEffect, useState, useRef } from "react";

const lyricsData = [
  { time: 0, text: "[Intro]" },
  { time: 3.05, text: "(Oh wow...)" },
  { time: 4.60, text: "(Ooii Jemsii!)" },
  { time: 10.00, text: "Ku merasakan apa yang kau rasakan" },
  { time: 14.25, text: "Tanpa ragu ku bilang kamu" },
  { time: 16.99, text: "Yang paling paham aku" },
  { time: 19.20, text: "Dua jadi satu, belah hati aku" },
  { time: 23.36, text: "Aku mau maju tapi tinggal tunggu waktu" },
  { time: 28.20, text: "Kasih aba-aba kalo udah siap" },
  { time: 32.22, text: "Kucoba melihat tapi masih gelap" },
  { time: 36.59, text: "Kamu paling bright (Silau, silau)" },
  { time: 38.59, text: "Gapapa lah-" },
  { time: 40.53, text: "Gapapa lebay (Aaaah)" },
  { time: 42.69, text: "Yeah, aku mau test" },
  { time: 44.29, text: "Dia mau aku atau mau cash" },
  { time: 46.35, text: "But she know that I'm the best" },
  { time: 48.14, text: "Udah pintar, ku ’gausah les" },
  { time: 50.23, text: "Dia suka baju hitamku, celana camo ku" },
  { time: 53.36, text: "Kalo kurang asik, kita putar lagu" },
  { time: 55.40, text: "Lagu siapa? Ya lagu aku" },
  { time: 57.37, text: "Kalo duet, ya sama kamu" },
  { time: 59.99, text: "Ku merasakan apa yang kau rasakan" },
  { time: 64.34, text: "Tanpa ragu ku bilang kamu" },
  { time: 66.39, text: "Yang paling paham aku" },
  { time: 69.21, text: "Dua jadi satu, belah hati aku" },
  { time: 73.38, text: "Aku mau maju tapi tinggal tunggu waktu" },
  { time: 76.76, text: "Ku merasakan apa yang kau rasakan" },
  { time: 81.36, text: "Tanpa ragu ku bilang kamu" },
  { time: 83.48, text: "Yang paling paham aku (Oh)" },
  { time: 86.21, text: "Dua jadi satu, belah hati aku (Ooh-oh)" },
  { time: 90.20, text: "Aku mau maju tapi tinggal tunggu waktu" },
  { time: 93.77, text: "Dia tanya aku punya plan (Hey)" },
  { time: 95.83, text: "Dia tau kalo I'm the man (Hey, hey)" },
  { time: 97.46, text: "Kamu Tinker Bell, aku Peter Pan" },
  { time: 99.30, text: "Tapi ini nyata no bukan cerpen" },
  { time: 101.65, text: "Ini bukan cerpen" },
  { time: 102.74, text: "She's 10 outta 10" },
  { time: 103.84, text: "Pilih mau mana, dollar atau yen?" },
  { time: 105.89, text: "Angkat koper, kita pergi Japan" },
  { time: 107.96, text: "I’ll give you the best that I can" },
  { time: 109.36, text: "Aku mau cari jalan tengah" },
  { time: 111.48, text: "Buat kamu apa yang 'gabisa" },
  { time: 114.05, text: "Ajak kamu ke angkasa" },
  { time: 115.85, text: "Go to the moon, kita berdansa" },
  { time: 118.05, text: "Aku wish you best (Ooh)" },
  { time: 120.09, text: "Kamu yang thе best (Ooh)" },
  { time: 122.19, text: "Kata mamaku- (Ooh-whoa)" },
  { time: 124.03, text: "Masih muda, banyak waktu-u" },
  { time: 126.93, text: "Ku merasakan apa yang kau rasakan" },
  { time: 131.23, text: "Tanpa ragu ku bilang kamu" },
  { time: 133.68, text: "Yang paling paham aku" },
  { time: 136.02, text: "Dua jadi satu, belah hati aku" },
  { time: 140.04, text: "Aku mau maju tapi tinggal tunggu waktu" },
  { time: 143.84, text: "[Outro]" }
];

function Lyrics(){
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const audio = document.querySelector("audio");
        if (!audio) return;
        audioRef.current = audio;

        const interval = setInterval(() => {
        setCurrentTime(audio.currentTime);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const index = lyricsData.findIndex((line, i) => {
        const nextLine = lyricsData[i + 1];
        return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
        });
        if (index !== -1) setActiveIndex(index);
    }, [currentTime]);

    useEffect(() => {
        const activeLine = lineRefs.current[activeIndex];
        const container = containerRef.current;
        if (activeLine && container) {
        const offsetTop = activeLine.offsetTop - container.clientHeight / 2 + activeLine.clientHeight / 2;
        container.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    }, [activeIndex]);

    return (
        <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto space-y-2 text-white scroll-smooth"
        >
        {lyricsData.map((line, index) => (
            <p
            key={index}
            ref={(el) => (lineRefs.current[index] = el)}
            className={`transition-all duration-300 text-center text-lg ${
                index === activeIndex ? "text-white font-bold text-xl" : "text-white/60"
            }`}
            >
            {line.text}
            </p>
        ))}
        </div>
    );
}

export default Lyrics;