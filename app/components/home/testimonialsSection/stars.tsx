import { FiStar } from "react-icons/fi";

interface StarsProps {
  rating: number;
  inline?: boolean;
}

export function Stars({ rating, inline = false }: StarsProps) {
  return (
    <span
      className={`flex items-center gap-xxs ${inline ? "text-court-gold" : ""}`}
      role="img"
      aria-label={`${rating} / 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <FiStar
          key={index}
          aria-hidden="true"
          className={
            index < rating
              ? "h-3.5 w-3.5 fill-current text-court-gold"
              : "h-3.5 w-3.5 text-embassy/20"
          }
        />
      ))}
    </span>
  );
}
