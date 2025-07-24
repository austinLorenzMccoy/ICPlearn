import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AIInteractionResponse {
  'response' : AIResponse,
  'prompt' : AIPrompt,
}
export interface AIPrompt {
  'id' : string,
  'created_at' : bigint,
  'user_id' : Principal,
  'skill_id' : [] | [string],
  'prompt' : string,
}
export interface AIResponse {
  'id' : string,
  'prompt_id' : string,
  'model_used' : string,
  'tokens_used' : bigint,
  'created_at' : bigint,
  'response' : string,
}
export interface Assessment {
  'id' : string,
  'title' : string,
  'updated_at' : bigint,
  'creator_id' : Principal,
  'description' : string,
  'created_at' : bigint,
  'skill_id' : string,
  'questions' : Array<Question>,
  'is_active' : boolean,
  'time_limit' : bigint,
  'passing_score' : bigint,
}
export interface AssessmentResult {
  'id' : string,
  'answers' : BigUint64Array | bigint[],
  'user_id' : Principal,
  'time_taken' : bigint,
  'score' : bigint,
  'completed_at' : bigint,
  'assessment_id' : string,
  'passed' : boolean,
}
export interface BitcoinReward {
  'id' : string,
  'status' : string,
  'skill_ids' : Array<string>,
  'created_at' : bigint,
  'user_id' : Principal,
  'reward_metadata' : string,
  'amount' : number,
}
export interface Course {
  'id' : string,
  'title' : string,
  'updated_at' : bigint,
  'creator_id' : Principal,
  'difficulty' : string,
  'description' : string,
  'created_at' : bigint,
  'enrollment_count' : bigint,
  'is_published' : boolean,
  'skill_id' : string,
  'estimated_duration' : bigint,
  'modules' : Array<CourseModule>,
}
export interface CourseModule {
  'id' : string,
  'title' : string,
  'duration' : bigint,
  'content' : string,
  'order' : bigint,
  'resources' : Array<string>,
  'video_url' : [] | [string],
}
export interface CourseProgress {
  'id' : string,
  'progress_percentage' : bigint,
  'last_accessed' : bigint,
  'user_id' : Principal,
  'course_id' : string,
  'completed_at' : [] | [bigint],
  'completed_modules' : Array<string>,
  'started_at' : bigint,
}
export interface CreateAssessmentParams {
  'title' : string,
  'description' : string,
  'skill_id' : string,
  'questions' : Array<Question>,
  'time_limit' : bigint,
  'passing_score' : bigint,
}
export type CreateAssessmentResult = { 'Ok' : Assessment } |
  { 'Err' : Error };
export interface CreateBitcoinRewardParams {
  'skill_ids' : Array<string>,
  'user_id' : Principal,
  'reward_metadata' : [] | [string],
  'amount' : number,
}
export type CreateBitcoinRewardResult = { 'Ok' : BitcoinReward } |
  { 'Err' : Error };
export interface CreateCourseParams {
  'title' : string,
  'difficulty' : string,
  'description' : string,
  'skill_id' : string,
  'estimated_duration' : bigint,
  'modules' : Array<CourseModule>,
}
export type CreateCourseResult = { 'Ok' : Course } |
  { 'Err' : Error };
export interface CreateSkillParams {
  'prerequisites' : Array<string>,
  'difficulty' : string,
  'name' : string,
  'description' : string,
  'total_xp' : bigint,
  'category' : string,
  'learning_path' : Array<string>,
}
export type CreateSkillResult = { 'Ok' : Skill } |
  { 'Err' : Error };
export interface EnrollCourseParams { 'course_id' : string }
export type EnrollCourseResult = { 'Ok' : CourseProgress } |
  { 'Err' : Error };
export type Error = { 'InvalidInput' : string } |
  { 'InvalidPayload' : string } |
  { 'NotFound' : string } |
  { 'Unauthorized' : string } |
  { 'Forbidden' : string };
export interface GenerateCourseContentParams {
  'topic' : string,
  'difficulty' : bigint,
}
export type GenerateCourseContentResult = { 'Ok' : AIInteractionResponse } |
  { 'Err' : Error };
export interface GenerateNFTMetadataParams {
  'mastery_level' : bigint,
  'skill_name' : string,
}
export type GenerateNFTMetadataResult = { 'Ok' : AIInteractionResponse } |
  { 'Err' : Error };
export type GetAssessmentResult = { 'Ok' : Assessment } |
  { 'Err' : Error };
export type GetBitcoinRewardResult = { 'Ok' : BitcoinReward } |
  { 'Err' : Error };
export type GetCourseResult = { 'Ok' : Course } |
  { 'Err' : Error };
export type GetSkillResult = { 'Ok' : Skill } |
  { 'Err' : Error };
export type GetUserResult = { 'Ok' : User } |
  { 'Err' : Error };
export interface GetUserSkillsParams {
  'skip' : bigint,
  'mastery_level' : [] | [string],
  'user_id' : Principal,
  'limit' : bigint,
}
export interface ListAssessmentsParams {
  'skip' : bigint,
  'limit' : bigint,
  'skill_id' : [] | [string],
}
export interface ListAssessmentsResponse {
  'total' : bigint,
  'skip' : bigint,
  'limit' : bigint,
  'items' : Array<Assessment>,
}
export type ListAssessmentsResult = { 'Ok' : ListAssessmentsResponse } |
  { 'Err' : Error };
export type ListBitcoinRewardsResult = { 'Ok' : Array<BitcoinReward> } |
  { 'Err' : Error };
export interface ListCoursesParams {
  'difficulty' : [] | [string],
  'skip' : bigint,
  'limit' : bigint,
  'skill_id' : [] | [string],
  'published_only' : [] | [boolean],
}
export interface ListCoursesResponse {
  'total' : bigint,
  'skip' : bigint,
  'limit' : bigint,
  'items' : Array<Course>,
}
export type ListCoursesResult = { 'Ok' : ListCoursesResponse } |
  { 'Err' : Error };
export interface ListSkillsParams {
  'difficulty' : [] | [string],
  'skip' : bigint,
  'limit' : bigint,
  'category' : [] | [string],
}
export interface ListSkillsResponse {
  'total' : bigint,
  'skip' : bigint,
  'limit' : bigint,
  'items' : Array<Skill>,
}
export type ListSkillsResult = { 'Ok' : ListSkillsResponse } |
  { 'Err' : Error };
export interface ListUserSkillsResponse {
  'total' : bigint,
  'skip' : bigint,
  'limit' : bigint,
  'items' : Array<UserSkill>,
}
export type ListUserSkillsResult = { 'Ok' : ListUserSkillsResponse } |
  { 'Err' : Error };
export interface ListUsersParams { 'skip' : bigint, 'limit' : bigint }
export interface ListUsersResponse {
  'total' : bigint,
  'skip' : bigint,
  'limit' : bigint,
  'items' : Array<User>,
}
export type ListUsersResult = { 'Ok' : ListUsersResponse } |
  { 'Err' : Error };
export interface Question {
  'id' : string,
  'question_text' : string,
  'difficulty' : string,
  'explanation' : string,
  'correct_answer' : bigint,
  'skill_id' : string,
  'options' : Array<string>,
}
export interface RegisterUserParams {
  'username' : string,
  'email' : string,
  'btc_address' : [] | [string],
}
export interface Skill {
  'id' : string,
  'updated_at' : bigint,
  'prerequisites' : Array<string>,
  'difficulty' : string,
  'name' : string,
  'description' : string,
  'created_at' : bigint,
  'total_xp' : bigint,
  'category' : string,
  'is_active' : boolean,
  'learning_path' : Array<string>,
}
export interface SubmitAssessmentParams {
  'answers' : BigUint64Array | bigint[],
  'time_taken' : bigint,
  'assessment_id' : string,
}
export type SubmitAssessmentResult = { 'Ok' : AssessmentResult } |
  { 'Err' : Error };
export interface UpdateProgressParams {
  'module_id' : string,
  'completed' : boolean,
  'course_id' : string,
}
export interface UpdateSkillProgressParams {
  'activity_type' : string,
  'skill_id' : string,
  'xp_gained' : bigint,
}
export type UpdateSkillProgressResult = { 'Ok' : UserSkill } |
  { 'Err' : Error };
export interface UpdateUserParams {
  'username' : [] | [string],
  'email' : [] | [string],
  'is_active' : [] | [boolean],
  'btc_address' : [] | [string],
}
export interface User {
  'id' : Principal,
  'updated_at' : bigint,
  'username' : string,
  'created_at' : bigint,
  'email' : string,
  'is_active' : boolean,
  'btc_address' : [] | [string],
}
export interface UserSkill {
  'id' : string,
  'progress_percentage' : bigint,
  'certificates_earned' : Array<string>,
  'last_updated' : bigint,
  'mastery_level' : string,
  'user_id' : Principal,
  'skill_id' : string,
  'current_xp' : bigint,
  'completed_at' : [] | [bigint],
  'started_at' : bigint,
}
export interface ValidateAnswerParams {
  'question' : string,
  'user_answer' : string,
  'expected_answer' : string,
}
export type ValidateAnswerResult = { 'Ok' : AIInteractionResponse } |
  { 'Err' : Error };
export interface _SERVICE {
  'create_assessment' : ActorMethod<
    [CreateAssessmentParams],
    CreateAssessmentResult
  >,
  'create_bitcoin_reward' : ActorMethod<
    [CreateBitcoinRewardParams],
    CreateBitcoinRewardResult
  >,
  'create_course' : ActorMethod<[CreateCourseParams], CreateCourseResult>,
  'create_skill' : ActorMethod<[CreateSkillParams], CreateSkillResult>,
  'enroll_course' : ActorMethod<[EnrollCourseParams], EnrollCourseResult>,
  'generate_course_content' : ActorMethod<
    [GenerateCourseContentParams],
    GenerateCourseContentResult
  >,
  'generate_nft_metadata' : ActorMethod<
    [GenerateNFTMetadataParams],
    GenerateNFTMetadataResult
  >,
  'get_assessment_by_id' : ActorMethod<[string], GetAssessmentResult>,
  'get_bitcoin_reward' : ActorMethod<[string], GetBitcoinRewardResult>,
  'get_course_by_id' : ActorMethod<[string], GetCourseResult>,
  'get_greeting' : ActorMethod<[string], string>,
  'get_skill_by_id' : ActorMethod<[string], GetSkillResult>,
  'get_user_bitcoin_rewards' : ActorMethod<
    [Principal],
    ListBitcoinRewardsResult
  >,
  'get_user_by_id' : ActorMethod<[string], GetUserResult>,
  'get_user_count' : ActorMethod<[string], bigint>,
  'get_user_skills' : ActorMethod<[GetUserSkillsParams], ListUserSkillsResult>,
  'list_assessments' : ActorMethod<
    [ListAssessmentsParams],
    ListAssessmentsResult
  >,
  'list_courses' : ActorMethod<[ListCoursesParams], ListCoursesResult>,
  'list_skills' : ActorMethod<[ListSkillsParams], ListSkillsResult>,
  'list_users' : ActorMethod<[ListUsersParams], ListUsersResult>,
  'process_bitcoin_reward' : ActorMethod<[string], GetBitcoinRewardResult>,
  'register_user' : ActorMethod<[RegisterUserParams], GetUserResult>,
  'submit_assessment' : ActorMethod<
    [SubmitAssessmentParams],
    SubmitAssessmentResult
  >,
  'update_course_progress' : ActorMethod<
    [UpdateProgressParams],
    EnrollCourseResult
  >,
  'update_skill_progress' : ActorMethod<
    [UpdateSkillProgressParams],
    UpdateSkillProgressResult
  >,
  'update_user' : ActorMethod<[UpdateUserParams], GetUserResult>,
  'validate_answer' : ActorMethod<[ValidateAnswerParams], ValidateAnswerResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
