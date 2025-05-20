"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Testimony.module.css";

export default function Testimony() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testimony: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    testimony: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", testimony: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (formData.testimony.length < 20) {
      newErrors.testimony = "Testimony must be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/testimony", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimony");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", testimony: "" });
      setSubmitError("");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.praiseBadge}>Praise Report</div>
          <h1 className={styles.heroTitle}>Share Your Testimony</h1>
          <p className={styles.heroText}>
            We celebrate God’s word in your life. Kindly share your testimonies with us today.
          </p>
        </div>
      </section>

      {/* Testimony Form Section */}
      <section className={styles.form}>
        <h2 className={styles.formTitle}>Submit Your Praise Report</h2>
        {submitted ? (
          <div className={styles.successMessage}>
            <p>Thanks for sharing! Glory!</p>
            <button
              onClick={() => setSubmitted(false)}
              className={styles.formButton}
            >
              Share Another Testimony
            </button>
          </div>
        ) : (
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your Name"
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="Your Email"
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="testimony" className={styles.formLabel}>
                Testimony
              </label>
              <textarea
                id="testimony"
                name="testimony"
                value={formData.testimony}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Share your praise report..."
                rows={5}
              />
              {errors.testimony && (
                <p className={styles.errorText}>{errors.testimony}</p>
              )}
            </div>
            <button type="submit" className={styles.formButton}>
              Submit Testimony
            </button>
            {submitError && <p className={styles.errorText}>{submitError}</p>}
            <Image
              src="/cebc-logo.png"
              alt="CEBC Logo"
              width={32}
              height={32}
              className={styles.formIcon}
            />
          </form>
        )}
      </section>

      {/* Praise Reports Section */}
      <section className={styles.testimonies}>
        <h2 className={styles.testimonyTitle}>Praise Reports</h2>
        <div className={styles.testimonyGrid}>
          {[
            {
              name: "Austinray",
              text: "My life has been transformed by the word! Glory!",
              image: "/image8.jpg",
            },
            {
              name: "Francis",
              text: "I experience so much grace like never before seen!",
              image: "/image9.jpg",
            },
            {
              name: "Chidera",
              text: "My life has moved from one level of glory to another!",
              image: "/image10.jpg",
            },
            {
              name: "Michael",
              text: "The word of God is real! I know this because it works for me. Glory!",
              image: "/image11.jpg",
            },
          ].map((testimony, index) => (
            <div key={index} className={styles.testimonyCard}>
              <Image
                src={testimony.image}
                alt={`${testimony.name}'s photo`}
                width={80}
                height={80}
                className={styles.testimonyImage}
              />
              <h3 className={styles.testimonyName}>{testimony.name}</h3>
              <p className={styles.testimonyText}>{testimony.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}