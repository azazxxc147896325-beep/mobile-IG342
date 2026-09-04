import React, { useState, useEffect, useRef } from "react";

const baseURL = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
const alarmAudio = `${baseURL}sound/mixkit-classic-alarm-995.wav`;

// Fallback เสียงปี๊บผ่าน Web Audio API หากไฟล์เสียงมีปัญหาหรือไม่รองรับ
const playBeepAlarm = () => {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;
        [0, 0.25, 0.5, 0.75].forEach((t) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now + t);
            gain.gain.setValueAtTime(0.3, now + t);
            gain.gain.exponentialRampToValueAtTime(0.01, now + t + 0.18);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + t);
            osc.stop(now + t + 0.2);
        });
    } catch (e) {
        console.error("Audio fallback error:", e);
    }
};

const sleepTypes = [
    { name: "Power Nap", time: 1200, description: "งีบด่วน 20 นาที รีเฟรชสมอง" },
    { name: "พักสายตา", time: 1800, description: "พัก 30 นาที ผ่อนคลายสายตา" },
    { name: "หลับลึก", time: 3600, description: "งีบ 60 นาที ฟื้นฟูร่างกาย" },
    { name: "1 รอบการนอน", time: 5400, description: "นอน 90 นาที ครบ 1 sleep cycle" },
    { name: "นอนยาว 8 ชม.", time: 28800, description: "นอนหลับเต็มอิ่ม 8 ชั่วโมง" },
    { name: "ทดสอบ (10 วิ)", time: 10, description: "สำหรับทดสอบเวลานับถอยหลังและเสียงปลุก" },
];

export default function Egg() {
    const [selectedSleep, setSelectedSleep] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        let intervalId;
        if (isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch((err) => {
                    console.log("Audio play error, falling back to beep:", err);
                    playBeepAlarm();
                });
            } else {
                playBeepAlarm();
            }
        }
        return () => clearInterval(intervalId);
    }, [isRunning, timeLeft]);

    const handleSelect = (item) => {
        setSelectedSleep(item);
        setTimeLeft(item.time);
        setIsRunning(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleStart = () => {
        if (!selectedSleep) return;
        if (timeLeft === 0) {
            setTimeLeft(selectedSleep.time);
        }
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(selectedSleep ? selectedSleep.time : 0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleAdd5Minutes = () => {
        setTimeLeft((prev) => (prev > 0 ? prev + 300 : 300));
        setIsRunning(true);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleClose = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setSelectedSleep(null);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        if (hours > 0) {
            return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-100 text-slate-800">
            {/* CSS Animation Keyframes สำหรับการลอยไปลอยมา */}
            <style>{`
                @keyframes floatA {
                    0% { transform: translate(0px, 0px) rotate(-6deg); }
                    25% { transform: translate(60px, -45px) rotate(4deg); }
                    50% { transform: translate(-40px, -80px) rotate(-10deg); }
                    75% { transform: translate(50px, -30px) rotate(5deg); }
                    100% { transform: translate(0px, 0px) rotate(-6deg); }
                }
                @keyframes floatB {
                    0% { transform: translate(0px, 0px) rotate(8deg); }
                    25% { transform: translate(-70px, 50px) rotate(-5deg); }
                    50% { transform: translate(45px, 80px) rotate(7deg); }
                    75% { transform: translate(-35px, -40px) rotate(-3deg); }
                    100% { transform: translate(0px, 0px) rotate(8deg); }
                }
                @keyframes floatC {
                    0% { transform: translate(0px, 0px) rotate(0deg); }
                    33% { transform: translate(75px, 60px) rotate(-7deg); }
                    66% { transform: translate(-60px, -50px) rotate(6deg); }
                    100% { transform: translate(0px, 0px) rotate(0deg); }
                }
                @keyframes floatD {
                    0% { transform: translate(0px, 0px) rotate(-12deg); }
                    50% { transform: translate(-60px, -70px) rotate(6deg); }
                    100% { transform: translate(0px, 0px) rotate(-12deg); }
                }
                .animate-float-a { animation: floatA 16s ease-in-out infinite; }
                .animate-float-b { animation: floatB 20s ease-in-out infinite; }
                .animate-float-c { animation: floatC 18s ease-in-out infinite; }
                .animate-float-d { animation: floatD 22s ease-in-out infinite; }
            `}</style>

            {/* พื้นหลังชื่อและรหัสนักศึกษา ลอยไปลอยมา (Bright Floating Background) */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {/* ชิ้นที่ 1: กลางจอขนาดใหญ่ ลอยนุ่มนวล สีสว่างกลมกลืน */}
                <div className="absolute top-1/4 left-1/4 opacity-25 animate-float-a text-center">
                    <div className="text-4xl sm:text-6xl md:text-8xl font-black text-indigo-300/70 tracking-wider whitespace-nowrap">
                        กิตตินันท์ บุญคุ้ม
                    </div>
                    <div className="text-3xl sm:text-5xl md:text-7xl font-black text-blue-300/70 tracking-widest mt-2">
                        66112126
                    </div>
                </div>

                {/* ชิ้นที่ 2: ลอยมุมซ้ายบน */}
                <div className="absolute top-12 left-10 opacity-70 animate-float-b">
                    <span className="text-base sm:text-2xl font-bold text-indigo-700 bg-white/80 border border-indigo-100 px-4 py-2 rounded-2xl backdrop-blur-sm shadow-md">
                        กิตตินันท์ บุญคุ้ม
                    </span>
                </div>

                {/* ชิ้นที่ 3: ลอยมุมขวาล่าง */}
                <div className="absolute bottom-16 right-12 opacity-70 animate-float-c">
                    <span className="text-xl sm:text-3xl font-black font-mono text-purple-700 bg-white/80 border border-purple-100 px-5 py-2 rounded-2xl backdrop-blur-sm shadow-md">
                        66112126
                    </span>
                </div>

                {/* ชิ้นที่ 4: ลอยมุมซ้ายล่าง */}
                <div className="absolute bottom-20 left-16 opacity-40 animate-float-d hidden sm:block">
                    <span className="text-lg sm:text-2xl font-bold text-indigo-400">
                        กิตตินันท์ บุญคุ้ม (66112126)
                    </span>
                </div>

                {/* ชิ้นที่ 5: ลอยมุมขวาบน */}
                <div className="absolute top-28 right-24 opacity-40 animate-float-a hidden md:block">
                    <span className="text-xl sm:text-3xl font-mono font-extrabold text-blue-400">
                        ID: 66112126
                    </span>
                </div>
            </div>

            {/* การ์ดหลักสีขาวสว่าง สะอาดตา */}
            <div className="relative z-10 bg-white/95 border border-slate-200/80 rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-2xl text-slate-800 backdrop-blur-sm">
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        เครื่องจับเวลานอน
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        เลือกรูปแบบการพักผ่อนเพื่อเริ่มจับเวลา
                    </p>
                </div>

                {/* ตัวเลือกรูปแบบการนอน */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {sleepTypes.map((item) => {
                        const isSelected = selectedSleep?.name === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleSelect(item)}
                                className={`p-4 rounded-2xl text-left border transition-all ${isSelected
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]"
                                    : "bg-slate-50/90 hover:bg-indigo-50/50 border-slate-200 text-slate-700 hover:border-indigo-200 shadow-sm"
                                    }`}
                            >
                                <h2 className="font-bold text-base mb-1">{item.name}</h2>
                                <p className={`text-xs mb-2 leading-relaxed ${isSelected ? "text-indigo-100" : "text-slate-500"}`}>
                                    {item.description}
                                </p>
                                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-700"
                                    }`}>
                                    {formatTime(item.time)}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {selectedSleep && (
                    <div className="text-center bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 mb-4 shadow-inner">
                        <h3 className="text-xl font-bold text-indigo-700">
                            โหมด: {selectedSleep.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 mb-4">
                            {selectedSleep.description}
                        </p>

                        <div className="my-6">
                            <span className="text-6xl md:text-7xl font-mono text-slate-900 font-bold tracking-wider">
                                {formatTime(timeLeft)}
                            </span>
                            {timeLeft === 0 && (
                                <div className="text-rose-600 font-bold text-sm mt-2 animate-pulse">
                                    หมดเวลาแล้ว (เสียงปลุกกำลังดัง)
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-2.5">
                            {isRunning ? (
                                <button
                                    onClick={handleStop}
                                    className="bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-amber-600 transition-colors"
                                >
                                    พักชั่วคราว
                                </button>
                            ) : (
                                <button
                                    onClick={handleStart}
                                    className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                                >
                                    {timeLeft === 0 ? "เริ่มใหม่" : "เริ่ม"}
                                </button>
                            )}

                            <button
                                onClick={handleAdd5Minutes}
                                className="bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-sky-700 transition-colors"
                            >
                                ต่ออีก 5 นาที
                            </button>

                            <button
                                onClick={handleReset}
                                className="bg-slate-200 text-slate-700 border border-slate-300 font-semibold px-5 py-2.5 rounded-full hover:bg-slate-300 transition-colors"
                            >
                                รีเซ็ต
                            </button>

                            <button
                                onClick={handleClose}
                                className="bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-rose-600 transition-colors"
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                )}

                <audio ref={audioRef} src={alarmAudio} preload="auto" />
            </div>
        </div>
    );
}