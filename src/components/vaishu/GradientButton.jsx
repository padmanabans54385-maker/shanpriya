export default function GradientButton({ className = "", children, ...props }) {
    return (
        <button
            {...props}
            className={[
                "inline-flex items-center justify-center gap-2.5",
                "w-[clamp(280px,85vw,360px)] h-[58px] px-8",
                "rounded-full text-white font-bold text-xl md:text-2xl whitespace-nowrap leading-none",
                "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500",
                "border border-white/35 shadow-[0_0_25px_rgba(244,114,182,0.4)]",
                "transition-all duration-200 ease-out hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_35px_rgba(244,114,182,0.65)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/80 cursor-pointer select-none",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    )
}
