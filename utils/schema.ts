import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterView', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('JsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    joDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar("mockId").notNull()


})