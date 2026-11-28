# Proposed live storage and access for ARAK Blogs

Status: recommendation only. No hosted project, billing, invitations, or production
credentials have been created. The working branch still uses the local development
adapters described in blog-publishing.md.

## Storage

Use a company-owned Supabase project alongside the existing Netlify website:

- Postgres stores article titles, summaries, bodies, slugs, languages, authors,
  draft/published status, timestamps, and a revision number.
- Supabase Storage stores cover images as files. Store the file identifier in the
  article record; do not put image data inside article rows or the Git repository.
- Microsoft 365 / Microsoft Entra ID is the selected employee sign-in provider.
  Supabase Auth connects that identity to the website session.

The website remains the public presentation and private editing interface. Its
server reads/writes this shared backend. Articles survive site redeployments and
can be edited from different employees' computers without a new website release.
Keep production content separate from the local preview and sample articles.

Keep the upload limits already implemented: JPG/PNG/WebP, 5 MB input, decode and
re-encode, strip metadata, and resize to at most 2048 px. Monitor storage and
bandwidth usage. Keep a database backup/export schedule and a separate backup
for uploaded files: Supabase database backups do not include Storage file data.
The backup retention and service plan should be selected before production use.

## Who can do what

| Person | Access |
| --- | --- |
| Administrator | Invite/deactivate employees, manage publisher access, edit and publish articles |
| Approved publisher | Write, upload images, preview, publish directly, edit and unpublish articles |
| Visitor | Read published articles and their images |

Start with those two internal roles. All approved publishers can work on the
shared article library, matching the current local workflow. There is no approval
queue. Use a company-owned administrator account, rather than a developer's
personal account, for ownership and recovery.

Add an administrator-only Team settings page listing each member's name, verified
email, role, and active/inactive status, with Invite and Remove access actions.
These controls are proposed for the live integration; they are not present in the
local version. The local version manages employee accounts with blog-team.mjs.

The company confirmed Microsoft 365 for employee email. Use a **Sign in with
Microsoft** button, restricted to the company's Microsoft Entra tenant, followed
by an active approved-membership check. Staff use their existing work accounts;
the website does not collect or store their Microsoft passwords.

Disable public sign-up and anonymous sign-in. Administrators invite/approve
specific employees in advance. An authenticated Microsoft account, tenant
membership, or matching email suffix alone does not grant publishing access.

Before connecting the live system, the Microsoft 365 administrator configures:

1. An Entra app registration with the supported account type set to this
   organization only.
2. The Supabase Auth callback URL as an allowed Web redirect URI.
3. The company tenant URL in the Supabase Azure provider, rather than the default
   common Microsoft endpoint.
4. The application client ID and client secret in the secure provider settings,
   along with the required email scope and recommended verified-email claims
   (`email` and `xms_edov`) from the official provider guide.
5. A credential rotation owner and expiry record. No secret belongs in Git or
   frontend environment variables.

The first administrator's identity must be provisioned deliberately. Subsequent
employee invitations must create an approved membership and complete the provider
identity link without exposing privileged credentials to the browser. Test this
flow with public sign-up disabled. Deactivate the membership immediately when an
employee leaves; do not depend solely on Microsoft sign-out reaching every session.

## Enforce access at the data boundary

Store memberships in an administrator-controlled table tied to the authentication
user ID. Check the current membership on every private read, upload, and write.
Publishers cannot change their own role or reactivate themselves.

Enable database Row Level Security with policies for each operation:

- Visitors can select public article fields only where status is published.
- Active approved staff can read drafts and write articles.
- Only administrators can change memberships or invite users.
- Deactivated members lose data access on their next request, even if an existing
  identity-provider session has not expired yet. Revoke sessions as well.

Use a private image bucket. Serve images through the website's image route, which
checks that the image belongs to a published article or that the requester is an
active staff member. Use an authorization-checked path for draft images, rather
than a permanent public URL. Match cache behavior to unpublishing so a previously
cached response is not accidentally served as private content. Publishing cannot
undo copies a reader has already downloaded.

Use authenticated user context for normal database operations so RLS applies.
Keep privileged invite/admin credentials on the server only. Privileged keys
bypass RLS and therefore require explicit administrator checks for each operation.
Do not put role authority into user-editable profile metadata.

## Implementation sequence

1. Create the company-owned project and separate development/production settings.
2. Add article, membership, revision, and activity-log tables with tested policies.
3. Connect Microsoft Entra sign-in and the administrator-only invitation/access
   screen, with an explicitly provisioned first administrator.
4. Replace local file storage and upload handling with database/storage adapters.
5. Migrate real approved content; omit the design samples and test accounts.
6. Test draft privacy, revoked users, simultaneous edits, publishing/unpublishing,
   backups, and restore procedures in a deployment preview before launching.

This changes the backend; the ARAK blog design and direct-publishing workflow stay
within the website.

## Official references

- Microsoft Entra provider setup: https://supabase.com/docs/guides/auth/social-sign-in/auth-azure
- Auth methods: https://supabase.com/docs/guides/auth
- Inviting users: https://supabase.com/docs/guides/auth/users
- Disabling public sign-up: https://supabase.com/docs/guides/auth/general-configuration
- Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Private file buckets: https://supabase.com/docs/guides/storage/buckets/fundamentals
- Database backups and separate file backups: https://supabase.com/docs/guides/platform/backups
