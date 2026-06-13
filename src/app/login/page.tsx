import InnerPage, { InnerCta } from '@/components/InnerPage';

export default function LoginPage() {
  return (
    <InnerPage eyebrow="Account" title="Login" lead="Access your clinic profile and saved specifications.">
      <p>Login form (AUTH-003) — JWT in memory, refresh cookie on .mddental.com.</p>
      <InnerCta href="/register" label="Create an account" />
    </InnerPage>
  );
}
