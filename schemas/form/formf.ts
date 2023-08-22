import {z} from 'zod';

export const getNoteSchema = z.object({
    title: z.string().min(5).max(20, {message: "Content can't be more than 20 characters long"}),
    content: z.string().min(5).max(100, {message: "Content can't be more than 100 characters long"}),
    type: z.enum(["open_ended"]),
  });
  
//   export const checkAnswerSchema = z.object({
//     userInput: z.string(),
//     questionId: z.string(),
//   });
  
//   export const endGameSchema = z.object({
//     gameId: z.string(),
//   });