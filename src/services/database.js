import { supabase } from './customClient';

const CORRECT_ANSWERS = {
  'media_1': 'Real',
  'media_2': 'AI',
  'media_3': 'AI',
  'media_4': 'Real',
  'media_5': 'Real',
  'media_6': 'AI'
};

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export async function createUser(userData) {
  const userId = `user_${generateId()}`;
  const userAge = userData.age;
  
  const { data: existingRows } = await supabase
    .from('choice')
    .select('*')
    .eq('age', userAge);

  if (!existingRows?.length) {
    const initialData = {
      questions: Array(5).fill({ incorrect_value: 0, correct_value: 0 })
    };

    await supabase
      .from('choice')
      .insert([{ age: userAge, data: initialData }]);
  }

  const userInfo = {
    userId,
    age: userAge,
    createdAt: new Date().toISOString()
  };
  
  sessionStorage.setItem(`user:${userId}`, JSON.stringify(userInfo));
  return userId;
}

export async function getUser(userId) {
  const userStr = sessionStorage.getItem(`user:${userId}`);
  return userStr ? JSON.parse(userStr) : null;
}

export async function submitResponse(responseData) {
  const user = await getUser(responseData.userId);
  const userAge = user?.age;

  const { data: existingRows } = await supabase
    .from('choice')
    .select('*')
    .eq('age', userAge);

  const mediaIndex = parseInt(String(responseData.mediaId).replace(/media_?/g, '')) - 1;
  const isCorrect = responseData.userAnswer === CORRECT_ANSWERS[responseData.mediaId];

  if (existingRows?.length) {
    const existingRow = existingRows[0];
    const currentData = existingRow.data || { questions: [] };
    const currentWhy = existingRow.why || [];
    
    currentData.questions = currentData.questions || [];
    while (currentData.questions.length < 5) {
      currentData.questions.push({ incorrect_value: 0, correct_value: 0 });
    }

    const question = currentData.questions[mediaIndex] || { incorrect_value: 0, correct_value: 0 };
    currentData.questions[mediaIndex] = {
      incorrect_value: question.incorrect_value + (isCorrect ? 0 : 1),
      correct_value: question.correct_value + (isCorrect ? 1 : 0)
    };

    const updatedWhy = [...currentWhy, responseData.reasoning];

    await supabase
      .from('choice')
      .update({ 
        data: currentData,
        why: updatedWhy
      })
      .eq('id', existingRow.id);
  } else {
    const newData = {
      questions: Array(5).fill({ incorrect_value: 0, correct_value: 0 })
    };
    newData.questions[mediaIndex] = {
      incorrect_value: isCorrect ? 0 : 1,
      correct_value: isCorrect ? 1 : 0
    };

    await supabase
      .from('choice')
      .insert([{ 
        age: userAge, 
        data: newData,
        why: [responseData.reasoning]
      }]);
  }

  const responseId = `resp_${generateId()}`;
  sessionStorage.setItem(`response:${responseId}`, JSON.stringify({
    responseId,
    userId: responseData.userId,
    mediaId: responseData.mediaId,
    userAnswer: responseData.userAnswer,
    reasoning: responseData.reasoning,
    createdAt: new Date().toISOString()
  }));

  return responseId;
}

export async function getUserResponses(userId) {
  const userResponses = [];
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith('response:')) {
      const response = JSON.parse(sessionStorage.getItem(key));
      if (response.userId === userId) {
        userResponses.push(response);
      }
    }
  }
  
  return userResponses;
}

export async function getStatistics(mediaId) {
  const allUsers = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith('user:')) {
      allUsers.push(JSON.parse(sessionStorage.getItem(key)));
    }
  }

  if (!allUsers.length) {
    return {
      mediaId,
      totalResponses: 0,
      correctCount: 0,
      incorrectCount: 0,
      percentageReal: 50,
      percentageAI: 50
    };
  }

  const currentUser = allUsers[allUsers.length - 1];
  const { data } = await supabase
    .from('choice')
    .select('data')
    .eq('age', currentUser.age)
    .single();

  const mediaIndex = parseInt(String(mediaId).replace(/media_?/g, '')) - 1;
  
  if (data?.data?.questions?.[mediaIndex]) {
    const q = data.data.questions[mediaIndex];
    const correct = q.correct_value || 0;
    const incorrect = q.incorrect_value || 0;
    const total = correct + incorrect;

    return {
      mediaId,
      totalResponses: total,
      correctCount: correct,
      incorrectCount: incorrect,
      percentageReal: total > 0 ? Math.round((correct / total) * 100) : 50,
      percentageAI: total > 0 ? Math.round((incorrect / total) * 100) : 50
    };
  }

  return {
    mediaId,
    totalResponses: 0,
    correctCount: 0,
    incorrectCount: 0,
    percentageReal: 50,
    percentageAI: 50
  };
}

export async function getAllStatistics() {
  const { data } = await supabase.from('choice').select('*');
  return data || [];
}

export async function getAllResponsesWithReasons() {
  const { data } = await supabase
    .from('choice')
    .select('age, why')
    .order('age', { ascending: true });
  
  return data || [];
}

export async function clearAllData() {
  sessionStorage.clear();
}

export async function exportAllData() {
  const { data: supabaseData } = await supabase.from('choice').select('*');
  const users = [];
  const responses = [];
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = JSON.parse(sessionStorage.getItem(key));
      if (key.startsWith('user:')) users.push(value);
      else if (key.startsWith('response:')) responses.push(value);
    }
  }
  
  return { 
    users, 
    responses, 
    statistics: supabaseData || []
  };
}