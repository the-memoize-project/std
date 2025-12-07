# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **New Package: `@hive/std/polyfill`** - Browser API compatibility shims
  - `setImmediate` polyfill with `setTimeout` fallback
  - Zero-cost detection (only loads when needed)
- **New Decorator: `@execute`** in directive package - Fluent API for lifecycle hooks
- CHANGELOG.md for tracking changes
- ARCHITECTURE.md for architectural documentation
- EXAMPLES.md for real-world usage examples

### Changed
- Rebranded from `@nodusjs/std` to `@hive/std`
- Updated all documentation to reflect new Hive branding
- Improved README with comprehensive feature showcase (now 9 packages)
- Enhanced CONTRIBUTING.md with detailed guidelines
- Updated CODE_OF_CONDUCT.md to Contributor Covenant 2.1
- Expanded SECURITY.md with detailed security policies
- **Standardized all package READMEs** with professional format:
  - Consistent structure across all 9 packages
  - Comprehensive API documentation
  - Real-world usage examples
  - Best practices and patterns
  - Performance considerations
- Updated ARCHITECTURE.md to document new packages
- Updated build configuration (vite.config.js) for new packages
- Added TypeScript definitions for all new packages
- Improved package exports in package.json

### Documentation
- Professional English README for spark package
- Professional README for polyfill package
- Updated all cross-references between packages

## [0.18.5] - 2024-07-08

### Summary
Current stable release with all nine packages.

### Packages
- `@hive/std/directive` - Lifecycle and attribute decorators
- `@hive/std/dom` - Rendering and styling utilities
- `@hive/std/echo` - Message bus for component communication
- `@hive/std/event` - Event listener decorators
- `@hive/std/polyfill` - Browser API compatibility shims
- `@hive/std/spark` - Data transformation functions

### Features
- Full TypeScript definitions
- Shadow DOM support
- Adopted stylesheets
- Reactive rendering
- Event delegation
- Form-associated custom elements support

### Testing
- 80%+ code coverage
- Vitest with happy-dom
- Comprehensive test suite

### Build
- Vite for bundling
- Dual format output (ESM + CommonJS)
- Tree-shakeable modules

## [0.18.0] - Previous Releases

Previous versions were released under `@nodusjs/std`. See git history for details.

---

## Release Types

### Major Releases (x.0.0)
Breaking changes that require migration.

### Minor Releases (0.x.0)
New features, backward compatible (during 0.x, APIs may change).

### Patch Releases (0.0.x)
Bug fixes, backward compatible.

---

## Migration Guides

### From @nodusjs/std to @hive/std

**Package name change:**

```bash
# Uninstall old package
npm uninstall @nodusjs/std

# Install new package
npm install @hive/std
```

**Import updates:**

```javascript
// Old
import { define } from "@nodusjs/std/directive";

// New
import { define } from "@hive/std/directive";
```

**CDN updates:**

```javascript
// Old
import { define } from "https://esm.sh/@nodusjs/std/directive";

// New
import { define } from "https://esm.sh/@hive/std/directive";
```

**No API changes** - Only the package name has changed. All APIs remain the same.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to suggest changes and improvements.

---

[Unreleased]: https://github.com/hivejs/std/compare/v0.18.5...HEAD
[0.18.5]: https://github.com/hivejs/std/releases/tag/v0.18.5
[0.18.0]: https://github.com/hivejs/std/releases/tag/v0.18.0
