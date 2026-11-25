import { MessageSquareHeart, Star, User, Quote } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import DynamicForm from "@/components/DynamicForm";
import { feedbackFields } from "@/lib/forms";
import { getList } from "@/lib/data";
import { translateText } from "@/lib/i18nData";

import { BASE_URL } from "@/lib/seoHelper";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "গ্রাহক মতামত ও পর্যালোচনা | D H Medical Support",
  description: "রোগী ও প্রবাসীর পরিবারের বাস্তব মতামত, রেটিং ও অভিজ্ঞতা।",
  alternates: {
    canonical: `${BASE_URL}/feedback`,
  },
};

export default async function Feedback() {
  const reviews = await getList("feedback", 20);

  return (
    <>
      <PageHead
        Icon={MessageSquareHeart}
        title={{ bn: "গ্রাহক মতামত ও অভিজ্ঞতা", en: "Customer Feedback & Experiences" }}
        sub={{ bn: "আমাদের সেবা নিয়ে প্রবাসীদের পরিবার ও সেবাগ্রহীতাদের বাস্তব অভিজ্ঞতা ও পর্যালোচনা।", en: "Real experiences and reviews from expatriate families and people we have served." }}
      />

      <div className="wrap max-w-4xl py-10 sm:py-14 lg:py-16 space-y-10">
        {/* Recent Feedback Reviews */}
        {reviews.length > 0 && (
          <section aria-labelledby="reviews-head">
            <h2 id="reviews-head" className="font-head text-2xl sm:text-3xl lg:text-4xl font-black text-brand mb-6 sm:mb-8 flex items-center gap-2">
              <Quote className="text-brand" size={24} /> <Text value={{ bn: `সেবাগ্রহীতাদের সাম্প্রতিক প্রতিক্রিয়া (${reviews.length})`, en: `Recent Feedback from Customers (${reviews.length})` }} />
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((r) => (
                <article
                  key={r._id}
                  className="card flex flex-col justify-between p-5 sm:p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-brand font-bold text-sm">
                          {r.name ? <Text value={{ bn: r.name.slice(0, 2), en: (r.nameEn || translateText(r.name, "en")).slice(0, 2) }} /> : <User size={18} />}
                        </span>
                        <div>
                          <b className="block text-sm font-bold text-brand leading-tight">{r.name ? <Text value={{ bn: r.name, en: r.nameEn || translateText(r.name, "en") }} /> : <Text k="fb_anonymous" />}</b>
                          <span className="text-xs text-slate-500"><Text value={{ bn: r.service || "সাধারণ সেবা", en: r.serviceEn || translateText(r.service || "", "en") || "General Service" }} /></span>
                        </div>
                      </div>

                      <div className="flex text-gold">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < (r.rating || 5) ? "fill-gold text-gold" : "text-slate-300"}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 leading-relaxed italic">
                      &quot;<Text value={{ bn: r.comment || "", en: r.commentEn || translateText(r.comment || "", "en") || "" }} />&quot;
                    </p>
                  </div>

                  <div className="mt-4 pt-2 text-right text-[11px] text-slate-400">
                    <Text k="fb_verified" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Submit New Feedback Section */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card">
          <div className="mb-6 text-center">
            <span className="pill"><Text k="fb_form_pill" /></span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mb-3"><Text k="fb_form_title" /></h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mt-2">
              <Text k="fb_form_sub" />
            </p>
          </div>
          <DynamicForm
            type="feedback"
            fields={feedbackFields}
            submit={{ bn: "মতামত জমা দিন", en: "Submit Feedback" }}
            success={{ bn: "আপনার মূল্যবান মতামতের জন্য ধন্যবাদ! আপনার রিভিউ দ্রুত আমাদের প্ল্যাটফর্মে যুক্ত হবে।", en: "Thank you for your valuable feedback! Your review will appear on our platform shortly." }}
          />
        </section>
      </div>
    </>
  );
}
