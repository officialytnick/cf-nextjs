import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Contact() {
  const [status, setStatus] = useState("");
  const captchaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    "h-captcha-response": "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCaptchaVerify = (token) => {
    setFormData((prev) => ({ ...prev, "h-captcha-response": token }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData["h-captcha-response"]) {
      setStatus("Please complete the captcha.");
      return;
    }

    setStatus("Sending...");

    const data = new FormData();
    data.append("access_key", "67415797-60fc-4da0-8bf3-c7c9105a85c6");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("h-captcha-response", formData["h-captcha-response"]);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    }).then((res) => res.json());

    if (response.success) {
      setStatus("Message Sent Successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
        "h-captcha-response": "",
      });
      captchaRef.current.resetCaptcha();
    } else {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <>
        <Helmet>
             <title>Contact | ConvertFreely</title>
              <meta
                name="description"
                content="Contact ConvertFreely for support, questions, or feedback on our fast, secure, browser-based file conversion and image tools. We’re here to help."
              />
            </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#202124] rounded-xl p-8 border border-gray-200 dark:border-gray-800">

          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

          {/* NEW TEXT SECTION */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
            <p className="mb-3">
              We’d love to hear from you! Whether you have a question, want to
              report an issue, suggest a new tool, or simply want to say hello -
              feel free to reach out anytime.
            </p>
            <p className="mb-3">
              ConvertFreely is still actively growing, and your feedback helps us
              shape the future of this platform.
            </p>
            <p>
              For direct inquiries, you can reach us at:
              <br />
              <strong>contact@convertfreely.com</strong>
            </p>
          </div>
          {/* END TEXT */}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#2a2b2d]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#2a2b2d]"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Message</label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#2a2b2d]"
              ></textarea>
            </div>

            {/* hCaptcha */}
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              onVerify={onCaptchaVerify}
              reCaptchaCompat={false}
              ref={captchaRef}
            />

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>

            {status && <p className="text-sm mt-2">{status}</p>}
          </form>

        </div>
      </motion.div>
    </>
  );
}
