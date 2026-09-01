import { useTranslation } from "react-i18next";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { motion } from "framer-motion";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center">
      <section className="lg:w-2/3 md:w-full">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-3xl mb-14 font-medium"
        >
          {t("constacts.title")}
        </motion.h1>

        <div className="gap-10 md:grid lg:flex">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
