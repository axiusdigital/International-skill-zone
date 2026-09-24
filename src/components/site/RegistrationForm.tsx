import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  MessageSquare,
  PenLine,
  Phone,
  Send,
  ShieldCheck,
  Target,
  User,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  REGISTRATION_DESIRED_SCORES,
  REGISTRATION_PURPOSES,
  REGISTRATION_TEST_FOR_OPTIONS,
  REGISTRATION_TRUST_ITEMS,
} from "@/lib/content";
import { submitRegistration } from "@/lib/registrations.functions";
import { cn } from "@/lib/utils";
import { FadeIn } from "./motion-primitives";

const REMARKS_MAX = 500;

const EMPTY = {
  name: "",
  phone: "",
  city: "",
  profession: "",
  qualification: "",
  desired_score: "",
  previous_test_score: "",
  purpose: "",
  test_for: "",
  test_for_other: "",
  extra_remarks: "",
};

const labelClass = "text-primary mb-1.5 block text-sm font-semibold";

const fieldShellClass =
  "border-primary/15 focus-within:border-primary/40 focus-within:ring-primary/10 flex items-center gap-2 rounded-xl border-2 bg-white px-3 transition-all focus-within:ring-2";

const inputClass =
  "text-foreground placeholder:text-muted-foreground/60 w-full min-w-0 border-0 bg-transparent py-3 text-sm outline-none";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {required ? <span className="text-destructive ml-0.5">*</span> : null}
    </label>
  );
}

function IconField({
  id,
  label,
  icon: Icon,
  required,
  children,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className={fieldShellClass}>
        <Icon className="text-primary/70 h-4 w-4 shrink-0" strokeWidth={1.75} />
        {children}
      </div>
    </div>
  );
}

function buildExtraRemarks(form: typeof EMPTY) {
  const parts: string[] = [];
  if (form.qualification) parts.push(`Qualification: ${form.qualification}`);
  if (form.purpose) parts.push(`Purpose: ${form.purpose}`);
  if (form.previous_test_score) parts.push(`Previous test score: ${form.previous_test_score}`);
  if (form.test_for === "Other" && form.test_for_other.trim()) {
    parts.push(`Test for (specified): ${form.test_for_other.trim()}`);
  }
  if (form.extra_remarks.trim()) parts.push(form.extra_remarks.trim());
  return parts.join("\n\n") || "";
}

export function RegistrationForm() {
  const [form, setForm] = useState(EMPTY);
  const [pending, setPending] = useState(false);

  const set = (key: keyof typeof EMPTY) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (pending) return;

    if (!form.test_for) {
      toast.error("Please select what you need the test for.");
      return;
    }

    if (form.test_for === "Other" && !form.test_for_other.trim()) {
      toast.error("Please specify your test purpose under Other.");
      return;
    }

    setPending(true);
    try {
      const course =
        form.test_for === "Other"
          ? `Other: ${form.test_for_other.trim()}`
          : form.test_for;

      await submitRegistration({
        data: {
          name: form.name,
          profession: form.profession,
          city: form.city,
          desired_score: form.desired_score,
          age: null,
          course,
          phone: form.phone,
          extra_remarks: buildExtraRemarks(form),
        },
      });
      toast.success("Assessment request received!", {
        description: "Our team will contact you within 24 hours with your personalised study plan.",
      });
      setForm(EMPTY);
    } catch (err) {
      toast.error("Could not submit the form", {
        description:
          err instanceof Error && err.message
            ? "Please check your details and try again."
            : "Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="enroll" className="bg-secondary/40 scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="shadow-lift overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <div className="from-primary to-primary-light border-b border-white/10 bg-gradient-to-r px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-start gap-4">
                <span className="bg-white/15 text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <ClipboardList className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-primary-foreground text-2xl font-black sm:text-3xl">
                    Book Your Assessment
                  </h2>
                  <p className="text-primary-foreground/80 mt-1 text-sm sm:text-base">
                    Fill in your details and get a personalised study plan.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <IconField id="reg-name" label="Full Name" icon={User} required>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </IconField>

                <IconField id="reg-phone" label="WhatsApp Number" icon={Phone} required>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="+92 300 1234567"
                    className={inputClass}
                  />
                </IconField>

                <IconField id="reg-city" label="City / Country" icon={MapPin} required>
                  <input
                    id="reg-city"
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => set("city")(e.target.value)}
                    placeholder="e.g. Lahore / Pakistan"
                    className={inputClass}
                  />
                </IconField>

                <IconField id="reg-profession" label="Profession" icon={Briefcase} required>
                  <input
                    id="reg-profession"
                    type="text"
                    required
                    value={form.profession}
                    onChange={(e) => set("profession")(e.target.value)}
                    placeholder="e.g. Student, Engineer"
                    className={inputClass}
                  />
                </IconField>

                <IconField id="reg-qualification" label="Qualification" icon={GraduationCap} required>
                  <input
                    id="reg-qualification"
                    type="text"
                    required
                    value={form.qualification}
                    onChange={(e) => set("qualification")(e.target.value)}
                    placeholder="e.g. Bachelor's, Master's, FSc"
                    className={inputClass}
                  />
                </IconField>

                <IconField id="reg-score" label="Desired Score" icon={Target} required>
                  <select
                    id="reg-score"
                    required
                    value={form.desired_score}
                    onChange={(e) => set("desired_score")(e.target.value)}
                    className={cn(inputClass, "cursor-pointer")}
                  >
                    <option value="" disabled>
                      Select desired score
                    </option>
                    {REGISTRATION_DESIRED_SCORES.map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </IconField>

                <IconField
                  id="reg-previous-score"
                  label="Previous Test Score (If any)"
                  icon={FileText}
                  required
                >
                  <input
                    id="reg-previous-score"
                    type="text"
                    required
                    value={form.previous_test_score}
                    onChange={(e) => set("previous_test_score")(e.target.value)}
                    placeholder="e.g. 58 / 65 / Not taken"
                    className={inputClass}
                  />
                </IconField>
              </div>

              <div className="border-primary/10 bg-primary/[0.06] space-y-5 rounded-2xl border-2 p-5 sm:p-6">
                <div className="text-primary flex items-center gap-2">
                  <Target className="h-5 w-5" strokeWidth={1.75} />
                  <h3 className="font-display text-base font-bold sm:text-lg">Purpose &amp; Test For</h3>
                </div>

                <IconField id="reg-purpose" label="Purpose" icon={Target} required>
                  <select
                    id="reg-purpose"
                    required
                    value={form.purpose}
                    onChange={(e) => set("purpose")(e.target.value)}
                    className={cn(inputClass, "cursor-pointer")}
                  >
                    <option value="" disabled>
                      Select purpose
                    </option>
                    {REGISTRATION_PURPOSES.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </IconField>

                <div>
                  <FieldLabel required>Test For</FieldLabel>
                  <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {REGISTRATION_TEST_FOR_OPTIONS.map((option) => {
                      const selected = form.test_for === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => set("test_for")(option.id)}
                          className={cn(
                            "border-primary/15 hover:border-primary/30 flex flex-col items-center gap-2 rounded-xl border-2 bg-white px-3 py-4 text-center transition-all duration-200",
                            selected &&
                              "border-primary bg-primary/[0.06] shadow-soft ring-primary/15 ring-2",
                          )}
                        >
                          <option.icon
                            className={cn(
                              "h-5 w-5",
                              selected ? "text-primary" : "text-primary/70",
                            )}
                            strokeWidth={1.75}
                          />
                          <span
                            className={cn(
                              "text-xs leading-snug font-semibold sm:text-sm",
                              selected ? "text-primary" : "text-foreground/80",
                            )}
                          >
                            {option.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <IconField id="reg-test-for-other" label="Please specify (if any)" icon={PenLine}>
                  <input
                    id="reg-test-for-other"
                    type="text"
                    value={form.test_for_other}
                    onChange={(e) => set("test_for_other")(e.target.value)}
                    placeholder="Please specify (if any)"
                    className={inputClass}
                  />
                </IconField>
              </div>

              <div>
                <FieldLabel htmlFor="reg-remarks">Extra Remarks (Optional)</FieldLabel>
                <div className={cn(fieldShellClass, "items-start")}>
                  <MessageSquare
                    className="text-primary/70 mt-3.5 h-4 w-4 shrink-0"
                    strokeWidth={1.75}
                  />
                  <textarea
                    id="reg-remarks"
                    rows={4}
                    maxLength={REMARKS_MAX}
                    value={form.extra_remarks}
                    onChange={(e) => set("extra_remarks")(e.target.value)}
                    placeholder="Any additional information or message for us..."
                    className={cn(inputClass, "resize-none py-3")}
                  />
                </div>
                <p className="text-muted-foreground mt-1.5 text-right text-xs">
                  {form.extra_remarks.length}/{REMARKS_MAX}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-accent text-accent-foreground shadow-gold hover:shadow-glow inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-black tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Start My Journey
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <p className="text-primary flex items-center justify-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" strokeWidth={1.75} />
                  Our team will contact you within 24 hours.
                </p>
              </div>
            </form>

            <div className="border-primary/10 bg-primary/[0.05] border-t px-6 py-5 sm:px-8">
              <p className="text-primary flex flex-wrap items-center justify-center gap-2 text-center text-sm">
                <ShieldCheck className="text-primary h-4 w-4 shrink-0" strokeWidth={1.75} />
                <span>
                  Your information is <strong>safe &amp; confidential</strong>
                </span>
              </p>
              <p className="text-primary/80 mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs font-semibold sm:text-sm">
                {REGISTRATION_TRUST_ITEMS.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    {index > 0 ? <span className="text-primary/30 hidden sm:inline">|</span> : null}
                    <Check className="text-primary h-3.5 w-3.5 shrink-0 stroke-[3]" />
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
