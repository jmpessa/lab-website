// site/src/App.jsx
import React from "react";

function App() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>João Peça Lab</h1>
        <nav style={styles.nav}>
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#team">Team</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h2>Exploring the Neural Circuits of Behavior</h2>
        <p>
          Our lab investigates how neuronal circuits shape cognition, behavior,
          and disease — combining cutting-edge molecular tools with systems
          neuroscience approaches.
        </p>
      </section>

      {/* About Section */}
      <section id="about" style={styles.section}>
        <h2>About Us</h2>
        <p>
          We are a research group at [Your Institution], focusing on the
          cellular and molecular mechanisms underlying brain function and
          dysfunction.
        </p>
      </section>

      {/* Research Section */}
      <section id="research" style={styles.section}>
        <h2>Research Areas</h2>
        <ul>
          <li>Synaptic plasticity and circuit maturation</li>
          <li>Neurodevelopmental disorders and disease models</li>
          <li>Organoid models of brain function</li>
        </ul>
      </section>

      {/* Team Section */}
      <section id="team" style={styles.section}>
        <h2>Meet the Team</h2>
        <p>Coming soon: profiles of lab members.</p>
      </section>

      {/* Publications Section */}
      <section id="publications" style={styles.section}>
        <h2>Selected Publications</h2>
        <ul>
          <li>Author et al., 2025. Journal Name. <em>Title of paper</em>.</li>
          <li>Author et al., 2024. Journal Name. <em>Another title</em>.</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2>Contact</h2>
        <p>Email: joao.peca@university.edu</p>
        <p>Twitter: <a href="https://twitter.com/yourhandle">@yourhandle</a></p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} João Peça Lab</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    margin: 0,
    padding: 0,
  },
  header: {
    background: "#222",
    color: "#fff",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
  hero: {
    padding: "4rem 2rem",
    textAlign: "center",
    background: "#f4f4f4",
  },
  section: {
    padding: "2rem",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    background: "#eee",
    marginTop: "2rem",
  },
};

export default App;