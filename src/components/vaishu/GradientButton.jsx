export default function GradientButton({ className = "", style = {}, children, ...props }) {
    return (
        <button
            {...props}
            style={{
                width: "min(320px, 90%)",
                minHeight: "48px",
                padding: "12px 24px",
                fontSize: "clamp(15px, 4vw, 18px)",
                borderRadius: "14px",
                ...style,
            }}
            className={[
                "inline-flex items-center justify-center gap-2",
                "text-white font-bold whitespace-nowrap leading-none",
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
