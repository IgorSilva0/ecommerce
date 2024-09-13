# Online Shop

**Online Shop** is a modern, responsive e-commerce platform that delivers a seamless and engaging shopping experience. This project demonstrates my dedication to web development and showcases my skills with a variety of advanced technologies.

## Key Features

### User Authentication

- **Sign up**, **Log in**, and **Log out** functionalities for managing user accounts.
- **Personalized Dashboard** for viewing and analyzing purchase history.

### Product Browsing

- Products categorized into **Fashion**, **Sports**, and **Electronics**.
- **Product Variants** (e.g., sizes: small, medium, large) supported.
- Options for **Dark Mode** and **Light Mode** for a tailored browsing experience.

### Shopping Cart

- Add items to the cart with data stored in cookies for persistence between sessions.

### Secure Checkout

- **Stripe Integration** for processing payments, supporting:
  - **Credit Cards**
  - **Google Pay**
  - **Apple Pay**
- In **Test Mode**, users can complete transactions using the test credit card number `4242 4242 4242 4242`.

### User Dashboard

- **Purchase History** with detailed analytics, including:
  - **Charts** showing spending by category.
  - **Order Filtering** and **Export Options** (JSON or CSV).

### Test Account
- Explore the platform and access charts and order history without making any purchases using the test credentials below:
 - **Email: test@gmail.com**
 - **Password: 123456**

## Technologies Used

### Frameworks and Libraries

- **Next.js**: React-based framework for building the front end.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable design.
- **Radix UI**: Provides accessible, low-level components for complex UI elements.
- **ShadCN**: Utility for handling various UI elements and styling.
- **Stripe**: Payment processing, including support for credit cards, Google Pay, and Apple Pay.
- **Supabase**: Backend service for authentication and database management.
- **Zod**: Schema validation for robust data handling.

### Database and State Management

- **PostgreSQL**: Relational database for managing user data and order history.
- **Supabase**: Used for backend operations and server-side logic.

### Development and Testing Tools

- **TypeScript**: Provides type safety and improved developer experience.
- **Playwright**: For end-to-end application testing (currently under development).
- **Vitest**: For unit testing components and functionalities.
- **ESLint & Prettier**: Tools for maintaining code quality and consistency.
- **Husky**: Manages Git hooks for pre-commit checks.

## How It Works

1. **Browse Products**: Users can explore products by category and select variants.
2. **Add to Cart**: Items are added to the cart and stored in cookies for continuity.
3. **Checkout**: Payments are processed securely through Stripe, with Test Mode available for development purposes.
4. **User Dashboard**: Users can access their dashboard to review analytics and order history after purchase.

---

Live: https://ecommerce-rho-woad.vercel.app/

Feel free to explore the platform and share your feedback. I’m continually working to enhance and refine my skills!
