import { socialsData } from "./MainInfo";
import { motion } from "framer-motion";

const ContactInfo = () => {
  return (
    <motion.div
      className="w-1/3 grid gap-4 p-5 rounded-sm border"
      initial={{ opacity: 0.3, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      {socialsData.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          className="border-2 p-2 rounded-xl cursor-pointer max-h-30 text-black hover:shadow-xl duration-1000"
        >
          <header className="flex gap-2 items-center ">
            <item.icon />
            <p className="font-medium">{item.title}</p>
          </header>
          <p className="text-gray-400">
            {item.link_view?.length == undefined
              ? item.link.slice(item.link.lastIndexOf("/"))
              : item.link_view}
          </p>
        </a>
      ))}
    </motion.div>
  );
};

export default ContactInfo;
