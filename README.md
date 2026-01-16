```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                 LAVENTA UI                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Laventa UI** adalah modern UI component library untuk **React** dan **Next.js** dengan berbagai varian komponen yang cantik dan fleksibel.
Dibangun menggunakan **styled-components** untuk mendukung theming yang konsisten dan mudah dikustomisasi.

---

## 📦 Installation

Pilih salah satu package manager berikut:

```bash
npm install laventa-ui
```

```bash
yarn add laventa-ui
```

```bash
pnpm add laventa-ui
```

---

## ⚙️ Requirements

Pastikan dependensi berikut sudah terpasang di project kamu:

```bash
npm install react react-dom styled-components
```

---

## 🚀 Quick Start

```jsx
import { Button } from 'laventa-ui';

function App() {
  return <Button>Click Me</Button>;
}

export default App;
```

---

## Components & Variants

### Button

```jsx
import { Button } from 'laventa-ui';

<Button variant="primary">Submit</Button>
<Button variant="outline">Cancel</Button>
<Button variant="glow">⚠️ Warning</Button>
<Button variant="pill">Pill Button</Button>
<Button variant="breathing">Processing...</Button>
```

**Available variants:**
`primary`, `outline`, `glow`, `pill`, `breathing`

---

### Card

```jsx
import { Card } from 'laventa-ui';

<Card variant="glass" title="Glass Card" description="Transparent effect" />

<Card
  variant="profile"
  title="John Doe"
  description="Frontend Developer"
  image="/avatar.jpg"
  actionLabel="Follow"
  onAction={() => console.log('Followed')}
/>

<Card
  variant="stats"
  title="Progress"
  description="Project completion"
  stats="85%"
  image="/stats-bg.jpg"
/>

<Card
  variant="feature"
  title="Premium Feature"
  description="Highlight important features"
  image="/feature-bg.jpg"
  actionLabel="Explore"
/>

<Card
  variant="shimmer"
  title="Shimmer Card"
  description="With animated shimmer effect"
/>
```

**Available variants:**
`glass`, `profile`, `stats`, `feature`, `shimmer`

---

### Header

```jsx
import { Header } from 'laventa-ui';

<Header variant="default">
  <h3>My Website</h3>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</Header>

<Header variant="withLogo">
  <img src="/logo.png" alt="Logo" />
  <h2>My Brand</h2>
  <nav>...</nav>
</Header>

<Header
  variant="withImage"
  title="Hero Section"
  image="/header-bg.jpg"
>
  <h1>Welcome</h1>
  <nav>...</nav>
</Header>

<Header variant="glowTitle">
  <h1>GLOWING TITLE</h1>
  <nav>...</nav>
</Header>
```

**Available variants:**
`default`, `withLogo`, `withImage`, `glowTitle`

---

### Footer

```jsx
import { Footer } from 'laventa-ui';

<Footer
  variant="center"
  content={{
    p: "© 2024 My App",
    small: "All rights reserved",
  }}
/>

<Footer
  variant="gradient"
  content={{
    p: "Follow Us",
    small: "Stay connected",
    socials: ["instagram", "twitter", "facebook"],
  }}
/>

<Footer
  variant="links"
  content={{
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Team", href: "/team" },
        ],
      },
    ],
    bottom: "© 2024 Company Name",
  }}
/>

<Footer
  variant="waveGlow"
  content={{
    p: "Laventa UI",
    small: "With animated wave border",
  }}
/>
```

**Available variants:**
`center`, `gradient`, `links`, `waveGlow`

---

### Sidebar

```jsx
import { Sidebar } from 'laventa-ui';

<Sidebar
  variant="gradient"
  title="Navigation"
  menu={[
    { label: "Dashboard" },
    { label: "Profile" },
    { label: "Settings" },
    { label: "Logout" },
  ]}
  onSelect={(item) => console.log('Selected:', item)}
/>

<Sidebar
  variant="glass"
  title="Menu"
  menu={[
    { label: "Home", icon: "🏠" },
    { label: "About", icon: "👤" },
    { label: "Settings", icon: "⚙️" },
  ]}
/>

<Sidebar
  variant="modern"
  title="Navigation"
  menu={[...]}
  bottomButton={{
    label: "Contact Us",
    onClick: () => console.log('Contact clicked'),
  }}
/>

<Sidebar variant="BorderAnimation" title="Menu" menu={[...]} />
```

**Available variants:**
`gradient`, `glass`, `modern`, `BorderAnimation`

---

## Customization

Semua komponen mendukung props React standar seperti `style`, `className`, dan event handler.

```jsx
<Button
  variant="primary"
  style={{ margin: '10px', borderRadius: '20px' }}
  className="my-custom-class"
  onClick={() => console.log('Clicked!')}
>
  Custom Button
</Button>
```

---

## 📄 License

MIT License © 2024 **Sherly Puput Rahmawati**