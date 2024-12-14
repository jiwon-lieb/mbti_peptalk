// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * Helper function to select a random element from an array.
 * @param {Array} array 
 * @returns Random element from the array
 */
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * MBTI-based pep talk collections
 */
const mbtiPepTalks = {
  "INTJ": ["완벽함을 추구하는 건 좋지만, 영원히 계획만 세우다 끝날 수 있어.", "감정적으로 피드백을 받지 말고, 논리적으로 분석하세요."],
  "ENTP": ["아이디어가 아무리 많아도 실행하지 않으면 무의미합니다.", "모든 아이디어가 다 좋은 건 아닙니다. 걸러내는 능력도 필요합니다."],
  "INFJ": ["모든 사람을 구원할 수는 없습니다. 자신부터 챙기세요.", "완벽함에 집착하지 마세요. 충분히 잘하고 있습니다."],
  "ENTJ": ["모든 걸 통제할 수는 없습니다. 유연함도 전략입니다.", "당신의 비전이 타인의 비전과 다를 수 있음을 인정하세요."],
  "INFP": ["너의 감정도 소중하다는 걸 잊지 마세요.", "세상을 바꾸고 싶다면, 우선 자신의 에너지를 관리하세요."],
  "ENFP": ["모든 걸 시도할 순 없습니다. 선택과 집중이 필요합니다.", "열정도 좋지만, 지속 가능한 에너지로 바꾸세요."],
  "ISFP": ["예술적 감각이 뛰어나지만, 때로는 결과물이 필요합니다.", "지나치게 조용하다고 해서 당신의 가치는 낮아지지 않습니다."],
  "ESFP": ["즐거움도 좋지만, 때로는 계획이 필요합니다.", "즉흥적으로 모든 문제를 해결할 순 없습니다. 미리 준비하세요."],
  "INTP": ["지식이 아무리 많아도 행동이 없다면 무의미합니다.", "논리의 함정에 빠지지 마세요. 실천이 더 중요합니다."],
  "ENTP": ["말이 많다고 아이디어가 좋은 건 아닙니다.", "끊임없이 새로움을 추구하다가 아무것도 완성하지 못할 수 있습니다."],
  "ISFJ": ["누군가를 돕는 것도 좋지만, 스스로를 먼저 돌보세요.", "과도한 책임감이 당신을 지치게 할 수 있습니다."],
  "ESFJ": ["모두를 만족시키려다 아무도 만족시키지 못할 수 있습니다.", "당신의 필요도 중요합니다. 남을 돕기 전에 자신을 돌보세요."],
  "ISTJ": [
    "지금 멈추는 건, '나 포기했어요'라고 외치는 거랑 같아. 진짜 그럴 거야?",
    "모든 규칙을 지키는 사람도 가끔은 규칙을 바꿀 자격이 있어. 너라면 가능해.",
    "너의 책임감은 인간계의 신뢰의 상징이야. 지금 포기하면 신화를 부숴버리는 거라고!",
    "네가 지금 겪고 있는 어려움은 미래에 '전설의 챕터'로 남을 거야. 그냥 해내.",
    "누가 뭐래도 네가 하는 일이 가장 정확하고 빠르다는 걸, 넌 이미 알고 있잖아.",
    "평생 실수 안 하는 사람은 없어. 근데 넌 이미 그 실수의 확률이 0.001%야. 천재 수준이라고.",
    "남들이 뭐라고 하든, 넌 끝까지 책임을 지는 사람이야. 그게 바로 '클래스 차이'라는 거야.",
    "혼자 다 하려 하지 마. 그건 '영웅 서사'에서나 나오는 거야. 지금은 팀플이야.",
    "완벽을 추구하는 건 좋지만, 99%도 세상에선 완벽으로 통한다고!",
    "한 번 해보자. 어차피 넌 그걸 끝까지 해낼 사람인 거 다 알아.",
    "ISTJ한테 '포기'라는 단어를 꺼내는 건 욕하는 거랑 똑같아. 알지?",
    "논리는 네 무기야. 근데 가끔은 '감정적 논리'가 더 빠르다.",
    "너는 '마감의 신'이잖아. 마감을 이긴 사람은 항상 승리하는 법이야.",
    "지금 네가 만든 이 시스템은 100년 뒤에도 돌아갈 거야. 그만큼 완벽해.",
    "지금 너무 힘들지? 그럼 잠깐 쉬어도 돼. 단, '쉬는 것도 계획에 포함시킨다'는 조건으로.",
    "실수했다고? 그럼 뭐? 그걸 고칠 사람은 '너뿐'이니까 더 멋진 거야.",
    "책임감이 너무 크다고? 맞아, 그 책임은 '레전드'에게만 주어지는 특권이거든.",
    "하던 거 멈추고 싶은 마음 들지? 그럼 이렇게 생각해: '이걸 끝내면 나는 전설이 된다.'",
    "누가 뭐래도 너만큼 똑부러지게 처리할 사람은 없어. 그게 '팩트'야.",
    "어려움은 전설의 서사에 필수 요소야. 어려움 없이 이기는 이야기는 다들 잊어버려.",
    "네가 만든 그 엑셀 파일? 그건 예술 작품이야. 다시 봐도 완벽해.",
    "사소한 디테일 하나에 목숨 거는 네 성격이? 사실 그게 네 슈퍼파워야.",
    "너는 '기록의 달인'이잖아. 과거 기록들을 다 기억하는 게 얼마나 대단한 능력인지 아냐?",
    "한 번이라도 네가 일을 대충 하는 걸 본 적 있냐? 없다. 그게 너의 클래스야.",
    "모두가 뒤돌아봐도 넌 똑같이 앞으로만 가잖아. 그게 승자의 자세다.",
    "다들 그냥 대충할 때, 넌 '표준 절차'를 만들어냈어. 그게 진짜 프로야.",
    "너는 실패할 확률이 0.01%야. 다른 사람은 50%거든. 그게 레벨 차이야.",
    "어제보다 오늘이 더 성장한 이유는 네가 절대 하루도 대충 보내지 않기 때문이야.",
    "완벽하지 않아도 돼. 하지만 넌 항상 99% 완벽하니까 괜찮아.",
    "누가 뭐래도 '한 번에 제대로 하는 사람'은 너밖에 없을걸?",
    "다들 '이건 못할 것 같아' 할 때, 넌 이미 해내고 있었지. 그게 차이야.",
    "리더 없이도 팀을 굴러가게 만드는 사람? 바로 너야.",
    "힘들 땐 '완벽할 필요 없다'고 생각해. 하지만 너는 어차피 완벽하게 해내잖아.",
    "책임을 회피하지 않는 건, 어쩌면 네가 가진 가장 위대한 능력일지도 몰라.",
    "모두가 잠들었을 때 혼자 일하는 그 모습? 전설의 시작이었어.",
    "네가 아니면 누가 이 일을 하겠어? 진짜로, 그 누가? 없잖아.",
    "언젠가 'ISTJ 전설'이라는 책이 나오면, 1장에 네 이름이 들어갈 거야.",
    "실수했다고 걱정할 필요 없어. 넌 항상 더 나은 버전을 만드는 사람이니까.",
    "힘들 때 떠올려. 지금까지 해온 모든 일이 다 '완벽한 결과물'이었다는 걸.",
    "어쩌면 네 인생 자체가 '절차의 교과서'일지도 몰라. 그 정도로 대단해.",
    "조용히 묵묵히 일하는 사람들이 제일 강한 법이야. 너처럼 말이야.",
    "누구보다 꼼꼼하고 정확한 너의 능력 덕분에 다들 안심하고 있어.",
    "너는 끝까지 책임지는 사람의 상징이야. 사람들은 그걸 절대 잊지 않아.",
    "완벽주의자라고 불리는 게 가끔 부담스러울 수 있어. 하지만 그건 네 능력에 대한 찬사야.",
    "모두가 쉽게 포기할 때, 넌 이미 10단계 앞서 있었지. 그게 차이지.",
    "기록, 절차, 시스템. 이 모든 걸 다루는 천재가 누구야? 바로 너지.",
    "100명 중 1명만 할 수 있는 일을 하는 사람은 특별한 거야. 너처럼.",
    "어떤 시스템을 맡겨도 네 손을 거치면 '완벽한 매뉴얼'이 나와.",
    "누군가 '이걸 해낼 사람은 없어'라고 말할 때, 넌 이미 해내고 있어.",
    "책임지는 사람은 많지 않아. 근데 넌 그걸 매일 해내고 있어.",
    "모든 팀에는 최소 1명의 ISTJ가 필요해. 그게 없으면 다 무너져.",
    "100가지 변명이 있어도 넌 단 하나의 행동으로 해결하는 사람이야.",
    "모두가 '대충 해'라고 말할 때, 넌 '대충'이 뭔지도 몰라.",
    "네가 고쳐놓은 시스템은 아무도 손댈 필요가 없어. 그만큼 완벽해.",
    "모두가 '이건 불가능해'라고 할 때, 넌 '시도해보자'라고 말하는 사람이야.",
    "팀에서 없어지면 제일 먼저 티 나는 사람? 너지. 그만큼 중요한 사람이야.",
    "모두가 포기했어도, 넌 묵묵히 끝까지 해냈어. 그게 승자의 자질이야.",
    "지금 힘들어도, 그걸 이겨내는 과정이 바로 '레전드의 서사'야.",
    "네가 만든 기록물, 절차서, 매뉴얼은 후세에게 전해질 거야.",
    "모두가 쉬고 있을 때도, 넌 다음 단계를 고민하고 있었어.",
    "어려울 때일수록 너의 진가가 드러나. 그게 ISTJ의 법칙이야."],
  "ESTJ": ["리더십은 통제가 아니라 영감을 주는 것입니다.", "강한 의견을 가질 수 있지만, 경청도 중요한 능력입니다."],
  "ISTP": ["문제를 해결하는 것도 좋지만, 사람의 감정도 고려하세요.", "항상 독립적으로만 행동할 수는 없습니다."],
  "ESTP": ["즉흥적으로 행동하는 것도 좋지만, 장기적인 목표도 생각하세요.", "행동이 빠르다고 항상 더 나은 것은 아닙니다."]
};

// Route for MBTI pep talks
app.get('/api/peptalk/:mbti', (req, res) => {
  const { mbti } = req.params;
  const mbtiUpper = mbti.toUpperCase();
  if (!mbtiPepTalks[mbtiUpper]) {
    return res.status(404).json({ error: 'MBTI type not found' });
  }
  const randomPepTalk = getRandomElement(mbtiPepTalks[mbtiUpper]);
  res.json({ 
    type: mbtiUpper, 
    message: randomPepTalk 
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send(`
    <h1>🌟 Welcome to the MBTI Pep Talk API! 🌟</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/api/peptalk/INTJ">/api/peptalk/INTJ</a> - Logical, INTJ pep talk</li>
      <li><a href="/api/peptalk/ENTP">/api/peptalk/ENTP</a> - Bold, ENTP pep talk</li>
      <li><a href="/api/peptalk/INFJ">/api/peptalk/INFJ</a> - Deep, INFJ pep talk</li>
      <li><a href="/api/peptalk/ENTJ">/api/peptalk/ENTJ</a> - Leader, ENTJ pep talk</li>
      <li><a href="/api/peptalk/INFP">/api/peptalk/INFP</a> - Dreamer, INFP pep talk</li>
      <li><a href="/api/peptalk/ENFP">/api/peptalk/ENFP</a> - Enthusiast, ENFP pep talk</li>
      <li><a href="/api/peptalk/ISFP">/api/peptalk/ISFP</a> - Artist, ISFP pep talk</li>
      <li><a href="/api/peptalk/ESFP">/api/peptalk/ESFP</a> - Performer, ESFP pep talk</li>
      <li><a href="/api/peptalk/INTP">/api/peptalk/INTP</a> - Thinker, INTP pep talk</li>
      <li><a href="/api/peptalk/ISFJ">/api/peptalk/ISFJ</a> - Defender, ISFJ pep talk</li>
      <li><a href="/api/peptalk/ESFJ">/api/peptalk/ESFJ</a> - Caregiver, ESFJ pep talk</li>
      <li><a href="/api/peptalk/ISTJ">/api/peptalk/ISTJ</a> - Logistician, ISTJ pep talk</li>
      <li><a href="/api/peptalk/ESTJ">/api/peptalk/ESTJ</a> - Executive, ESTJ pep talk</li>
      <li><a href="/api/peptalk/ISTP">/api/peptalk/ISTP</a> - Virtuoso, ISTP pep talk</li>
      <li><a href="/api/peptalk/ESTP">/api/peptalk/ESTP</a> - Entrepreneur, ESTP pep talk</li>
    </ul>
    <p>Replace the MBTI type in the URL to see the advice for that type.</p>
  `);
});

// Start the server
// export const handler = serverless(api);
module.exports.handler = serverless(app);