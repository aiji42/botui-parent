import { serviceCode } from '../settings';

const script = document.createElement('script');
script.textContent = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayerBotuiParent','GTM-KB5R8M2');
dataLayerBotuiParent.push({
  serviceCode: '${serviceCode}',
  stage: '${process.env.NODE_ENV}'
});
`;
document.head.appendChild(script);

const noScript = document.createElement('noscript');
noScript.innerHTML = `
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KB5R8M2"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
`;
document.body.insertBefore(noScript, document.body.firstChild);

export const dataLayerBotui = window.dataLayerBotuiParent;