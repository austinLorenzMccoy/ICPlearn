export const idlFactory = ({ IDL }) => {
  const Question = IDL.Record({
    'id' : IDL.Text,
    'question_text' : IDL.Text,
    'difficulty' : IDL.Text,
    'explanation' : IDL.Text,
    'correct_answer' : IDL.Nat64,
    'skill_id' : IDL.Text,
    'options' : IDL.Vec(IDL.Text),
  });
  const CreateAssessmentParams = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
    'skill_id' : IDL.Text,
    'questions' : IDL.Vec(Question),
    'time_limit' : IDL.Nat64,
    'passing_score' : IDL.Nat64,
  });
  const Assessment = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'updated_at' : IDL.Nat64,
    'creator_id' : IDL.Principal,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'skill_id' : IDL.Text,
    'questions' : IDL.Vec(Question),
    'is_active' : IDL.Bool,
    'time_limit' : IDL.Nat64,
    'passing_score' : IDL.Nat64,
  });
  const Error = IDL.Variant({
    'InvalidInput' : IDL.Text,
    'InvalidPayload' : IDL.Text,
    'NotFound' : IDL.Text,
    'Unauthorized' : IDL.Text,
    'Forbidden' : IDL.Text,
  });
  const CreateAssessmentResult = IDL.Variant({
    'Ok' : Assessment,
    'Err' : Error,
  });
  const CreateBitcoinRewardParams = IDL.Record({
    'skill_ids' : IDL.Vec(IDL.Text),
    'user_id' : IDL.Principal,
    'reward_metadata' : IDL.Opt(IDL.Text),
    'amount' : IDL.Float64,
  });
  const BitcoinReward = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'skill_ids' : IDL.Vec(IDL.Text),
    'created_at' : IDL.Nat64,
    'user_id' : IDL.Principal,
    'reward_metadata' : IDL.Text,
    'amount' : IDL.Float64,
  });
  const CreateBitcoinRewardResult = IDL.Variant({
    'Ok' : BitcoinReward,
    'Err' : Error,
  });
  const CourseModule = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'duration' : IDL.Nat64,
    'content' : IDL.Text,
    'order' : IDL.Nat64,
    'resources' : IDL.Vec(IDL.Text),
    'video_url' : IDL.Opt(IDL.Text),
  });
  const CreateCourseParams = IDL.Record({
    'title' : IDL.Text,
    'difficulty' : IDL.Text,
    'description' : IDL.Text,
    'skill_id' : IDL.Text,
    'estimated_duration' : IDL.Nat64,
    'modules' : IDL.Vec(CourseModule),
  });
  const Course = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'updated_at' : IDL.Nat64,
    'creator_id' : IDL.Principal,
    'difficulty' : IDL.Text,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'enrollment_count' : IDL.Nat64,
    'is_published' : IDL.Bool,
    'skill_id' : IDL.Text,
    'estimated_duration' : IDL.Nat64,
    'modules' : IDL.Vec(CourseModule),
  });
  const CreateCourseResult = IDL.Variant({ 'Ok' : Course, 'Err' : Error });
  const CreateSkillParams = IDL.Record({
    'prerequisites' : IDL.Vec(IDL.Text),
    'difficulty' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'total_xp' : IDL.Nat64,
    'category' : IDL.Text,
    'learning_path' : IDL.Vec(IDL.Text),
  });
  const Skill = IDL.Record({
    'id' : IDL.Text,
    'updated_at' : IDL.Nat64,
    'prerequisites' : IDL.Vec(IDL.Text),
    'difficulty' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'created_at' : IDL.Nat64,
    'total_xp' : IDL.Nat64,
    'category' : IDL.Text,
    'is_active' : IDL.Bool,
    'learning_path' : IDL.Vec(IDL.Text),
  });
  const CreateSkillResult = IDL.Variant({ 'Ok' : Skill, 'Err' : Error });
  const EnrollCourseParams = IDL.Record({ 'course_id' : IDL.Text });
  const CourseProgress = IDL.Record({
    'id' : IDL.Text,
    'progress_percentage' : IDL.Nat64,
    'last_accessed' : IDL.Nat64,
    'user_id' : IDL.Principal,
    'course_id' : IDL.Text,
    'completed_at' : IDL.Opt(IDL.Nat64),
    'completed_modules' : IDL.Vec(IDL.Text),
    'started_at' : IDL.Nat64,
  });
  const EnrollCourseResult = IDL.Variant({
    'Ok' : CourseProgress,
    'Err' : Error,
  });
  const GenerateCourseContentParams = IDL.Record({
    'topic' : IDL.Text,
    'difficulty' : IDL.Nat64,
  });
  const AIResponse = IDL.Record({
    'id' : IDL.Text,
    'prompt_id' : IDL.Text,
    'model_used' : IDL.Text,
    'tokens_used' : IDL.Nat64,
    'created_at' : IDL.Nat64,
    'response' : IDL.Text,
  });
  const AIPrompt = IDL.Record({
    'id' : IDL.Text,
    'created_at' : IDL.Nat64,
    'user_id' : IDL.Principal,
    'skill_id' : IDL.Opt(IDL.Text),
    'prompt' : IDL.Text,
  });
  const AIInteractionResponse = IDL.Record({
    'response' : AIResponse,
    'prompt' : AIPrompt,
  });
  const GenerateCourseContentResult = IDL.Variant({
    'Ok' : AIInteractionResponse,
    'Err' : Error,
  });
  const GenerateNFTMetadataParams = IDL.Record({
    'mastery_level' : IDL.Nat64,
    'skill_name' : IDL.Text,
  });
  const GenerateNFTMetadataResult = IDL.Variant({
    'Ok' : AIInteractionResponse,
    'Err' : Error,
  });
  const GetAssessmentResult = IDL.Variant({ 'Ok' : Assessment, 'Err' : Error });
  const GetBitcoinRewardResult = IDL.Variant({
    'Ok' : BitcoinReward,
    'Err' : Error,
  });
  const GetCourseResult = IDL.Variant({ 'Ok' : Course, 'Err' : Error });
  const GetSkillResult = IDL.Variant({ 'Ok' : Skill, 'Err' : Error });
  const ListBitcoinRewardsResult = IDL.Variant({
    'Ok' : IDL.Vec(BitcoinReward),
    'Err' : Error,
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'updated_at' : IDL.Nat64,
    'username' : IDL.Text,
    'created_at' : IDL.Nat64,
    'email' : IDL.Text,
    'is_active' : IDL.Bool,
    'btc_address' : IDL.Opt(IDL.Text),
  });
  const GetUserResult = IDL.Variant({ 'Ok' : User, 'Err' : Error });
  const GetUserSkillsParams = IDL.Record({
    'skip' : IDL.Nat64,
    'mastery_level' : IDL.Opt(IDL.Text),
    'user_id' : IDL.Principal,
    'limit' : IDL.Nat64,
  });
  const UserSkill = IDL.Record({
    'id' : IDL.Text,
    'progress_percentage' : IDL.Nat64,
    'certificates_earned' : IDL.Vec(IDL.Text),
    'last_updated' : IDL.Nat64,
    'mastery_level' : IDL.Text,
    'user_id' : IDL.Principal,
    'skill_id' : IDL.Text,
    'current_xp' : IDL.Nat64,
    'completed_at' : IDL.Opt(IDL.Nat64),
    'started_at' : IDL.Nat64,
  });
  const ListUserSkillsResponse = IDL.Record({
    'total' : IDL.Nat64,
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'items' : IDL.Vec(UserSkill),
  });
  const ListUserSkillsResult = IDL.Variant({
    'Ok' : ListUserSkillsResponse,
    'Err' : Error,
  });
  const ListAssessmentsParams = IDL.Record({
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'skill_id' : IDL.Opt(IDL.Text),
  });
  const ListAssessmentsResponse = IDL.Record({
    'total' : IDL.Nat64,
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'items' : IDL.Vec(Assessment),
  });
  const ListAssessmentsResult = IDL.Variant({
    'Ok' : ListAssessmentsResponse,
    'Err' : Error,
  });
  const ListCoursesParams = IDL.Record({
    'difficulty' : IDL.Opt(IDL.Text),
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'skill_id' : IDL.Opt(IDL.Text),
    'published_only' : IDL.Opt(IDL.Bool),
  });
  const ListCoursesResponse = IDL.Record({
    'total' : IDL.Nat64,
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'items' : IDL.Vec(Course),
  });
  const ListCoursesResult = IDL.Variant({
    'Ok' : ListCoursesResponse,
    'Err' : Error,
  });
  const ListSkillsParams = IDL.Record({
    'difficulty' : IDL.Opt(IDL.Text),
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'category' : IDL.Opt(IDL.Text),
  });
  const ListSkillsResponse = IDL.Record({
    'total' : IDL.Nat64,
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'items' : IDL.Vec(Skill),
  });
  const ListSkillsResult = IDL.Variant({
    'Ok' : ListSkillsResponse,
    'Err' : Error,
  });
  const ListUsersParams = IDL.Record({
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
  });
  const ListUsersResponse = IDL.Record({
    'total' : IDL.Nat64,
    'skip' : IDL.Nat64,
    'limit' : IDL.Nat64,
    'items' : IDL.Vec(User),
  });
  const ListUsersResult = IDL.Variant({
    'Ok' : ListUsersResponse,
    'Err' : Error,
  });
  const RegisterUserParams = IDL.Record({
    'username' : IDL.Text,
    'email' : IDL.Text,
    'btc_address' : IDL.Opt(IDL.Text),
  });
  const SubmitAssessmentParams = IDL.Record({
    'answers' : IDL.Vec(IDL.Nat64),
    'time_taken' : IDL.Nat64,
    'assessment_id' : IDL.Text,
  });
  const AssessmentResult = IDL.Record({
    'id' : IDL.Text,
    'answers' : IDL.Vec(IDL.Nat64),
    'user_id' : IDL.Principal,
    'time_taken' : IDL.Nat64,
    'score' : IDL.Nat64,
    'completed_at' : IDL.Nat64,
    'assessment_id' : IDL.Text,
    'passed' : IDL.Bool,
  });
  const SubmitAssessmentResult = IDL.Variant({
    'Ok' : AssessmentResult,
    'Err' : Error,
  });
  const UpdateProgressParams = IDL.Record({
    'module_id' : IDL.Text,
    'completed' : IDL.Bool,
    'course_id' : IDL.Text,
  });
  const UpdateSkillProgressParams = IDL.Record({
    'activity_type' : IDL.Text,
    'skill_id' : IDL.Text,
    'xp_gained' : IDL.Nat64,
  });
  const UpdateSkillProgressResult = IDL.Variant({
    'Ok' : UserSkill,
    'Err' : Error,
  });
  const UpdateUserParams = IDL.Record({
    'username' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'is_active' : IDL.Opt(IDL.Bool),
    'btc_address' : IDL.Opt(IDL.Text),
  });
  const ValidateAnswerParams = IDL.Record({
    'question' : IDL.Text,
    'user_answer' : IDL.Text,
    'expected_answer' : IDL.Text,
  });
  const ValidateAnswerResult = IDL.Variant({
    'Ok' : AIInteractionResponse,
    'Err' : Error,
  });
  return IDL.Service({
    'create_assessment' : IDL.Func(
        [CreateAssessmentParams],
        [CreateAssessmentResult],
        [],
      ),
    'create_bitcoin_reward' : IDL.Func(
        [CreateBitcoinRewardParams],
        [CreateBitcoinRewardResult],
        [],
      ),
    'create_course' : IDL.Func([CreateCourseParams], [CreateCourseResult], []),
    'create_skill' : IDL.Func([CreateSkillParams], [CreateSkillResult], []),
    'enroll_course' : IDL.Func([EnrollCourseParams], [EnrollCourseResult], []),
    'generate_course_content' : IDL.Func(
        [GenerateCourseContentParams],
        [GenerateCourseContentResult],
        [],
      ),
    'generate_nft_metadata' : IDL.Func(
        [GenerateNFTMetadataParams],
        [GenerateNFTMetadataResult],
        [],
      ),
    'get_assessment_by_id' : IDL.Func(
        [IDL.Text],
        [GetAssessmentResult],
        ['query'],
      ),
    'get_bitcoin_reward' : IDL.Func(
        [IDL.Text],
        [GetBitcoinRewardResult],
        ['query'],
      ),
    'get_course_by_id' : IDL.Func([IDL.Text], [GetCourseResult], ['query']),
    'get_greeting' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'get_skill_by_id' : IDL.Func([IDL.Text], [GetSkillResult], ['query']),
    'get_user_bitcoin_rewards' : IDL.Func(
        [IDL.Principal],
        [ListBitcoinRewardsResult],
        ['query'],
      ),
    'get_user_by_id' : IDL.Func([IDL.Text], [GetUserResult], ['query']),
    'get_user_count' : IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
    'get_user_skills' : IDL.Func(
        [GetUserSkillsParams],
        [ListUserSkillsResult],
        ['query'],
      ),
    'list_assessments' : IDL.Func(
        [ListAssessmentsParams],
        [ListAssessmentsResult],
        ['query'],
      ),
    'list_courses' : IDL.Func(
        [ListCoursesParams],
        [ListCoursesResult],
        ['query'],
      ),
    'list_skills' : IDL.Func([ListSkillsParams], [ListSkillsResult], ['query']),
    'list_users' : IDL.Func([ListUsersParams], [ListUsersResult], ['query']),
    'process_bitcoin_reward' : IDL.Func(
        [IDL.Text],
        [GetBitcoinRewardResult],
        [],
      ),
    'register_user' : IDL.Func([RegisterUserParams], [GetUserResult], []),
    'submit_assessment' : IDL.Func(
        [SubmitAssessmentParams],
        [SubmitAssessmentResult],
        [],
      ),
    'update_course_progress' : IDL.Func(
        [UpdateProgressParams],
        [EnrollCourseResult],
        [],
      ),
    'update_skill_progress' : IDL.Func(
        [UpdateSkillProgressParams],
        [UpdateSkillProgressResult],
        [],
      ),
    'update_user' : IDL.Func([UpdateUserParams], [GetUserResult], []),
    'validate_answer' : IDL.Func(
        [ValidateAnswerParams],
        [ValidateAnswerResult],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
