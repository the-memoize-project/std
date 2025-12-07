# Security Policy

## Reporting a Vulnerability

The Hive team takes security seriously. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by sending an email to:

**📧 security@hivejs.org**

If you prefer encrypted communication, you can use our [PGP key](#pgp-key) (coming soon).

### What to Include

To help us better understand and resolve the issue, please include as much of the following information as possible:

- **Type of issue** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s)** related to the manifestation of the issue
- **The location of the affected source code** (tag/branch/commit or direct URL)
- **Any special configuration required** to reproduce the issue
- **Step-by-step instructions to reproduce** the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

This information will help us triage your report more quickly.

### What to Expect

After you submit a report, here's what will happen:

1. **Acknowledgment** - We will acknowledge receipt of your vulnerability report within **48 hours**.

2. **Investigation** - Our security team will investigate the issue and determine its validity and severity.

3. **Updates** - We will send you regular updates on our progress, at minimum every **5 business days**.

4. **Fix & Disclosure** - Once we have a fix:
   - We will notify you before the public disclosure
   - We will credit you in the security advisory (unless you prefer to remain anonymous)
   - We will coordinate the disclosure timeline with you

### Disclosure Policy

- **Coordinated Disclosure** - We ask that you give us reasonable time to address the issue before publicly disclosing it.
- **Public Disclosure** - We will publicly disclose the vulnerability once a fix is available and has been deployed.
- **Security Advisories** - Security advisories will be published on our [GitHub Security Advisories page](https://github.com/hivejs/std/security/advisories).

### Scope

This security policy applies to the following:

- **In Scope:**
  - All packages under `@hive/std`
  - Official documentation and examples
  - Build tools and dependencies

- **Out of Scope:**
  - Third-party applications using Hive
  - Social engineering attacks
  - Physical attacks
  - Denial of Service (DoS) attacks

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services
- Only interact with accounts you own or with explicit permission from the account holder
- Do not exploit a security issue beyond what is necessary to demonstrate it
- Give us reasonable time to address the issue before any disclosure

We will not pursue legal action against researchers who follow these guidelines.

### Recognition

We believe in recognizing the efforts of security researchers:

- **Hall of Fame** - We maintain a [Security Researchers Hall of Fame](SECURITY_HALL_OF_FAME.md) (coming soon)
- **Credits** - Security researchers will be credited in:
  - Security advisories
  - Release notes
  - Our documentation (with their permission)

### Supported Versions

We support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.18.x  | ✅ Current release |
| < 0.18  | ❌ Please upgrade  |

**Note:** During the 0.x.x development phase, only the latest minor version receives security updates.

### Security Best Practices for Users

When using Hive in your projects:

1. **Keep Dependencies Updated**
   ```bash
   # Check for updates
   npm outdated @hive/std

   # Update to latest
   npm update @hive/std
   ```

2. **Use Package Lock Files**
   - Commit `package-lock.json`, `yarn.lock`, or `bun.lockb`
   - This ensures consistent dependency versions

3. **Review Security Advisories**
   - Watch our [Security Advisories](https://github.com/hivejs/std/security/advisories)
   - Enable GitHub security alerts for your repositories

4. **Validate User Input**
   - Always sanitize user input before rendering
   - Use the HTML template tag safely
   - Be cautious with dynamic content

5. **Content Security Policy**
   - Implement CSP headers in your application
   - Use nonces for inline scripts if needed

### Known Security Considerations

#### Shadow DOM and Style Encapsulation

Hive uses Shadow DOM for style encapsulation. Be aware:

- Shadow DOM provides style isolation, not security isolation
- JavaScript can still access Shadow DOM content
- Don't rely on Shadow DOM for security boundaries

#### Event Bus (Echo)

When using the Echo message bus:

- Validate event data before processing
- Don't trust events from untrusted components
- Use namespacing to avoid event collisions

#### HTML Template Tag

When using the `html` template tag:

- Don't interpolate unsanitized user input
- Use attribute binding for dynamic values
- Consider a sanitization library for user-generated HTML

**Unsafe:**
```javascript
html`<div>${userInput}</div>` // ❌ Can lead to XSS
```

**Safer:**
```javascript
html`<div data-value="${sanitize(userInput)}"></div>` // ✅ Sanitized
```

### Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Web Security Basics](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Node Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Questions?

If you have questions about this security policy, please open a discussion on our [GitHub Discussions](https://github.com/hivejs/std/discussions) page.

---

**Thank you for helping keep Hive and our users safe!** 🔒
