# Examples

Real-world examples demonstrating @hive/std features and patterns.

## Available Examples

### 1. [Counter](./counter)

**Difficulty:** ⭐ Beginner

A simple reactive counter demonstrating:
- Basic component structure
- Reactive state with `@repaint`
- Attribute observation
- Event handling

**[Live Demo](./counter/index.html)** | **[Source Code](./counter/counter.js)**

---

### 2. [Todo List](./todo-list)

**Difficulty:** ⭐⭐ Intermediate

A complete todo application with:
- Multiple components
- Component communication with Echo
- LocalStorage persistence
- Form handling

**[Live Demo](./todo-list/index.html)** | **[Source Code](./todo-list/)**

---

### 3. [Theme Switcher](./theme-switcher)

**Difficulty:** ⭐⭐ Intermediate

Theme switching with performance optimization:
- `@retouch` for CSS-only updates
- Global state management
- Performance best practices
- Smooth transitions

**[Live Demo](./theme-switcher/index.html)** | **[Source Code](./theme-switcher/)**

---

## Running Examples Locally

### Option 1: Simple HTTP Server

```bash
cd examples/<example-name>
python3 -m http.server 8080
```

### Option 2: Node.js Serve

```bash
npx serve examples/<example-name>
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## Learning Path

### Beginner
1. Start with [Counter](./counter) to understand basics
2. Read each example's README
3. Experiment with the code

### Intermediate
1. Study [Todo List](./todo-list) for component patterns
2. Explore [Theme Switcher](./theme-switcher) for performance
3. Try modifying examples

### Advanced
1. Combine patterns from multiple examples
2. Build your own components
3. Contribute examples back to the project!

---

## Example Template

Want to add your own example? Use this structure:

```
examples/your-example/
├── README.md           # Description and walkthrough
├── index.html          # Entry point
├── component.js        # Main component
└── package.json        # (optional) Dependencies
```

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

## Online Playgrounds

Try Hive without installation:

- **CodeSandbox:** [Open Template](https://codesandbox.io/s/hive-std-template)
- **StackBlitz:** [Open Template](https://stackblitz.com/fork/hive-std-template)
- **JSFiddle:** [Open Template](https://jsfiddle.net/hive-std-template)

---

## Support

- 📖 [Documentation](../README.md)
- 💬 [Discussions](https://github.com/hivejs/std/discussions)
- 🐛 [Report Issues](https://github.com/hivejs/std/issues)

---

**Happy coding!** 🐝
