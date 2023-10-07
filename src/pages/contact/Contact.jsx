import { useState } from "react";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";
import Card from "../../components/card/Card";
import { FaEnvelope, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import "./Contact.scss";
import axios from "axios";
import { SERVER_URL } from "../../services/authServices";

const Contact = () => {
  useRedirectLoggedOutUser();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const data = {
    subject,
    message,
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    try {
      if (!subject || !message) {
        return toast.error("Please, make sure to fill out both fileds.");
      }
      const response = await axios.post(`${SERVER_URL}/api/contact-us`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact US</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={subject}
              required
              onChange={(event) => setSubject(event.target.value)}
            />
            <label>Message</label>
            <textarea
              placeholder="Type your message here"
              name="message"
              value={message}
              required
              onChange={(event) => setMessage(event.target.value)}
              cols={30}
              rows={10}
            ></textarea>
            <button className="--btn --btn-primary"> Send Message</button>
          </Card>
        </form>
        <div className="details">
          <Card cardClass="card2">
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below.</p>
            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>+8690909090909090</p>
              </span>
              <span>
                <FaEnvelope />
                <p>borlab.dev@outlook.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Shanghai, China</p>
              </span>
              <span>
                <FaLinkedin />
                <p>linkedin</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
