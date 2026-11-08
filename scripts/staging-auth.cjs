/** Headers for Cloudflare Access service-token authentication in staging QA.
 * Store both values in the GitHub `staging` environment secrets; never pass them
 * on the command line or print them. Local/public runs may omit both.
 */
function stagingAuthHeaders() {
  const clientId = process.env.CF_ACCESS_CLIENT_ID;
  const clientSecret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (Boolean(clientId) !== Boolean(clientSecret)) {
    throw new Error('Set both Cloudflare Access service-token secrets, or omit both.');
  }
  if (!clientId) return {};

  const baseUrl = new URL(process.env.BASE_URL ?? 'http://localhost:4321');
  const allowedHosts = new Set([
    'sabiforge-digital-staging.pages.dev',
    'staging.sabiforge.digital',
  ]);
  if (baseUrl.protocol !== 'https:' || !allowedHosts.has(baseUrl.hostname)) {
    throw new Error('Access credentials are only sent to the approved HTTPS staging hostname.');
  }
  return { 'cf-access-client-id': clientId, 'cf-access-client-secret': clientSecret };
}

async function configureStagingAuth(context) {
  const headers = stagingAuthHeaders();
  if (!headers['cf-access-client-id']) return;
  const stableHost = 'sabiforge-digital-staging.pages.dev';
  const allowedHosts = new Set([stableHost, 'staging.sabiforge.digital']);
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    const isPagesDeployment = url.hostname.endsWith(`.${stableHost}`);
    if (url.protocol === 'https:' && (allowedHosts.has(url.hostname) || isPagesDeployment)) {
      return route.continue({ headers: { ...route.request().headers(), ...headers } });
    }
    return route.continue();
  });
}

module.exports = { stagingAuthHeaders, configureStagingAuth };
