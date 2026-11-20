import { Users, ShieldCheck, AlertCircle, CheckCircle2, Handshake, Clock, Building2, Lock, HeartPulse } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { membershipFields } from "@/lib/forms";
export const metadata = { title: "DH Family Care – প্রবাসীর পরিবারের সুরক্ষা | D H Medical Support" };

const PROBLEMS = ["দেশে থাকা পরিবারের কেউ অসুস্থ হলে কী করবেন?", "নিজে অসুস্থ হয়ে দেশে ফিরলেও গ্রহণ করার মতো কেউ নেই!", "হাসপাতালে নিতে চায় না পরিবার, কী করবেন?", "জরুরি সময়ে অ্যাম্বুলেন্স, হাসপাতাল ও চিকিৎসা সমন্বয় নেই!"];
const SOLUTION = ["জরুরি যোগাযোগ ও অ্যাম্বুলেন্স বুকিংয়ে সহায়তা", "হাসপাতালের সঙ্গে সমন্বয় ও কেস ফলোআপ", "পরিবারের মনোনীত সদস্যদের সঙ্গে যোগাযোগ", "অনুমোদিত বীমা পলিসি সম্পর্কে তথ্য ও আবেদন সহায়তা", "প্রবাস ফেরত অসহায় ব্যক্তির জন্য সরকারি সহায়তার সঙ্গে যোগাযোগ"];
const MEMBERSHIP = ["২৪ ঘণ্টার জরুরি কল সাপোর্ট", "অ্যাম্বুলেন্স বুকিং সমন্বয়", "হাসপাতাল যোগাযোগ", "পরিবারের সঙ্গে যোগাযোগ", "কেস ফলোআপ"];
const INSURANCE = ["হাসপাতাল ভর্তি ব্যয়ের কভারেজ", "দুর্ঘটনা ও জরুরি চিকিৎসা সুরক্ষা", "পরিবার ও প্রবাসীর জন্য উপযুক্ত", "ক্লেইমে সহায়তা"];
const WHY = [[Handshake, "বিশ্বাসযোগ্য সেবা"], [Clock, "২৪ ঘণ্টা সহায়তা"], [Building2, "নিরাপদ সমন্বয়"], [Lock, "স্বচ্ছ প্রক্রিয়া"], [HeartPulse, "পরিবারের পাশে সর্বদা"]];

const List = ({ items, Icon = CheckCircle2, cls = "text-green" }) => (
  <ul className="mt-3 space-y-2.5">{items.map((t) => <li key={t} className="flex gap-3"><Icon className={`mt-0.5 shrink-0 ${cls}`} size={20} />{t}</li>)}</ul>
);

export default function FamilyCare() {
  return (
    <>
      <PageHead Icon={Users} title="DH Family Care" sub="প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা। একটি নির্ভরযোগ্য পরিবার সুরক্ষা ব্যবস্থা।" />
      <div className="wrap space-y-6 py-6">
        <section className="card border-red/30">
          <h2 className="font-head text-xl font-bold text-red">প্রবাসীদের সাধারণ সমস্যা</h2>
          <List items={PROBLEMS} Icon={AlertCircle} cls="text-red" />
        </section>
        <section className="card border-green/40">
          <h2 className="font-head text-xl font-bold text-green">আমাদের সমাধান</h2>
          <List items={SOLUTION} />
        </section>

        <div className="grid gap-4 md:grid-cols-2" id="insurance">
          <section className="card border-green/40">
            <h2 className="font-head text-xl font-bold text-green-dark">Family Care Membership</h2>
            <p className="text-sm text-slate-500">সেবা-সমন্বয় মেম্বারশিপ</p>
            <List items={MEMBERSHIP} />
          </section>
          <section className="card border-purple-400/50">
            <h2 className="font-head text-xl font-bold !text-purple-800">Insurance Policy</h2>
            <p className="text-sm text-slate-500">অনুমোদিত বীমা পলিসি</p>
            <List items={INSURANCE} cls="text-purple-700" />
            <p className="mt-3 text-xs text-slate-500">বীমা সুবিধা সংশ্লিষ্ট অনুমোদিত বীমা কোম্পানির শর্ত অনুযায়ী প্রযোজ্য। আমরা তথ্য ও আবেদন সহায়তা দিই।</p>
          </section>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {WHY.map(([I, t]) => <li key={t} className="card !p-4 text-center"><I className="mx-auto text-blue" size={30} /><b className="mt-2 block text-sm text-navy">{t}</b></li>)}
        </ul>

        <section aria-labelledby="join">
          <div className="mb-4 flex items-center gap-3"><ShieldCheck className="text-green" size={32} /><div><h2 id="join" className="text-2xl font-extrabold">আজই সদস্য হোন</h2><p className="text-slate-600">ফর্মটি পূরণ করুন, আমরা আপনার সঙ্গে যোগাযোগ করব।</p></div></div>
          <DynamicForm type="memberships" fields={membershipFields} submit="সদস্য হওয়ার আবেদন" />
        </section>
      </div>
    </>
  );
}
