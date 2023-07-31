import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateAddr = (address?: string, separator: string = '…') => {
  if (!address) return '';

  const match = address.match(
    /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );

  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
};

export function convertBlockTimestampToDate(timestamp: number) {
  // Convert Unix timestamp to milliseconds (date-fns uses milliseconds for timestamps)
  const milliseconds = timestamp * 1000;

  // Use date-fns to format the date
  const formattedDate = format(new Date(milliseconds), 'yyyy-MM-dd HH:mm:ss');

  return formattedDate;
}
