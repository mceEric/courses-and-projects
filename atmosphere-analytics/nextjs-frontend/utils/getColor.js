function getColors(darkMode) {
  return {
    primary: {
      bg: darkMode ? "bg-[#212121]" : "bg-white",
      text: darkMode ? "text-[#212121]" : "text-white",
      hover: darkMode ? "hover:text-white" : "hover:text-[#212121]",
      violetBg: darkMode ? "bg-violet-300" : "bg-violet-700",
      violetText: darkMode ? "text-violet-700" : "text-violet-300",
      violetHover: darkMode
        ? "group-hover:text-violet-300"
        : "group-hover:text-violet-700",
    },

    primaryRev: {
      bg: !darkMode ? "bg-[#212121]" : "bg-white",
      text: !darkMode ? "text-[#212121]" : "text-white",
      hover: !darkMode ? "hover:text-white" : "hover:text-[#212121]",
      violetBg: !darkMode ? "bg-violet-300" : "bg-violet-700",
      violetText: !darkMode ? "text-violet-700" : "text-violet-300",
      violetHover: !darkMode
        ? "group-hover:text-violet-300"
        : "group-hover:text-violet-700",
    },

    secondary: {
      bg: darkMode ? "bg-[#2f2b30]" : "bg-violet-50",
      text: darkMode ? "text-[#2f2b30]" : "text-violet-50",
      violetBg: darkMode ? "bg-violet-200" : "bg-violet-500",
      violetText: darkMode ? "text-violet-500" : "text-violet-200",
      violetHover: darkMode
        ? "group-hover:text-violet-200"
        : "group-hover:text-violet-500",
    },

    gray: {
      bg: darkMode ? "bg-gray-400" : "bg-gray-500",
      text: darkMode ? "text-gray-400" : "text-gray-500",
    },

    masked: {
      bg: !darkMode ? "bg-gray-100" : "bg-[#272429]",
      text: !darkMode ? "text-gray-100" : "text-gray-600",
    },
  };
}
export default getColors;

export function getMuiColors(darkMode) {
  return {
    primary: {
      bg: darkMode ? "#212121" : "#ffffff",
      text: darkMode ? "#212121" : "#ffffff",
      violetBg: darkMode ? "#c4b5fd" : "#6d28d9",
      violetText: darkMode ? "#6d28d9" : "#c4b5fd",
    },
    primaryRev: {
      bg: !darkMode ? "#212121" : "#ffffff",
      text: !darkMode ? "#212121" : "#ffffff",
      violetBg: !darkMode ? "#c4b5fd" : "#6d28d9",
      violetText: !darkMode ? "#6d28d9" : "#c4b5fd",
    },
    secondary: {
      bg: darkMode ? "#2f2b30" : "#f5f3ff",
      text: darkMode ? "#2f2b30" : "#f5f3ff",
      violetBg: darkMode ? "#ddd6fe" : "#8b5cf6",
      violetText: darkMode ? "#8b5cf6" : "#ddd6fe",
    },
    gray: {
      bg: darkMode ? "#9ca3af" : "#6b7280",
      text: darkMode ? "#9ca3af" : "#6b7280",
    },
    masked: {
      bg: !darkMode ? "#f3f4f6" : "#272429",
      text: !darkMode ? "#f3f4f6" : "#4b5563",
    },
  };
}
