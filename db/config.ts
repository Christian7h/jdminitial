// db/config.ts
import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }), 
    username: column.text({ unique: true }),  
    email: column.text({ unique: true }),     
    password: column.text(),                 
    createdAt: column.date({ default: new Date() }), 
    role: column.text({ references: () => Role.columns.id }), 
  },
});
 
const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),  
    name: column.text(), 
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
    Role,
    Post,
    PostImage,
    Comment,
  },
});
