// src/db/config.ts
import { column, defineDb, defineTable } from "astro:db";

const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text({ unique: true }),
  },
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    username: column.text({ unique: true }),
    password: column.text({ optional: true}),
    github_id: column.text({ optional: true, unique: true }),
    roleId: column.text({ references: () => Role.columns.id, optional: true }),
    created_at: column.date({ default: new Date() }), // Fecha de creación
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ references: () => User.columns.id, optional: false }),
    expiresAt: column.number({ optional: false }),
  },
});

const Post = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    userId: column.text({ references: () => User.columns.id }),
    content: column.text(),
    imageUrl: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

const PostImage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    postId: column.text({ references: () => Post.columns.id }),
    imageUrl: column.text(),
  },
});

const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    postId: column.text({ references: () => Post.columns.id }),
    userId: column.text({ references: () => User.columns.id }),
    content: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

export default defineDb({
  tables: {
    User,
    Session,
    Post,
    PostImage,
    Comment,
    Role,
  },
});
