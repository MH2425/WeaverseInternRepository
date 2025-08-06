(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();let l=[],a=[];const d=document.getElementById("description"),u=document.getElementById("value"),y=document.getElementById("incomebtn"),v=document.getElementById("expensesbtn"),p=document.getElementById("incomelist"),m=document.getElementById("expenseslist"),h=document.getElementById("display"),i=document.getElementById("speech-bubble"),b=document.getElementById("speech-text");document.addEventListener("DOMContentLoaded",()=>{y.addEventListener("click",()=>f(!0)),v.addEventListener("click",()=>f(!1))});function f(n){let t=d.value.trim(),r=parseFloat(u.value);if(isNaN(r)||r<=0){$();return}let o={value:r,description:t,isIncome:n};n?l.push(o):a.push(o),d.value="",u.value="",x()}function I(){p.innerHTML="",m.innerHTML="",l.forEach(n=>{const t=g(n);p.append(t)}),a.forEach(n=>{const t=g(n);m.append(t)})}function g(n){const t=document.createElement("li");return t.className="flex justify-between items-center p-2 mb-2 mr-2 bg-gray-100 rounded-lg",t.innerHTML=`
        <div>
            <span class="font-medium">${n.description}</span>
        </div>
        <div class="flex items-center gap-5">
            <span class="${n.isIncome?"text-green-600":"text-red-600"} font-bold">
                ${n.isIncome?"+":"-"}$${n.value.toFixed(2)}
            </span>
        </div>
    `,t}function E(){const n=l.reduce((e,s)=>e+s.value,0),t=a.reduce((e,s)=>e+s.value,0),r=n-t,o=r>=0?"text-green-400":"text-red-400";h.innerHTML=`
        <div class="text-center">
            <div class="text-2xl">Balance</div>
            <div class="${o} text-4xl font-bold">$${r.toFixed(2)}</div>
            <div class="text-lg mt-2">
                <span class="text-green-400">+$${n.toFixed(2)}</span> | 
                <span class="text-red-400">-$${t.toFixed(2)}</span>
            </div>
        </div>
    `,L(r,n,t)}function L(n,t,r){let o="",e="";t===0&&r===0?(o="Welcome!",e="bg-blue-100 border-blue-300"):n>0?(o="You are rich! $.$",e="bg-green-100 border-green-300"):(o="You are poor! T.T",e="bg-red-100 border-red-300"),b.textContent=o,i.className=`absolute top-4 right-4 rounded-lg 
        p-3 shadow-lg max-w-xs transition-all duration-300 ${e}`,i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},3e3)}function $(){let n="Invalid input!",t="bg-red-100 border-red-300";b.textContent=n,i.className=`absolute top-4 right-4 rounded-lg 
        p-3 shadow-lg max-w-xs transition-all duration-300 ${t}`,i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},3e3)}function x(){I(),E()}x();
