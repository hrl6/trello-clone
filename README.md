# Trello Clone

A full-stack Trello clone built with Next.js 14, tRPC, Prisma, and PostgreSQL. Features include drag-and-drop functionality, real-time updates, and persistent storage.

## Features

- ✨ Create, edit, and delete lists
- 📝 Create, edit, and delete items within lists
- 🔄 Drag and drop functionality for both lists and items
- 💾 Persistent storage using PostgreSQL
- 🔒 Type-safe API calls with tRPC
- 🎨 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Jotai (State Management)
  - @hello-pangea/dnd (Drag and Drop)

- **Backend:**
  - tRPC
  - Prisma ORM
  - PostgreSQL

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository**
```bash
git clone 
cd trello-clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/trello_clone"
```

4. **Set up the database**
```bash
# Create database
psql -U postgres
CREATE DATABASE trello_clone;
\q

# Run migrations
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/                   # Next.js 14 App Router
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── board/            # Board-related components
│   ├── nav/              # Navigation components
│   └── ui/               # Reusable UI components
├── prisma/               # Database schema and migrations
├── server/
│   ├── routers/          # tRPC routers
│   └── trpc.ts          # tRPC configuration
├── stores/               # Jotai stores
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## Database Schema

```prisma
model List {
  id        String   @id @default(cuid())
  title     String
  order     Int
  items     Item[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([order])
}

model Item {
  id        String   @id @default(cuid())
  content   String
  order     Int
  listId    String
  list      List     @relation(fields: [listId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([listId, order])
}
```

## API Endpoints (tRPC Procedures)

### Lists
- `list.getAll` - Get all lists with their items
- `list.create` - Create a new list
- `list.update` - Update a list's title
- `list.delete` - Delete a list
- `list.reorder` - Reorder lists

### Items
- `item.create` - Create a new item
- `item.update` - Update an item's content
- `item.delete` - Delete an item
- `item.move` - Move an item to a different list
- `item.reorder` - Reorder items within a list

## Testing

For development and debugging, the application uses several monitoring approaches:

1. **Database Queries Monitoring**
```typescript
// utils/prisma.ts
const prisma = new PrismaClient({
  log: ['query'], // logs all database queries
})
```

2. **tRPC Client Debugging**
You can monitor tRPC requests in the browser's Network tab under the `/api/trpc` endpoint.

3. **State Changes Monitoring**
```typescript
// example of monitoring board state changes when use jotai
const [board, setBoard] = useAtom(boardAtom)
useEffect(() => {
  console.log('Board state updated:', board)
}, [board])
```

## Learning Journey

### Background and Preparation
Before starting this project, I came from a PHP background and was new to the modern React ecosystem. To prepare for this project:
- Built a simple todo list application to understand basic tRPC concepts
- Studied official documentation of the core technologies
- Researched best practices through Stack Overflow and technical videos

### Key Learning Moments

#### 1. Client-Side vs Server-Side Rendering
One of the biggest challenges was understanding the difference between CSR and SSR in Next.js:
- Initially structured the code for SSR while trying to implement CSR functionality
- Learned about the importance of proper file structure in Next.js 14
- Discovered how tRPC setup differs between pure React and Next.js applications
- Successfully refactored the code to properly implement CSR with tRPC

#### 2. Modern State Management
Coming from PHP, React's state management was a new paradigm:
- Learned to effectively use `useState` for component-level state
- Discovered how state management simplifies form handling compared to traditional PHP approaches
- Implemented toggle functionality using state, which was more elegant than traditional solutions
- Gained hands-on experience with Jotai for global state management

#### 3. Database Integration
Working with Prisma was a refreshing experience:
- Found Prisma's approach to database management more intuitive than traditional ORMs
- Appreciated the type safety and autocomplete features
- Successfully implemented CRUD operations with proper error handling
- Learned to structure database schemas effectively

### Challenges and Solutions

#### 1. Item Update Functionality
**Challenge:** Items in lists couldn't be updated despite having the correct API setup.

**Solution:**
- Used console.log to debug the update flow
- Discovered the issue was related to the onBlur event interfering with the save button
- Learned about event handling priority in React
- Implemented a better solution with explicit save button functionality

#### 2. tRPC Configuration
**Challenge:** Initial tRPC setup failed due to misconfigurations.

**Solution:**
- Deeply studied tRPC documentation
- Understood the differences between tRPC setup in React vs Next.js
- Successfully implemented the correct project structure
- Gained better understanding of type safety in API calls

### Development Tools and Resources

1. **Documentation:**
   - Next.js 14 official documentation
   - tRPC guides
   - Prisma documentation
   - TypeScript handbook

2. **Learning Resources:**
   - Stack Overflow discussions
   - Technical videos about tRPC and Next.js
   - AI-assisted debugging and learning

3. **Debugging Tools:**
   - Console logging for tracking state and API calls
   - Browser developer tools for API debugging
   - TypeScript error messages for type safety

### Key Takeaways

1. **Type Safety Importance:**
   - Understood why TypeScript and tRPC's type safety can prevent many runtime errors
   - Learned to appreciate strong typing coming from PHP

2. **Modern Development Workflow:**
   - Gained experience with modern React development patterns
   - Learned to effectively use hooks and state management
   - Understood the importance of proper project structure

3. **Problem-Solving Skills:**
   - Developed better debugging strategies
   - Learned to effectively read documentation
   - Improved ability to identify root causes of issues

This project has been a significant learning experience, transforming my understanding of modern web development and teaching me valuable lessons about full-stack development with React and TypeScript.