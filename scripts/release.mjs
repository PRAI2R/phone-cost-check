import {config} from '../src/config.mjs';
const errors=[];
let url;try{url=new URL(config.siteUrl);}catch{errors.push('SITE_URL에 실제 HTTPS 도메인이 필요합니다.');}
if(!url||url.protocol!=='https:'||/localhost|127\.0\.0\.1|example\.(com|org)|YOUR_/i.test(config.siteUrl)||url.pathname!=='/'||url.search||url.hash)errors.push('SITE_URL은 경로 없는 실제 HTTPS origin이어야 합니다. 하위 경로는 BASE_PATH에 입력하세요.');
if(!config.operator.trim())errors.push('운영자명: src/config.mjs 또는 SITE_OPERATOR를 설정하세요.');
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail))errors.push('문의 이메일: src/config.mjs 또는 CONTACT_EMAIL을 설정하세요.');
if(errors.length){console.error('공개 배포 설정 확인:\n'+errors.map(x=>'• '+x).join('\n'));process.exitCode=1;}else{await import('./build.mjs');await import('./check.mjs');console.log('공개 배포 파일을 dist/에 생성했습니다.');}
