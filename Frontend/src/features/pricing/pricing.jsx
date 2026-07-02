import React, { useState } from "react";
import "./pricing.scss";
import { Link } from "react-router";
import Header from "../header/header";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    quarterly: 0,
    annual: 0,
    description: "Try the full pipeline on a real interview before you commit.",
    features: [
      "3 interview reports / month",
      "Resume vs. job description match score",
      "AI-generated technical & behavioural questions",
      "Resume upload (PDF/DOCX)",
    ],
    cta: "Get Started Free",
    ctaLink: "/",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 19,
    quarterly: 17,
    annual: 15,
    description: "For anyone actively interviewing and prepping every week.",
    features: [
      "Unlimited interview reports",
      "Full skill gap analysis with severity scoring",
      "7-day preparation roadmap per report",
      "Priority report generation",
      "Downloadable PDF reports",
      "Email support, same-day response",
    ],
    cta: "Start 7-Day Free Trial",
    ctaLink: "/",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 49,
    quarterly: 44,
    annual: 39,
    description: "For coaches and teams running prep across many candidates.",
    features: [
      "Everything in Pro, per seat",
      "Candidate workspace & shared history",
      "Custom branding on reports",
      "API access for your own tooling",
      "Dedicated account manager",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    ctaLink: "#",
    highlighted: false,
  },
];

const compareRows = [
  { label: "Interview reports", starter: "3 / month", pro: "Unlimited", ent: "Unlimited" },
  { label: "Match score & question bank", starter: true, pro: true, ent: true },
  { label: "Skill gap analysis", starter: false, pro: true, ent: true },
  { label: "7-day roadmap", starter: false, pro: true, ent: true },
  { label: "PDF export", starter: false, pro: true, ent: true },
  { label: "Team workspace", starter: false, pro: false, ent: true },
  { label: "API access", starter: false, pro: false, ent: true },
];

const testimonials = [
  {
    quote:
      "The skill gap breakdown showed me exactly what to study instead of guessing. Landed an offer after two prep cycles on Pro.",
    name: "Sanya Kapoor",
    role: "Software Engineer, Series B startup",
    initials: "SK",
  },
  {
    quote:
      "I run interview prep for a bootcamp cohort of 40 students — the team workspace and branding on Enterprise made this feel like our own product.",
    name: "Marcus Webb",
    role: "Career Coach, TechLaunch Academy",
    initials: "MW",
  },
  {
    quote:
      "Went from a 52% match score to 89% after following the 7-day roadmap twice. That roadmap alone is worth the subscription.",
    name: "Priya Nandan",
    role: "Data Analyst, hired at a fintech firm",
    initials: "PN",
  },
];

const Check = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Dash = () => (
  <svg className="dash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const faqs = [
  {
    q: "What counts as one interview report?",
    a: "One report is one resume paired with one job description — you get the match score, the generated question set, and (on Pro and above) the skill gap analysis and roadmap for that pairing.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account settings whenever you like — you keep access until the end of the period you already paid for, no hidden fees.",
  },
  {
    q: "Is there a free trial on Pro?",
    a: "Pro includes a 7-day free trial with unlimited reports, so you can run it against every role you're actually applying to before you pay.",
  },
  {
    q: "How is the match score calculated?",
    a: "We parse your resume and the job description, then compare required skills, experience level, and keyword overlap to produce a single alignment score with the reasoning behind it.",
  },
];

const BILLING_LABELS = {
  monthly: { label: "Monthly", suffix: "", save: null },
  quarterly: { label: "Quarterly", suffix: ", billed quarterly", save: "Save 10%" },
  annual: { label: "Annual", suffix: ", billed annually", save: "Save 20%" },
};

const Pricing = () => {
  const [billing, setBilling] = useState("annual"); // "monthly" | "quarterly" | "annual"
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="dashboard pricing-page has-fixed-header">
      <Header/>

      <main className="pricing-main">
        <section className="pricing-hero">
          <span className="hero-eyebrow">Pricing</span>
          <h1>One report shows you the gap.<br />Pro closes it.</h1>
          <p>
            Every plan runs your resume against the job description and scores the match.
            Pro adds the skill gap analysis and day-by-day roadmap that turn that score into
            an actual plan.
          </p>

          <div className="billing-toggle" role="group" aria-label="Billing period">
            {Object.keys(BILLING_LABELS).map((key) => (
              <button
                key={key}
                type="button"
                className={billing === key ? "is-active" : ""}
                onClick={() => setBilling(key)}
              >
                {BILLING_LABELS[key].label}
                {BILLING_LABELS[key].save && (
                  <span className="save-pill">{BILLING_LABELS[key].save}</span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="pricing-grid">
          {plans.map((plan, idx) => {
            const price = plan[billing];
            const suffix = BILLING_LABELS[billing].suffix;
            return (
              <div
                key={idx}
                className={`pricing-card ${plan.highlighted ? "pricing-card--featured" : ""}`}
              >
                {plan.highlighted && <div className="featured-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>
                <div className="plan-price">
                  <span className="price">${price}</span>
                  <span className="period">/month{price > 0 ? suffix : ""}</span>
                </div>
                <Link to={plan.ctaLink} className={`plan-cta ${plan.highlighted ? "plan-cta--primary" : ""}`}>
                  {plan.cta}
                </Link>
                <ul className="plan-features">
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="pricing-compare">
          <h2>Compare plans</h2>
          <div className="compare-table" role="table">
            <div className="compare-row compare-row--head" role="row">
              <span role="columnheader"></span>
              <span role="columnheader">Starter</span>
              <span role="columnheader">Pro</span>
              <span role="columnheader">Enterprise</span>
            </div>
            {compareRows.map((row, i) => (
              <div className="compare-row" role="row" key={i}>
                <span className="compare-label" role="rowheader">{row.label}</span>
                {[row.starter, row.pro, row.ent].map((cell, j) => (
                  <span className="compare-cell" role="cell" key={j}>
                    {typeof cell === "string" ? (
                      cell
                    ) : cell ? (
                      <Check className="check-icon" />
                    ) : (
                      <Dash />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-testimonials">
          <h2>Trusted by people actually landing offers</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="testimonial-stars" aria-hidden="true">★★★★★</div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-author-text">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={idx}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <h4>{item.q}</h4>
                    <span className="faq-chevron" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-answer" id={`faq-answer-${idx}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-left">
          <div className="footer-brand">ResumeIQ</div>
          <p className="footer-copy">© 2026 ResumeIQ Inc. All rights reserved.</p>
        </div>
        <nav className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
};

export default Pricing;