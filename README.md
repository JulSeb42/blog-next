# Next.js Full-Stack Boilerplate

A modern, production-ready Next.js boilerplate with authentication, database integration, and comprehensive tooling for rapid application development.

## 🚀 Features

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS 4.x with custom configuration
- **Authentication**: JWT-based auth with refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for image/file handling
- **Email**: Nodemailer for transactional emails
- **Code Generation**: Plop.js for automated component/page generation
- **UI Components**: Custom component library (@julseb-lib/react)
- **Development**: ESLint, Prettier, and comprehensive tooling

## 📁 Project Structure

```
src/
├── api/              # API service layer
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Authentication routes
│   ├── (home)/       # Home page routes
│   ├── api/          # API route handlers
│   └── my-account/   # User account pages
├── components/       # Reusable UI components
├── context/          # React Context providers
├── data/             # Static data and configuration
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries and configurations
├── models/           # Database models
├── seed/             # Database seeding scripts
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

plop/                 # Code generation templates and logic
├── generators/       # Plop generators for different file types
├── templates/        # Handlebars templates
└── utils/            # Generator utilities
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boilerplate-next-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp template.env .env.local
   ```

4. **Configure environment variables**
   Edit `.env.local` with your settings:
   ```env
   ORIGIN=http://localhost:3000
   NEXT_PUBLIC_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   
   # Email configuration
   EMAIL=your_email@gmail.com
   WORD=your_app_password
   
   # JWT secrets (generate secure random strings)
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   
   # Cloudinary configuration
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

   Your app will be available at `http://localhost:3000`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm seed-users` | Seed database with test users |

### Code Generation Scripts

| Script | Description |
|--------|-------------|
| `pnpm plop` | Interactive code generator menu |
| `pnpm plop:g` | Generate new generator |
| `pnpm plop:c` | Generate component with folder structure |
| `pnpm plop:sc` | Generate single component file |
| `pnpm plop:p` | Generate new page |
| `pnpm plop:co` | Generate React context |
| `pnpm plop:t` | Generate TypeScript types |
| `pnpm plop:r` | Generate API route |
| `pnpm plop:m` | Generate database model |

## 🔐 Authentication System

The boilerplate includes a complete authentication system with:

- **JWT Authentication**: Access and refresh token implementation
- **User Registration**: Email verification workflow
- **Password Reset**: Secure password reset via email
- **Protected Routes**: Client and server-side route protection
- **Auth Context**: React context for auth state management

### Auth Routes

- `/login` - User login
- `/signup` - User registration
- `/verify` - Email verification
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/my-account` - User profile management

## 🎨 Code Generation

This boilerplate includes powerful code generation capabilities using Plop.js:

### Component Generation
```bash
pnpm plop:c MyComponent
```
Generates:
- Component file with TypeScript
- Index file for exports
- Types file for component props
- Proper folder structure

### Page Generation
```bash
pnpm plop:p my-page
```
Generates:
- Next.js page component
- Proper metadata configuration
- TypeScript types

### API Route Generation
```bash
pnpm plop:r users
```
Generates:
- API route handlers (GET, POST, PUT, DELETE)
- TypeScript interfaces
- Error handling

## 🗄️ Database

### Models
The boilerplate includes a User model with Mongoose. You can generate additional models:

```bash
pnpm plop:m Product
```

### Seeding
Populate your database with test data:

```bash
pnpm seed-users
```

## 📧 Email Integration

Email functionality is configured with Nodemailer and supports:
- User verification emails
- Password reset emails
- Custom email templates
- Gmail integration (configured in template.env)

## ☁️ File Upload

Cloudinary integration for:
- Image uploads
- File management
- Image transformations
- Optimized delivery

## 🎨 Styling

- **Tailwind CSS 4.x**: Latest version with enhanced features
- **Custom Components**: Pre-built component library
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme provider support

## 🔧 Development Tools

- **TypeScript**: Strict type checking
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting
- **Hot Reload**: Fast development experience

## 📱 App Router Features

Built with Next.js App Router for:
- Server Components by default
- Nested layouts
- Loading and error boundaries
- Metadata API
- Route groups for organization

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Environment Variables for Production
Ensure all environment variables are properly configured in your deployment platform:
- Database connection string
- JWT secrets
- Email configuration
- Cloudinary credentials

### Recommended Platforms
- **Vercel**: Optimal for Next.js applications
- **Railway**: Easy database and app deployment
- **Netlify**: Alternative deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔍 What's Included

### Frontend
- ✅ Next.js 15 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS styling
- ✅ Component library integration
- ✅ Authentication UI
- ✅ Responsive layouts

### Backend
- ✅ API routes with TypeScript
- ✅ MongoDB integration
- ✅ JWT authentication
- ✅ File upload handling
- ✅ Email services
- ✅ User management

### Development
- ✅ Code generation tools
- ✅ Database seeding
- ✅ ESLint configuration
- ✅ TypeScript strict mode
- ✅ Development scripts

### Production Ready
- ✅ Environment configuration
- ✅ Error handling
- ✅ Security best practices
- ✅ Performance optimizations
- ✅ SEO configuration

---

**Ready to build something amazing?** 🚀

Start by running `pnpm dev` and explore the authentication system, then use the code generators to rapidly scaffold your application components.