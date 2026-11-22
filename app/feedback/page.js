import { MessageSquareHeart, Star, User, Quote } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { feedbackFields } from "@/lib/forms";
import { getList } from "@/lib/data";

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
        title="গ্রাহক মতামত ও অভিজ্ঞতা"
        sub="আমাদের সেবা নিয়ে প্রবাসীদের পরিবার ও সেবাগ্রহীতাদের বাস্তব অভিজ্ঞতা ও পর্যালোচনা।"
      />

      <div className="wrap max-w-4xl py-8 space-y-10">
        {/* Recent Feedback Reviews */}
        {reviews.length > 0 && (
          <section aria-labelledby="reviews-head">
            <h2 id="reviews-head" className="font-head text-2xl font-black text-navy mb-5 flex items-center gap-2">
              <Quote className="text-blue" size={24} /> সেবাগ্রহীতাদের সাম্প্রতিক প্রতিক্রিয়া ({reviews.length})
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((r) => (
                <article
                  key={r._id}
                  className="card flex flex-col justify-between border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-soft text-navy font-bold text-sm">
                          {r.name ? r.name.slice(0, 2) : <User size={18} />}
                        </span>
                        <div>
                          <b className="block text-sm font-bold text-navy leading-tight">{r.name || "সম্মানিত গ্রাহক"}</b>
                          <span className="text-xs text-slate-500">{r.service || "সাধারণ সেবা"}</span>
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
                      &quot;{r.comment}&quot;
                    </p>
                  </div>

                  <div className="mt-4 pt-2 text-right text-[11px] text-slate-400">
                    যাচাইকৃত সেবাগ্রহীতা
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Submit New Feedback Section */}
        <section className="rounded-2xl border border-blue/20 bg-blue-soft/20 p-6 sm:p-8">
          <div className="mb-6 text-center">
            <span className="pill">আপনার মতামত জানান</span>
            <h2 className="mt-2 text-2xl font-black text-navy">আপনার অভিজ্ঞতা কেমন ছিল?</h2>
            <p className="text-sm text-slate-600 mt-1">
              আপনার একটি মূল্যবান পরামর্শ আমাদের সেবার মান আরও উন্নত করতে সহায়তা করবে।
            </p>
          </div>
          <DynamicForm
            type="feedback"
            fields={feedbackFields}
            submit="মতামত জমা দিন"
            success="আপনার মূল্যবান মতামতের জন্য ধন্যবাদ! আপনার রিভিউ দ্রুত আমাদের প্ল্যাটফর্মে যুক্ত হবে।"
          />
        </section>
      </div>
    </>
  );
}
