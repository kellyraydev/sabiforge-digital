import { useEffect, useId, useRef, useState, type SubmitEvent, type ReactNode } from 'react';
import Icon from '@/components/ui/Icon';
import { composeBrief, validateEnquiry, type Enquiry, type EnquiryErrors } from '@/lib/enquiry';

interface Option {
  value: string;
  label: string;
}

interface Props {
  services: Option[];
  packages: Option[];
  email: string;
  whatsappNumber: string;
}

const businessTypes: Option[] = [
  { value: 'founder', label: 'New business or founder' },
  { value: 'small-business', label: 'Small business' },
  { value: 'online-store', label: 'Online store or e-commerce brand' },
  { value: 'established', label: 'Established company' },
  { value: 'organisation', label: 'Non-profit or organisation' },
  { value: 'agency', label: 'Agency or developer' },
  { value: 'other', label: 'Other' },
];
const budgets: Option[] = [
  { value: '', label: 'Prefer not to say' },
  { value: 'under-150k', label: 'Under ₦150,000' },
  { value: '150k-300k', label: '₦150,000 – ₦300,000' },
  { value: '300k-600k', label: '₦300,000 – ₦600,000' },
  { value: '600k-1m', label: '₦600,000 – ₦1,000,000' },
  { value: 'over-1m', label: 'Above ₦1,000,000' },
  { value: 'unsure', label: 'Not sure yet' },
];
const timelines: Option[] = [
  { value: '', label: 'Choose a timeframe' },
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: '3-6-months', label: 'Within 3–6 months' },
  { value: 'flexible', label: 'Flexible' },
];
const platforms: Option[] = [
  { value: '', label: 'Choose one' },
  { value: 'none', label: 'Not selling online yet' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'social', label: 'Instagram / WhatsApp only' },
  { value: 'other', label: 'Another platform' },
];

const empty: Enquiry = {
  name: '',
  business: '',
  email: '',
  phone: '',
  hasWebsite: '',
  website: '',
  businessType: '',
  service: '',
  package: '',
  platform: '',
  description: '',
  budget: '',
  timeline: '',
  references: '',
  consent: false,
};

const commerceKeys = ['shopify-ecommerce-development', 'store'];

export default function ProjectEnquiry({ services, packages, email, whatsappNumber }: Props) {
  const [data, setData] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [stage, setStage] = useState<'form' | 'review'>('form');
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  // Preselect from ?service= or ?package= links elsewhere on the site.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') ?? '';
    const pkg = params.get('package') ?? '';
    setData((d) => ({
      ...d,
      service: services.some((s) => s.value === service) ? service : d.service,
      package: packages.some((p) => p.value === pkg) ? pkg : d.package,
    }));
  }, [services, packages]);

  useEffect(() => {
    if (stage === 'review') reviewRef.current?.focus();
  }, [stage]);

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const showCommerce = commerceKeys.includes(data.service) || commerceKeys.includes(data.package);

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const result = validateEnquiry(data);
    setErrors(result);
    if (Object.keys(result).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStage('review');
  };

  const labels = {
    service: services.find((s) => s.value === data.service)?.label,
    package: packages.find((p) => p.value === data.package)?.label,
    businessType: businessTypes.find((b) => b.value === data.businessType)?.label,
    budget: budgets.find((b) => b.value === data.budget)?.label,
    timeline: timelines.find((t) => t.value === data.timeline)?.label,
    platform: platforms.find((p) => p.value === data.platform)?.label,
  };
  const brief = composeBrief(data, labels);
  const subject = `Project enquiry — ${data.business || data.name}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(brief)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorEntries = Object.entries(errors).filter(([, v]) => v) as [keyof Enquiry, string][];

  if (stage === 'review') {
    return (
      <div className="bg-ivory-50 text-midnight-900 rounded-[var(--radius-card)] p-6 sm:p-10">
        <p className="meta text-mint-800">Step 2 of 2 · Send your brief</p>
        <h2
          ref={reviewRef}
          tabIndex={-1}
          className="font-display mt-3 text-3xl font-semibold outline-none sm:text-4xl"
        >
          Thanks, {data.name.split(' ')[0]}. Choose how to send it.
        </h2>
        <p className="text-midnight-800/80 mt-3 max-w-2xl">
          Your brief is ready. It will open in your own email or WhatsApp app so you can check it
          and press send. This website does not store or transmit it.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a
            href={mailHref}
            className="bg-coral-600 hover:bg-coral-700 flex min-h-13 items-center justify-center gap-2 rounded-full px-5 font-semibold text-white transition"
          >
            <Icon name="mail" className="size-5" /> Send by email
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-midnight-900 text-ivory-50 hover:bg-midnight-700 flex min-h-13 items-center justify-center gap-2 rounded-full px-5 font-semibold transition"
          >
            <Icon name="whatsapp" className="size-5" /> Send on WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="border-midnight-900/30 hover:border-midnight-900 flex min-h-13 items-center justify-center gap-2 rounded-full border px-5 font-semibold transition"
          >
            <Icon name={copied ? 'check' : 'copy'} className="size-5" />
            {copied ? 'Copied' : 'Copy brief'}
          </button>
        </div>
        <p className="sr-only" role="status">
          {copied ? 'Brief copied to clipboard.' : ''}
        </p>
        <h3 className="meta text-midnight-800 mt-10">Your brief</h3>
        <pre className="border-midnight-900/12 bg-ivory-100 text-midnight-800 mt-3 max-h-96 overflow-auto rounded-xl border p-5 font-mono text-[0.8rem] leading-relaxed whitespace-pre-wrap">
          {brief}
        </pre>
        <p className="text-midnight-800/75 mt-4 text-sm">
          If your email app doesn’t open, copy the brief and send it to{' '}
          <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStage('form')}
          className="mt-8 inline-flex items-center gap-2 rounded-sm font-semibold underline underline-offset-4"
        >
          <Icon name="arrow-right" className="size-4 rotate-180" /> Edit details
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="bg-ivory-50 text-midnight-900 rounded-[var(--radius-card)] p-6 sm:p-10"
      aria-describedby={`${uid}-intro`}
    >
      <p className="meta text-mint-800">Step 1 of 2 · About your project</p>
      <p id={`${uid}-intro`} className="text-midnight-800/80 mt-3">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">as required</span> are required. Everything else helps us prepare,
        but is optional.
      </p>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${uid}-errors`}
          className="border-coral-700 bg-coral-500/10 mt-6 rounded-xl border-2 p-5 outline-none"
        >
          <h2 id={`${uid}-errors`} className="text-coral-800 flex items-center gap-2 font-semibold">
            <Icon name="alert" className="size-5" />
            Please check {errorEntries.length === 1 ? '1 field' : `${errorEntries.length} fields`}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
            {errorEntries.map(([key, message]) => (
              <li key={key}>
                <a href={`#${uid}-${key}`} className="underline underline-offset-2">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <FieldGroup title="You">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${uid}-name`}
            label="Your name"
            required
            autoComplete="name"
            value={data.name}
            error={errors.name}
            onChange={(v) => set('name', v)}
          />
          <TextField
            id={`${uid}-business`}
            label="Business or organisation"
            autoComplete="organization"
            value={data.business}
            onChange={(v) => set('business', v)}
          />
          <TextField
            id={`${uid}-email`}
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            error={errors.email}
            onChange={(v) => set('email', v)}
          />
          <TextField
            id={`${uid}-phone`}
            label="WhatsApp or phone"
            type="tel"
            autoComplete="tel"
            hint="Optional"
            value={data.phone}
            error={errors.phone}
            onChange={(v) => set('phone', v)}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Your business">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id={`${uid}-businessType`}
            label="Type of business"
            options={[{ value: '', label: 'Choose one' }, ...businessTypes]}
            value={data.businessType}
            onChange={(v) => set('businessType', v)}
          />
          <fieldset>
            <legend className="text-sm font-semibold">Do you have a website already?</legend>
            <div className="mt-2 flex gap-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ].map((o) => (
                <label
                  key={o.value}
                  className={`has-[:focus-visible]:outline-mint-700 flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 ${
                    data.hasWebsite === o.value
                      ? 'border-midnight-900 bg-midnight-900 text-ivory-50'
                      : 'border-midnight-900/25'
                  }`}
                >
                  <input
                    type="radio"
                    name={`${uid}-hasWebsite`}
                    value={o.value}
                    checked={data.hasWebsite === o.value}
                    onChange={() => set('hasWebsite', o.value as Enquiry['hasWebsite'])}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
          {data.hasWebsite === 'yes' && (
            <div className="sm:col-span-2">
              <TextField
                id={`${uid}-website`}
                label="Current website address"
                type="url"
                placeholder="https://"
                autoComplete="url"
                value={data.website}
                error={errors.website}
                onChange={(v) => set('website', v)}
              />
            </div>
          )}
        </div>
      </FieldGroup>

      <FieldGroup title="The project">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id={`${uid}-service`}
            label="Service you’re interested in"
            options={[{ value: '', label: 'Not sure yet' }, ...services]}
            value={data.service}
            onChange={(v) => set('service', v)}
          />
          <SelectField
            id={`${uid}-package`}
            label="Package, if you have one in mind"
            options={[{ value: '', label: 'Not sure yet' }, ...packages]}
            value={data.package}
            onChange={(v) => set('package', v)}
          />
          {showCommerce && (
            <div className="sm:col-span-2">
              <SelectField
                id={`${uid}-platform`}
                label="Where do you sell today?"
                options={platforms}
                value={data.platform}
                onChange={(v) => set('platform', v)}
              />
            </div>
          )}
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-description`} className="text-sm font-semibold">
              What would you like to achieve? <span aria-hidden="true">*</span>
            </label>
            <p id={`${uid}-description-hint`} className="text-midnight-800/75 mt-1 text-sm">
              A few sentences is plenty: what you do, who your customers are, what the website
              should help with.
            </p>
            <textarea
              id={`${uid}-description`}
              rows={5}
              required
              aria-invalid={Boolean(errors.description)}
              aria-describedby={`${uid}-description-hint${errors.description ? ` ${uid}-description-error` : ''}`}
              value={data.description}
              onChange={(e) => set('description', e.target.value)}
              className={inputClass(Boolean(errors.description))}
            />
            {errors.description && (
              <FieldError id={`${uid}-description-error`}>{errors.description}</FieldError>
            )}
          </div>
          <SelectField
            id={`${uid}-budget`}
            label="Approximate budget (optional)"
            options={budgets}
            value={data.budget}
            onChange={(v) => set('budget', v)}
          />
          <SelectField
            id={`${uid}-timeline`}
            label="Ideal launch window"
            options={timelines}
            value={data.timeline}
            onChange={(v) => set('timeline', v)}
          />
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-references`} className="text-sm font-semibold">
              Reference links
            </label>
            <p id={`${uid}-references-hint`} className="text-midnight-800/75 mt-1 text-sm">
              Optional — websites you like, competitors, or your social pages. One per line.
            </p>
            <textarea
              id={`${uid}-references`}
              rows={3}
              aria-describedby={`${uid}-references-hint`}
              value={data.references}
              onChange={(e) => set('references', e.target.value)}
              className={inputClass(false)}
            />
          </div>
        </div>
      </FieldGroup>

      <div className="border-midnight-900/12 mt-8 border-t pt-6">
        <div className="flex gap-3">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={data.consent}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            onChange={(e) => set('consent', e.target.checked)}
            className="accent-midnight-900 mt-1 size-5 shrink-0"
          />
          <label htmlFor={`${uid}-consent`} className="text-midnight-800 text-sm leading-relaxed">
            I understand my brief will be sent from my own email or WhatsApp app, and that SabiForge
            Digital will use these details only to respond to this enquiry.{' '}
            <span aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && <FieldError id={`${uid}-consent-error`}>{errors.consent}</FieldError>}
      </div>

      <button
        type="submit"
        className="bg-coral-600 hover:bg-coral-700 mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full px-8 font-semibold text-white transition sm:w-auto"
      >
        Review my brief <Icon name="arrow-right" className="size-5" />
      </button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-midnight-900 placeholder:text-midnight-800/50 transition focus:border-midnight-900 focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-mint-700 ${
    invalid ? 'border-coral-700' : 'border-midnight-900/25'
  }`;
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-midnight-900/12 mt-8 border-t pt-6">
      <legend className="font-display float-left mb-5 w-full text-xl font-semibold">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-coral-800 mt-2 flex items-center gap-1.5 text-sm font-medium">
      <Icon name="alert" className="size-4 shrink-0" />
      {children}
    </p>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  placeholder?: string;
  error?: string;
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  hint,
  placeholder,
  error,
}: TextFieldProps) {
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {required && <span aria-hidden="true">*</span>}
        {hint && (
          <span id={`${id}-hint`} className="text-midnight-800/70 ml-1 font-normal">
            ({hint})
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(Boolean(error))}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

function SelectField({ id, label, options, value, onChange, hint }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-midnight-800/75 mt-1 text-sm">
          {hint}
        </p>
      )}
      <select
        id={id}
        value={value}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass(false)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23031f25'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
      >
        {options.map((o) => (
          <option key={o.value + o.label} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
