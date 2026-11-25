import Ecg from "./Ecg";

export default function PageHead({ title, sub, Icon }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#4B93F5] via-brand to-[#0F63CC] text-white border-b border-white/10">
      <div className="wrap py-10 sm:py-14 relative z-10">
        <div className="flex items-start gap-4">
          {Icon && (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 border border-white/25 text-gold shadow-sm backdrop-blur-sm mt-1 sm:h-16 sm:w-16">
              <Icon size={24} aria-hidden="true" />
            </span>
          )}
          <div className="space-y-2 max-w-2xl">
            <h1 className="!text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {title}
            </h1>
            {sub && (
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                {sub}
              </p>
            )}
          </div>
        </div>
      </div>
      <Ecg className="block h-7 w-full opacity-40 pointer-events-none" />
    </section>
  );
}
