import Ecg from "./Ecg";

export default function PageHead({ title, sub, Icon }) {
  return (
    <section className="bg-gradient-to-br from-navy-dark to-navy text-white">
      <div className="wrap py-8 sm:py-12">
        {Icon && <Icon size={32} className="mb-3 text-gold" aria-hidden="true" />}
        <h1 className="!text-white text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-lg text-blue-soft">{sub}</p>}
      </div>
      <Ecg className="block h-8 w-full opacity-60" />
    </section>
  );
}
