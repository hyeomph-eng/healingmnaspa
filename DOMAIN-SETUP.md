# Healing M&A Spa GitHub & domain setup

- GitHub repository: `https://github.com/hyeomph-eng/healingmnaspa`
- Production domain: `healingmnaspa.site`
- Deployment target: Cloudflare Worker `healing-mna-spa`

This is a server-rendered website, so GitHub stores the source while Cloudflare
Workers serves the live website. Do not enable GitHub Pages for this repository.

## 1. GitHub Actions secrets

In the GitHub repository, open **Settings → Secrets and variables → Actions**
and add these repository secrets:

| Name | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers Scripts edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Every push to the `main` branch runs `.github/workflows/deploy.yml` and deploys
the latest build to Cloudflare Workers.

## 2. Add the domain to Cloudflare

1. In Cloudflare, choose **Add a domain** and enter `healingmnaspa.site`.
2. Select the Free plan unless another plan is required.
3. Cloudflare will show two assigned nameservers, for example:

   - `<assigned-name-1>.ns.cloudflare.com`
   - `<assigned-name-2>.ns.cloudflare.com`

4. At the company where the domain was purchased, replace the current domain
   nameservers with those exact two Cloudflare nameservers.

The nameserver values are unique to the Cloudflare account and must be copied
from the Cloudflare setup screen. They cannot be prepared in advance.

### Registrar DNS / nameserver entry

| Setting | Value |
| --- | --- |
| Type | Nameserver (NS) |
| Host | Root domain / `@` |
| Value 1 | First Cloudflare-assigned nameserver |
| Value 2 | Second Cloudflare-assigned nameserver |
| TTL | Automatic or default |

Do not add GitHub Pages A records (`185.199.*`) because this repository uses a
Cloudflare Worker rather than GitHub Pages.

## 3. Connect the Worker custom domains

After the first successful GitHub Actions deployment:

1. Open **Cloudflare → Workers & Pages → healing-mna-spa**.
2. Open **Settings → Domains & Routes → Add → Custom Domain**.
3. Add `healingmnaspa.site`.
4. Add `www.healingmnaspa.site` as a second custom domain if the www address is
   needed.

Cloudflare automatically creates the necessary DNS records and SSL certificate
when each custom domain is added. No manual A record is required.

## 4. Recommended final DNS state

Cloudflare manages these records automatically after the custom domains are
connected. The result should look similar to this:

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| Worker custom domain | `@` | `healing-mna-spa` | Proxied |
| Worker custom domain | `www` | `healing-mna-spa` | Proxied |

Finally, create a redirect from `www.healingmnaspa.site` to
`https://healingmnaspa.site` so only one canonical address is used.
