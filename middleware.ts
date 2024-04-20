export { default } from "next-auth/middleware"

// Use the following to protect only certain pages
export const config = { matcher: ["/protected"] }