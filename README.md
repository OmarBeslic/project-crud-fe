# Project CRUD Frontend

This is the **frontend** for the **CRUD Project Management App**, built with **React 18+, Webpack, Ant Design, Styled-Components, and Redux Toolkit Query (RTK Query)**.

---

## 📌 Features

- Create, Read, Update, and Delete (CRUD) projects
- Mark projects as favorites
- Uses **Redux Toolkit Query (RTK Query)** for data fetching and caching
- Built with **Ant Design** for UI components
- Uses **Styled-Components** for modular styles
- Scalable and maintainable architecture

---

## 🛠️ Setup and Installation

### **1️⃣ Clone the Repository**

```
git clone https://github.com/OmarBeslic/project-crud-fe.git
cd project-crud-frontend
```

### **2️⃣ Install Dependencies**

```
npm install
```

### **3️⃣ Start the Development Server**

```
npm start
```

The frontend will be running on `http://localhost:3000`.

---

## 🔥 API Integration

This frontend communicates with the **backend API** located at `http://localhost:3001`. Ensure the backend is running before testing API calls.

### **📌 Fetch All Projects**

```typescript
const { data: projects, error, isLoading } = useGetProjectsQuery();
```

### **📌 Fetch Project by ID**

```typescript
const { data: project, error, isLoading } = useGetProjectByIdQuery(projectId);
```

### **📌 Add a New Project**

```typescript
const [addProject] = useAddProjectMutation();
addProject({ name: "New Project", description: "Some description" });
```

### **📌 Update a Project**

```typescript
const [updateProject] = useUpdateProjectMutation();
updateProject({ id: "project_id", name: "Updated Project" });
```

### **📌 Delete a Project**

```typescript
const [deleteProject] = useDeleteProjectMutation();
deleteProject("project_id");
```

### **📌 Toggle Favorite**

```typescript
const [toggleFavorite] = useToggleFavoriteMutation();
toggleFavorite("project_id");
```

---

## 🏡 Project Structure

```
/src
│── /components        # Reusable UI components
│── /features          # RTK Query API slices
│── /pages             # Pages (Dashboard, Project Details, etc.)
│── /store             # Redux store configuration
│── App.tsx            # Main application entry
│── index.tsx          # ReactDOM render entry
```

---


