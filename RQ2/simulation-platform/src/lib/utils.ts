import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to create a URL-friendly slug
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")       // Replace spaces with -
    .replace(/[^\w-]+/g, "")    // Remove all non-word chars (fixed escaping)
    .replace(/--+/g, "-")       // Replace multiple - with single -
    .replace(/^-+/, "")         // Trim - from start of text
    .replace(/-+$/, "");        // Trim - from end of text
};

