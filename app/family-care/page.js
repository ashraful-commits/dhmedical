import { Users, ShieldCheck, AlertCircle, CheckCircle2, Handshake, Clock, Building2, Lock, HeartPulse, Sparkles, PhoneCall, ArrowRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import DynamicForm from "@/components/DynamicForm";
import {
  FAMILY_PROBLEMS,
  FAMILY_SOLUTIONS,
  MEMBERSHIP_BENEFITS,
  INSURANCE_BENEFITS,
  TRUST_PILLARS,
} from "@/lib/i18nData";
import { membershipFields } from "@/lib/forms";
import { BASE_URL } from "@/lib/seoHelper";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "DH Family Care – প্রবাসীর পরিবারের চিকিৎসা ও স্বাস্থ্য সুরক্ষা | D H Medical Support",
  description:
    "প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা। প্রবাসীদের মা-বাবা ও পরিবারের সার্বক্ষণিক চিকিৎসা সমন্বয়, জরুরি অ্যাম্বুলেন্স, ওষুধ সংগ্রহ ও বীমা সহায়তা।",
  keywords: [
    "প্রবাসী পরিবার সেবা",
    "probashi medical support",
    "probashi family health bangladesh",
    "dh family care",
    "প্রবাসী ভাইদের জন্য চিকিৎসা সেবা",
  ],
  alternates: {
    canonical: `${BASE_URL}/family-care`,
  },
};

const PILLAR_ICONS = [Handshake, Clock, Building2, Lock, HeartPulse];

export default function FamilyCare() {
  return (
    <>
      <PageHead
        Icon={Users}
        title={{ bn: "DH Family Care — প্রবাসী পরিবার সুরক্ষা", en: "DH Family Care — Protection for Expatriate Families" }}
        sub={{ bn: "প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা। প্রবাসীদের মা-বাবা ও সন্তানের সার্বক্ষণিক চিকিৎসা সুরক্ষা ও জরুরি সমন্বয় ব্যবস্থা।", en: "You are abroad — we stand beside your family back home. Round-the-clock medical protection and emergency coordination for parents and children of expatriates." }}
      />

      <div className="wrap space-y-10 py-10 sm:py-14 lg:py-16 max-w-4xl">
        {/* Dignified Problem & Solution Split */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Real Problems */}
          <section className="card border-care-200 bg-gradient-to-b from-care-50/60 to-white p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-care-100 text-care-deep">
                <AlertCircle size={18} />
              </span>
              <h2 className="font-head text-xl sm:text-2xl font-black text-brand-dark">
                <Text k="fc_problems_title" />
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {FAMILY_PROBLEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-care-200 text-[11px] font-bold text-care-deep mt-0.5">
                    ✕
                  </span>
                  <span><Text value={item} /></span>
                </li>
              ))}
            </ul>
          </section>

          {/* D H Solution */}
          <section className="card border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="font-head text-xl sm:text-2xl font-black text-brand-dark">
                <Text k="fc_solutions_title" />
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {FAMILY_SOLUTIONS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-600 mt-0.5" />
                  <span><Text value={item} /></span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Membership vs Insurance Cards */}
        <div className="grid gap-6 md:grid-cols-2" id="insurance">
          {/* Card 1: Family Care Membership */}
          <section className="card border-2 border-emerald-500/40 p-5 sm:p-6 flex flex-col justify-between shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              <Text k="fc_popular" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                                  <Users size={22} />
                                </span>
                                <div>
                                  <h3 className="font-head text-xl font-bold text-brand-dark">
                                    <Text k="fc_membership_title" />
                                  </h3>
                                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl"><Text k="fc_membership_sub" /></p>
                                </div>
                              </div>

                              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 mb-4">
                                <Text k="fc_membership_desc" />
                              </p>

                              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-3">
                                {MEMBERSHIP_BENEFITS.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 size={15} className="shrink-0 text-emerald-600 mt-0.5" />
                                    <span><Text value={item} /></span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6 pt-3 border-t border-slate-100">
                              <a href="#join" className="btn btn-green w-full text-xs font-bold">
                                <Text k="fc_membership_cta" />
                              </a>
                            </div>
          </section>

          {/* Card 2: Insurance Policy Guidance */}
          <section className="card border border-purple-200 p-5 sm:p-6 flex flex-col justify-between shadow-card bg-gradient-to-b from-purple-50/20 to-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-100 text-purple-700">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <h3 className="font-head text-xl font-bold text-brand-dark">
                    <Text k="fc_insurance_title" />
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl"><Text k="fc_insurance_sub" /></p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 mb-4">
                <Text k="fc_insurance_desc" />
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-3">
                {INSURANCE_BENEFITS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-purple-600 mt-0.5" />
                    <span><Text value={item} /></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <a href="#join" className="btn btn-primary w-full text-xs font-bold">
                <Text k="fc_insurance_cta" />
              </a>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                <Text k="fc_insurance_note" />
              </p>
            </div>
          </section>
        </div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx];
            return (
              <div key={pillar.bn} className="card !p-4 text-center flex flex-col items-center justify-center border border-slate-200">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-brand mb-1.5">
                  <Icon size={20} />
                </span>
                <b className="text-xs font-bold text-brand-dark block"><Text value={pillar} /></b>
                <span className="text-xs text-slate-500 mt-0.5 leading-tight"><Text value={pillar.d} /></span>
              </div>
            );
          })}
        </div>

        {/* Member Application Form */}
        <section id="join" className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck size={28} />
            </span>
            <div>
              <span className="pill"><Text k="fc_join_pill" /></span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mt-1 mb-3">
                <Text k="fc_join_title" />
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mt-1">
                <Text k="fc_join_sub" />
              </p>
            </div>
          </div>

          <DynamicForm
            type="memberships"
            fields={membershipFields}
            submit={{ bn: "মেম্বারশিপের অনুরোধ পাঠান", en: "Send membership request" }}
            success={{ bn: "আপনার মেম্বারশিপের তথ্য পেয়েছি! আমাদের টিম দ্রুত প্রবাসী ভাই বা দেশে পরিবারের সাথে যোগাযোগ করবে।", en: "We received your membership details! Our team will quickly contact you or your family back home." }}
          />
        </section>
      </div>
    </>
  );
}
