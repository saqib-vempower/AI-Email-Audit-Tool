export const ADVISORS = [
  { id: '1', name: 'Alice Johnson', avgScore: 4.8, evaluations: 124, trend: '+2%' },
  { id: '2', name: 'Bob Smith', avgScore: 4.2, evaluations: 98, trend: '-1%' },
  { id: '3', name: 'Charlie Davis', avgScore: 4.5, evaluations: 110, trend: '+5%' },
  { id: '4', name: 'Diana Prince', avgScore: 3.9, evaluations: 85, trend: '+1%' },
  { id: '5', name: 'Edward Norton', avgScore: 4.7, evaluations: 132, trend: '+3%' },
];

export const PERFORMANCE_TRENDS = [
  { month: 'Jan', grammar: 85, tone: 78, accuracy: 92, empathy: 88, compliance: 95 },
  { month: 'Feb', grammar: 88, tone: 82, accuracy: 90, empathy: 86, compliance: 94 },
  { month: 'Mar', grammar: 84, tone: 85, accuracy: 94, empathy: 90, compliance: 97 },
  { month: 'Apr', grammar: 90, tone: 88, accuracy: 95, empathy: 92, compliance: 98 },
  { month: 'May', grammar: 92, tone: 90, accuracy: 93, empathy: 95, compliance: 96 },
];

export const TEAM_PERFORMANCE = [
  { metric: 'Grammar', value: 88 },
  { metric: 'Tone', value: 85 },
  { metric: 'Accuracy', value: 92 },
  { metric: 'Empathy', value: 89 },
  { metric: 'Compliance', value: 96 },
];

export const RECENT_EVALUATIONS = [
  { id: 'ev1', advisor: 'Alice Johnson', score: 4.9, timestamp: '2h ago', status: 'Excellent' },
  { id: 'ev2', advisor: 'Bob Smith', score: 3.5, timestamp: '4h ago', status: 'Needs Improvement' },
  { id: 'ev3', advisor: 'Charlie Davis', score: 4.5, timestamp: '5h ago', status: 'Good' },
  { id: 'ev4', advisor: 'Edward Norton', score: 5.0, timestamp: '1d ago', status: 'Excellent' },
];