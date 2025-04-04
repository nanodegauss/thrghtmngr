# THE RIGHT MANAGER

This repository hosts a web-based application designed to simplify the management and negotiation of image rights. The tool allows users to track projects, artworks, contacts (rights holders), budgets, and related tasks in a centralized and efficient manner.

## 🚀 Features

- **User Authentication and Roles:**
  - Administrators: full access to manage projects, artworks, contacts, and tasks.
  - Standard Users: manage only their projects, artworks, and contacts.
  - Viewers: read-only access.

- **Project Management:**
  - Create and track projects with detailed descriptions, timelines, budgets, and categories.
  - Real-time budget tracking based on negotiated tariffs.

- **Artwork Management:**
  - Manage detailed information such as title, author, period, origin, exhibition number, reference, and visuals.
  - Dynamic custom fields that can be added or modified through the admin panel.
  - Track historical changes made to each artwork.

- **Rights Holder (Contacts) Management:**
  - Maintain comprehensive contact information.
  - Assign rights holders to artworks along with negotiated tariffs and supported media.

- **Task Management:**
  - Add tasks to specific artworks with deadlines and assigned users.

- **Notification and Reminder System:** *(planned)*
  - Automated notifications for task deadlines and rights negotiations.

## 🛠 Technologies

- **Backend:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Frontend:** Next.js with React
- **UI Components:** shadcn/ui with Tailwind CSS

## 📁 Repository Structure

```bash
/
├── src/
│   ├── components/       # UI components
│   ├── pages/            # Application pages
│   ├── lib/              # Database and authentication utilities
│   ├── styles/           # Global CSS styles
├── public/               # Static files
├── migrations/           # Database migrations (Drizzle ORM)
└── README.md
```

## 🚧 Getting Started

### Requirements
- Node.js (LTS)
- Supabase account (setup your database and obtain credentials)

### Installation
```bash
git clone <repository-url>
cd <repository-name>
npm install
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🤝 Contributing

Pull requests and feedback are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

© 2025 The Right Manager.