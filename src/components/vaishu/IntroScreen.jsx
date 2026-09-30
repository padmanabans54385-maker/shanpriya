import { firstHeading, firstSubtext, introGif, introButtonLabel } from "../../data"
import GradientButton from "./GradientButton"
import { Gift } from "lucide-react"

export default function IntroScreen({ onNext, onStartMusic }) {
    return (
        <div className="py-6 px-4 text-center">
            <div className="flex flex-col items-center gap-4 sm:gap-5">
                <img
                    src={introGif}
                    alt="Cute birthday animation topper"
                    style={{ width: "min(160px, 45vw)", borderRadius: "16px" }}
                    className="object-cover"
                />

                <div>
                    <h1
                        style={{
                            fontSize: "clamp(26px, 8vw, 40px)",
                            filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                        }}
                        className="text-pretty font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow leading-tight px-2"
                    >
                        {firstHeading}
                    </h1>
                    <p
                        style={{
                            fontSize: "clamp(15px, 4vw, 18px)",
                            lineHeight: 1.6,
                        }}
                        className="mt-3 text-pink-200"
                    >
                        {firstSubtext}
                    </p>
                </div>

                <div className="mt-5 flex justify-center w-full">
                    <GradientButton
                        onClick={() => {
                            onStartMusic?.()
                            onNext?.()
                        }}
                    >
                        <Gift size={20}/>
                        {introButtonLabel}
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}
