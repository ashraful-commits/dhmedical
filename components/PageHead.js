import Ecg from "./Ecg";

export default function PageHead({ title, sub, Icon }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-navy-dark text-white border-b border-white/10">
      <div className="wrap py-8 sm:py-11 relative z-10">
        <div className="flex items-start gap-4">
          {Icon && (
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 border border-white/15 text-gold shadow-sm backdrop-blur-sm mt-1">
              <Icon size={24} aria-hidden="true" />
            </span>
          )}
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="!text-white text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {title}
            </h1>
            {sub && (
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
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
