import type { SiteSettings } from "@prisma/client";
import {
  Field,
  FormActions,
  SubmitButton,
  inputClass,
} from "@/components/admin/admin-chrome";

type SettingsFormProps = {
  action: (formData: FormData) => Promise<void>;
  settings: SiteSettings;
};

export function SettingsForm({ action, settings }: SettingsFormProps) {
  const socialsText = JSON.stringify(settings.socials ?? {}, null, 2);

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <input name="phone" required defaultValue={settings.phone} className={inputClass} />
        </Field>
        <Field label="SMS">
          <input name="sms" required defaultValue={settings.sms} className={inputClass} />
        </Field>
      </div>
      <Field label="Email">
        <input
          name="email"
          type="email"
          required
          defaultValue={settings.email}
          className={inputClass}
        />
      </Field>
      <Field label="Address">
        <input name="address" defaultValue={settings.address} className={inputClass} />
      </Field>
      <Field label="License text">
        <input name="licenseText" defaultValue={settings.licenseText} className={inputClass} />
      </Field>
      <Field label="Insurance text">
        <input name="insuranceText" defaultValue={settings.insuranceText} className={inputClass} />
      </Field>
      <Field label="Years in business">
        <input
          name="yearsInBusiness"
          defaultValue={settings.yearsInBusiness}
          className={inputClass}
        />
      </Field>
      <Field label="Socials JSON">
        <textarea name="socials" rows={4} defaultValue={socialsText} className={inputClass} />
      </Field>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-5">
        <p className="text-sm font-medium text-zinc-200">Chat & nurture</p>
        <Field label="Chat enabled">
          <input
            type="checkbox"
            name="chatEnabled"
            defaultChecked={settings.chatEnabled}
            className="mt-2 size-4 rounded border-zinc-600"
          />
        </Field>
        <Field label="Chat embed HTML">
          <textarea
            name="chatEmbedHtml"
            rows={6}
            defaultValue={settings.chatEmbedHtml ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Nurture emails enabled">
          <input
            type="checkbox"
            name="nurtureEnabled"
            defaultChecked={settings.nurtureEnabled}
            className="mt-2 size-4 rounded border-zinc-600"
          />
        </Field>
      </div>
      <FormActions>
        <SubmitButton label="Save settings" />
      </FormActions>
    </form>
  );
}
