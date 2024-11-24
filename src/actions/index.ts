//src/actions/index.ts
import { db, Comments,Author } from 'astro:db'; import { defineAction } from 'astro:actions'; import { z } from 'astro:schema';
export const server = {
    addComment: defineAction({
        input: z.object({
            authorId: z.number(),
            body: z.string(),
        }),
        handler: async (input) => {
            const updatedComments = await db
                .insert(Comments)
                .values(input)
                .returning();
            // Return the updated comments      
            return updatedComments;
        },
    }),
};