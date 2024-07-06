import { pgTable,serial,varchar,text } from "drizzle-orm/pg-core";

export const mockInterview=pgTable("mockInterview",{
id:serial('id').primaryKey(),
jsonMockResp:text('jsonMockResp').notNull(),
jobPosition:varchar('jobPosition').notNull(),
jobDesc:varchar('jobDesc').notNull(),
jobExperience:varchar('jobExperience').notNull(),
createdBy:varchar('createdBy').notNull(),
createdAt:varchar('createdAt'),
mockId:varchar('mockId').notNull(),
})

export const userAnswer=pgTable("userAnswer",{
id:serial('id').primaryKey(),
mockId:varchar('mockId').notNull(),
question:varchar('question').notNull(),
correctAns:text('correctAns').notNull(),
userAns:text('userAns').notNull(),
feedback:text('feedback').notNull(),
rating:varchar('rating').notNull(),
userEmail:varchar('userEmail'),
createdAt:varchar('createdAt'),
})

export const User=pgTable("User",{
id:serial('id').primaryKey(),
email:varchar("email").notNull(),
userName:varchar("userName").notNull(),
password:varchar("password").notNull(),
profilePicture:varchar("profilePicture").default("https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg")
})

