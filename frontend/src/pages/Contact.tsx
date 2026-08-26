import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="flex justify-center">
      <section className="w-2/3">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-3xl mb-14 font-medium"
        >
          Contacts
        </motion.h1>

        <div className="flex gap-10">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
