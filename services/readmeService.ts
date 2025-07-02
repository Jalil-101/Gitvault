// services/readmeService.ts
import { ReadmeData } from '../types/readme';

class ReadmeService {
  // Simulate fetching README from GitHub API
  async fetchReadme(repoFullName: string): Promise<ReadmeData | null> {
    try {
      // In real implementation, this would be:
      // const response = await fetch(`https://api.github.com/repos/${repoFullName}/readme`);
      // return await response.json();
      
      // For now, return dummy data based on repository
      return this.getDummyReadme(repoFullName);
    } catch (error) {
      console.error('Failed to fetch README:', error);
      return null;
    }
  }

  private getDummyReadme(repoFullName: string): ReadmeData {
    const readmeTemplates = this.getReadmeTemplates();
    const repoName = repoFullName.split('/')[1];
    
    // Generate different README content based on repo characteristics
    let template = readmeTemplates.default;
    
    if (repoName.toLowerCase().includes('react')) {
      template = readmeTemplates.react;
    } else if (repoName.toLowerCase().includes('api')) {
      template = readmeTemplates.api;
    } else if (repoName.toLowerCase().includes('mobile')) {
      template = readmeTemplates.mobile;
    } else if (repoName.toLowerCase().includes('web')) {
      template = readmeTemplates.web;
    }

    const content = template.replace(/\{REPO_NAME\}/g, repoName);
    
    return {
      content: this.encodeBase64(content), // Use custom base64 encode
      encoding: 'base64',
      size: content.length,
      sha: this.generateSha(content),
      url: `https://api.github.com/repos/${repoFullName}/contents/README.md`,
      html_url: `https://github.com/${repoFullName}/blob/main/README.md`,
      download_url: `https://raw.githubusercontent.com/${repoFullName}/main/README.md`
    };
  }

  private generateSha(content: string): string {
    // Simple hash generation for demo purposes
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Custom base64 encoding for React Native
  private encodeBase64(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    
    while (i < str.length) {
      const a = str.charCodeAt(i++);
      const b = i < str.length ? str.charCodeAt(i++) : 0;
      const c = i < str.length ? str.charCodeAt(i++) : 0;
      
      const bitmap = (a << 16) | (b << 8) | c;
      
      result += chars.charAt((bitmap >> 18) & 63);
      result += chars.charAt((bitmap >> 12) & 63);
      result += i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
      result += i - 1 < str.length ? chars.charAt(bitmap & 63) : '=';
    }
    
    return result;
  }

  // Custom base64 decoding for React Native
  private decodeBase64(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    
    // Remove any characters not in the base64 alphabet
    str = str.replace(/[^A-Za-z0-9+/]/g, '');
    
    while (i < str.length) {
      const encoded1 = chars.indexOf(str.charAt(i++));
      const encoded2 = chars.indexOf(str.charAt(i++));
      const encoded3 = chars.indexOf(str.charAt(i++));
      const encoded4 = chars.indexOf(str.charAt(i++));
      
      const bitmap = (encoded1 << 18) | (encoded2 << 12) | (encoded3 << 6) | encoded4;
      
      result += String.fromCharCode((bitmap >> 16) & 255);
      if (encoded3 !== 64) result += String.fromCharCode((bitmap >> 8) & 255);
      if (encoded4 !== 64) result += String.fromCharCode(bitmap & 255);
    }
    
    return result;
  }

  private getReadmeTemplates() {
    return {
      default: `# {REPO_NAME}

A modern software project built with cutting-edge technologies.

## Features

- ✨ Clean and intuitive interface
- 🚀 High performance optimization
- 🔒 Secure by design
- 📱 Cross-platform compatibility

## Installation

\`\`\`bash
git clone https://github.com/username/{REPO_NAME}.git
cd {REPO_NAME}
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.`,

      react: `# {REPO_NAME} ⚛️

A React application built with modern development practices.

## 🚀 Features

- ⚛️ React 18 with Hooks
- 🎨 Styled with Tailwind CSS
- 📱 Responsive design
- 🔥 Hot module replacement
- 🧪 Comprehensive testing

## 📦 Installation

\`\`\`bash
npm install
# or
yarn install
\`\`\`

## 🏃‍♂️ Running the Application

\`\`\`bash
npm start
# or
yarn start
\`\`\`

## 🧪 Testing

\`\`\`bash
npm test
# or
yarn test
\`\`\`

## 🏗️ Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

## 📚 Available Scripts

- \`npm start\` - Runs the app in development mode
- \`npm test\` - Launches the test runner
- \`npm run build\` - Builds the app for production
- \`npm run eject\` - Ejects from Create React App

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.`,

      api: `# {REPO_NAME} API 🚀

A robust RESTful API built with modern backend technologies.

## 📋 API Documentation

### Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

### Authentication
All API requests require authentication using Bearer tokens:

\`\`\`bash
Authorization: Bearer YOUR_TOKEN_HERE
\`\`\`

## 🛠️ Endpoints

### Users
\`\`\`
GET    /users          # Get all users
GET    /users/:id      # Get user by ID
POST   /users          # Create new user
PUT    /users/:id      # Update user
DELETE /users/:id      # Delete user
\`\`\`

### Posts
\`\`\`
GET    /posts          # Get all posts
GET    /posts/:id      # Get post by ID
POST   /posts          # Create new post
PUT    /posts/:id      # Update post
DELETE /posts/:id      # Delete post
\`\`\`

## 🚀 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start the server
npm run dev
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 📊 Response Format

All API responses follow this format:

\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2023-01-01T00:00:00Z"
}
\`\`\``,

      mobile: `# {REPO_NAME} 📱

A cross-platform mobile application built with React Native.

## 🌟 Features

- 📱 Cross-platform (iOS & Android)
- 🎨 Beautiful UI with native components
- 🔄 Real-time data synchronization
- 📊 Analytics and crash reporting
- 🔐 Secure authentication

## 🛠️ Tech Stack

- React Native
- TypeScript
- React Navigation
- Redux Toolkit
- React Native Reanimated

## 📋 Prerequisites

- Node.js (>= 16)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## 🚀 Installation

\`\`\`bash
# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# For Android, make sure you have Android SDK installed
\`\`\`

## 🏃‍♂️ Running the App

### iOS
\`\`\`bash
npx react-native run-ios
\`\`\`

### Android
\`\`\`bash
npx react-native run-android
\`\`\`

## 📱 Building for Production

### iOS
\`\`\`bash
cd ios
xcodebuild -workspace {REPO_NAME}.xcworkspace -scheme {REPO_NAME} -configuration Release
\`\`\`

### Android
\`\`\`bash
cd android
./gradlew assembleRelease
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
\`\`\``,

      web: `# {REPO_NAME} 🌐

A modern web application built with the latest web technologies.

## ✨ Features

- 🎨 Modern, responsive design
- ⚡ Lightning-fast performance
- 🔍 SEO optimized
- 📱 Mobile-first approach
- 🌙 Dark mode support

## 🛠️ Built With

- HTML5 & CSS3
- JavaScript (ES6+)
- Webpack
- Sass/SCSS
- Progressive Web App (PWA)

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/username/{REPO_NAME}.git

# Navigate to project directory
cd {REPO_NAME}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Visit \`http://localhost:3000\` to view the application.

## 📦 Build

\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🎨 Customization

### Colors
Edit the color variables in \`src/styles/variables.scss\`:

\`\`\`scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
\`\`\`

### Fonts
Update the font imports in \`src/styles/fonts.scss\`.

## 🚀 Deployment

The application can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request`
    };
  }

  // Decode base64 content - Fixed for React Native
  decodeContent(readmeData: ReadmeData): string {
    try {
      if (readmeData.encoding === 'base64') {
        return this.decodeBase64(readmeData.content);
      }
      return readmeData.content;
    } catch (error) {
      console.error('Error decoding README content:', error);
      return 'Error: Unable to decode README content';
    }
  }
}

export const readmeService = new ReadmeService();