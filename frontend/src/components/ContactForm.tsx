import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMessageStore } from "../store/messageStore";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const feedbackMessageSchema = z.object({
  name: z.string().max(20, "Max length is 20").min(2, "Min length is 2"),
  email: z.string().email("Invalid email"),
  theme: z.string().max(100, "Max length is 100").min(2, "Min length is 2"),
  message: z
    .string()
    .min(10, "Min length is 10")
    .max(1000, "Max length is 1000"),
});

type FeedbackMessage = z.infer<typeof feedbackMessageSchema>;

// Конфигурация
const formFields = [
  { id: "name", label: "Name", type: "text" } as const,
  { id: "email", label: "Email", type: "email" } as const,
  { id: "theme", label: "Theme", type: "text" } as const,
  { id: "message", label: "Message", type: "textarea" } as const,
] as const;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackMessage>({
    resolver: zodResolver(feedbackMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      theme: "",
      message: "",
    },
  });

  const { createMessage } = useMessageStore();

  const onSubmit = async (data: FeedbackMessage) => {
    await createMessage(data);
    toast.success("Спасибо за обратную связь!");
    reset();
  };

  return (
    <motion.form
      initial={{ opacity: 0.3, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2 }}
      className="w-2/3  grid gap-4 p-6 rounded-xl shadow-lg border"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFields.map((field) => {
        const error = errors[field.id];
        const isTextarea = field.type === "textarea";

        return (
          <div key={field.id} className="flex flex-col gap-1.5">
            <label
              htmlFor={field.id}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            {isTextarea ? (
              <textarea
                id={field.id}
                rows={3}
                {...register(field.id)}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition"
                placeholder={field.label}
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                {...register(field.id)}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition"
                placeholder={field.label}
              />
            )}

            {error && <p className="text-red-600 text-sm">{error.message}</p>}
          </div>
        );
      })}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full shadow-sm hover:bg-blue-300 duration-1000 font-medium py-3 rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
