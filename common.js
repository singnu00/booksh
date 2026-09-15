/*
  우리 반 책장 - 공통 스크립트
  index.html, login.html 에서 함께 사용해요.
  (mypage.html은 아직 수정하지 않았어요.)
*/

const LS_BOOKS = 'rk_books';
const LS_FAV = 'rk_favorites';
const LS_PW = 'rk_admin_pw';           // 관리자 비밀번호
const LS_STUDENT_PW = 'rk_student_pw'; // 학생/선생님 공용 로그인 비밀번호
const LS_MEMBERS = 'rk_members';       // 회원(학생/선생님) 목록
const LS_LOGGED_IN = 'rk_logged_in';   // 관리자 로그인 여부
const LS_CURRENT_MEMBER = 'rk_current_member'; // 지금 로그인한 학생/선생님

const DEFAULT_ADMIN_PW = '1357';
const DEFAULT_STUDENT_PW = '0000'; // 임시 기본값이에요. 실제 값 알려주시면 바꿔드릴게요.

(function seedDefaults(){
  try{
    if(!localStorage.getItem(LS_PW)) localStorage.setItem(LS_PW, DEFAULT_ADMIN_PW);
    if(!localStorage.getItem(LS_STUDENT_PW)) localStorage.setItem(LS_STUDENT_PW, DEFAULT_STUDENT_PW);
    if(!localStorage.getItem(LS_MEMBERS)) localStorage.setItem(LS_MEMBERS, JSON.stringify([]));
  }catch(e){}
})();

function loadMembers(){
  try{ const raw = localStorage.getItem(LS_MEMBERS); if(raw) return JSON.parse(raw); }catch(e){}
  return [];
}
function saveMembers(list){
  try{ localStorage.setItem(LS_MEMBERS, JSON.stringify(list)); }catch(e){}
}
function findApprovedMember(name, id){
  return loadMembers().find(m => m.approved && m.name === name && (m.role === 'teacher' || m.id === id));
}
function findExistingApplicant(role, name, id){
  return loadMembers().find(m => m.role === role && m.name === name && (role === 'teacher' || m.id === id));
}
function getCurrentMember(){
  try{ const raw = localStorage.getItem(LS_CURRENT_MEMBER); if(raw) return JSON.parse(raw); }catch(e){}
  return null;
}
function setCurrentMember(member){
  try{ localStorage.setItem(LS_CURRENT_MEMBER, JSON.stringify(member)); }catch(e){}
}
function clearCurrentMember(){
  try{ localStorage.removeItem(LS_CURRENT_MEMBER); }catch(e){}
}
