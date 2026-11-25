import { Handshake, BadgeCheck, Camera, CreditCard, ShieldCheck, PhoneCall, CheckCircle2 } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import DynamicForm from "@/components/DynamicForm";
import { PARTNER_STEPS, PARTNER_TERMS } from "@/lib/i18nData";
import { partnerFields } from "@/lib/forms";

import { BASE_URL } from "@/lib/seoHelper";

export const metadata = {
  title: "অ্যাম্বুলেন্স ড্রাইভার ও মালিক পার্টনার নিবন্ধন | D H Medical Support",
  description:
    "আপনার অ্যাম্বুলেন্স গাড়ি যুক্ত করে নিয়মিত ট্রিপ ও আয় নিশ্চিত করুন। ক্যামেরা দিয়ে NID ও লাইসেন্স আপলোড করে সহজ পার্টনার নিবন্ধন।",
  alternates: {
    canonical: `${BASE_URL}/partner`,
  },
};

const STEP_ICONS = [CreditCard, Camera, ShieldCheck, PhoneCall];

export default function Partner() {
  return (
    <>
      <PageHead
        Icon={Handshake}
        title={{ bn: "অ্যাম্বুলেন্স ড্রাইভার ও মালিকের নিবন্ধন", en: "Ambulance Driver & Owner Registration" }}
        sub={{ bn: "D H Medical Support পার্টনার নেটওয়ার্কে যুক্ত হয়ে নিয়মিত রোগী পান ও সম্মানিত সেবা দিন।", en: "Join the D H Medical Support partner network to get regular patients and provide respected service." }}
      />

      <div className="wrap max-w-4xl space-y-8 py-10 sm:py-14 lg:py-16">
        {/* Step-by-step Onboarding Guide */}
        <section aria-labelledby="steps-title" className="rounded-2xl bg-gradient-to-r from-[#4B93F5] via-brand to-[#0F63CC] p-5 sm:p-6 text-white shadow-card border border-white/10">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold">
              <Text k="partner_steps_pill" />
            </span>
            <h2 id="steps-title" className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black !text-white mb-3">
              <Text k="partner_steps_title" />
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl">
              <Text k="partner_steps_sub" />
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_STEPS.map((s, idx) => {
              const I = STEP_ICONS[idx];
              return (
                <div key={s.step.bn} className="rounded-xl bg-white/10 p-4 border border-white/10 backdrop-blur flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-brand font-black text-sm">
                        <Text value={s.step} />
                      </span>
                      <I size={22} className="text-slate-100" />
                    </div>
                    <h3 className="font-bold text-base text-white"><Text value={s.title} /></h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-100 leading-relaxed"><Text value={s.desc} /></p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Terms of Service */}
        <div className="card border-brand/20 p-5 sm:p-6">
          <h2 className="font-head text-2xl sm:text-3xl lg:text-4xl font-black text-brand flex items-center gap-2 mb-3">
            <CheckCircle2 className="text-green" size={22} /> <Text k="partner_terms_title" />
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm sm:text-base text-slate-700">
            {PARTNER_TERMS.map((item) => (
              <li key={item.bn} className="flex gap-3">
                <BadgeCheck className="shrink-0 text-brand mt-0.5" size={18} />
                <span><Text value={item} /></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Partner Registration Form */}
        <section aria-labelledby="form-heading">
          <div className="mb-6 sm:mb-8">
            <span className="pill"><Text k="partner_form_pill" /></span>
            <h2 id="form-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand mt-1 mb-3">
              <Text k="partner_form_title" />
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              <Text k="partner_form_sub" />
            </p>
          </div>

          <DynamicForm
            type="partners"
            fields={partnerFields}
            submit={{ bn: "পার্টনার অ্যাকাউন্ট নিবন্ধন সম্পন্ন করুন", en: "Complete partner registration" }}
            success={{ bn: "আপনার নিবন্ধন ও NID ছবি সফলভাবে জমা হয়েছে! আমাদের অ্যাডমিন টিম যাচাই করার পর দ্রুত কল করে আপনার অ্যাকাউন্ট সক্রিয় করে দেবে।", en: "Your registration and NID photos were submitted successfully! Our admin team will verify and call you shortly to activate your account." }}
          />
        </section>
      </div>
    </>
  );
}
