import { useEffect, useRef } from "react";
import { backgroundMusic } from "../../data";

export default function BackgroundMusic({ shouldPlay }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (shouldPlay && audioRef.current) {
            audioRef.current.volume = 0.7;
            audioRef.current.play().catch(console.log);
        }
    }, [shouldPlay]);

    return (
        <audio ref={audioRef} loop>
            <source src={backgroundMusic} type="audio/mpeg" />
        </audio>
    );
}
