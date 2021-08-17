export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
export interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}
export interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: "normal";
  description: string;
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
export interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}
export interface CourseRequirementsPart extends CoursePartBaseWithDescription {
  type: "requirements";
  requirements: string[];
}

export type CoursePart = CourseNormalPart 
  | CourseProjectPart 
  | CourseSubmissionPart 
  | CourseRequirementsPart;
