import { interviewCovers } from "./constants";

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return interviewCovers[randomIndex]; // Returns a path like /covers/amazon.png
};
