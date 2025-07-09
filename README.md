# 🍳 Chef - Recipe Sharing Community

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/DaisyUI-4.12.23-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI">
</div>

## 📖 Project Overview

**Chef** is a comprehensive recipe sharing community platform built with Next.js 14, TypeScript, and modern web technologies. It provides a social platform where cooking enthusiasts can share recipes, follow their favorite chefs, rate and comment on recipes, and discover new culinary experiences.

### ✨ Key Features

#### 🔐 **Authentication & Authorization**
- **JWT-based Authentication** with secure login/logout
- **Role-based Access Control** (Admin, Premium User, Free User)
- **Password Reset** functionality with email verification
- **Profile Management** with image upload and bio editing

#### 👥 **User Management**
- **User Dashboard** with analytics and statistics
- **Profile Customization** with personal information
- **Follower/Following System** to connect with other chefs
- **User Type Management** (Free vs Premium memberships)

#### 🥘 **Recipe Management**
- **Rich Text Editor** for detailed recipe creation using Jodit
- **Image Upload** with ImgBB integration
- **Recipe Categories** and search functionality
- **Recipe Rating System** with 5-star ratings
- **Upvote/Downvote** system for community engagement
- **Comments System** with edit and delete functionality

#### 🎯 **Premium Features**
- **Subscription System** with Stripe payment integration
- **Premium Recipe Access** - Free users limited to 5 recipes
- **Advanced Analytics** for premium users
- **Priority Support** and exclusive features

#### 📊 **Admin Dashboard**
- **User Management** - View, manage, and delete users
- **Recipe Management** - Monitor and moderate all recipes
- **Analytics Dashboard** with charts and statistics
- **Content Moderation** tools

#### 🌟 **Social Features**
- **Recipe Feed** with infinite scrolling
- **Follow/Unfollow** functionality
- **Recipe Sharing** and social interactions
- **Community Leaderboard** with top contributors
- **Featured Recipes** section

#### 📱 **Responsive Design**
- **Mobile-First Design** with responsive layouts
- **Dark Theme** support throughout the application
- **Smooth Animations** using Lottie React
- **Modern UI/UX** with Tailwind CSS and DaisyUI

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Animations**: Lottie React, Tailwind CSS Motion
- **Charts**: Recharts for data visualization
- **Icons**: React Icons
- **Notifications**: React Hot Toast

### Backend Integration
- **HTTP Client**: Axios for API calls
- **Authentication**: JWT tokens
- **Image Upload**: ImgBB API
- **Payment**: Stripe integration
- **Email**: EmailJS for password reset

### Development Tools
- **TypeScript**: For type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
chef-client/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (adminDashboard)/   # Admin dashboard routes
│   │   ├── (commonLayout)/     # Public pages layout
│   │   └── (userDashboard)/    # User dashboard routes
│   ├── components/             # Reusable components
│   │   ├── AdminDashboard/     # Admin specific components
│   │   ├── Home/              # Homepage sections
│   │   ├── RecipeFeed/        # Recipe feed components
│   │   ├── UserDashboard/     # User dashboard components
│   │   └── shared/            # Shared components
│   ├── context/               # React Context providers
│   ├── lib/                   # Utility libraries
│   ├── utils/                 # Helper functions
│   └── assets/                # Static assets
├── public/                    # Public assets
└── tailwind.config.js         # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/isalim079/chef-client-l2-6.git
cd chef-client
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_IMG_BB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_SERVER_URL=your_server_url
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🔗 Links & Demo

### 🌐 Live Application
- **Frontend**: https://chef-client-one.vercel.app
- **Backend API**: https://recipe-sharing-community-server-dun.vercel.app

### 📚 Repository Links
- **Frontend Repository**: https://github.com/isalim079/chef-client-l2-6
- **Backend Repository**: https://github.com/isalim079/level2-assignment-6-server

## 🔐 Test Credentials

### Admin Account
- **Email**: mraju2440@gmail.com
- **Password**: 123456

### Regular User Account
- **Email**: e@mail.com
- **Password**: 123456

## 🎯 Features Showcase

### 📱 User Experience
- **Responsive Design** that works seamlessly on all devices
- **Fast Loading** with Next.js optimization
- **Smooth Animations** for enhanced user interaction
- **Intuitive Navigation** with mobile-friendly menus

### 🔍 Search & Discovery
- **Recipe Search** with filtering options
- **Category-based Browsing** for easy navigation
- **Featured Recipes** curated by the community
- **Top Contributors** leaderboard

### 💳 Payment Integration
- **Stripe Payment Gateway** for secure transactions
- **Subscription Management** with automatic renewals
- **Transaction History** for user records
- **Premium Feature Access** based on subscription status

### 📈 Analytics & Insights
- **User Dashboard** with personal statistics
- **Recipe Performance** tracking (views, ratings, comments)
- **Follower Analytics** and engagement metrics
- **Admin Analytics** for platform overview

## 🛡️ Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** for user security
- **Input Validation** on both client and server
- **CORS Configuration** for API security
- **Rate Limiting** to prevent abuse

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_IMG_BB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_SERVER_URL=your_server_url
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```


**Note**: When you reset your password, reset password mail sometime takes 5 to 6 minutes to arrive email
