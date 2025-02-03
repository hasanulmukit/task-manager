# Task Manager

A modern, responsive task management application built with Next.js, Tailwind CSS, and TypeScript. This project implements a drag-and-drop Kanban board with features inspired by Trello.

## Features

- **Kanban Board**: Drag-and-drop interface for managing tasks
- **Task Management**:
  - Create new tasks with validation
  - Edit existing tasks
  - Delete tasks
- **Column Management**:
  - Create custom columns
  - Edit column titles
  - Delete columns (with associated tasks)
- **Persistent Storage**: Automatically saves to localStorage
- **Responsive Design**: Works on all screen sizes
- **Type Safety**: Built with TypeScript for better code quality
- **Modern UI**: Styled with Tailwind CSS

## Technologies Used

- **Frontend**:
  - Next.js 14 (App Router)
  - Tailwind CSS
  - TypeScript
- **Drag & Drop**:
  - @hello-pangea/dnd
- **Icons**:
  - react-icons
- **Form Management**:
  - react-hook-form
  - zod (for validation)
- **UI Components**:
  - @radix-ui/react-dropdown-menu

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trello-clone.git
   cd trello-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   http://localhost:3000

### Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/YourFeatureName)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/YourFeatureName)
- Open a pull request
