(()=>{function t(t,i){let n=t.i.t();for(let e of i)e(t,n);return n}function i(t,i,n){let e=t.createShader(i);return t.shaderSource(e,n),t.compileShader(e),e}function n(t,i,n){let e=i[0],o=i[1],r=i[2],s=i[3],h=i[4],a=i[5],u=i[6],c=i[7],l=i[8],f=i[9],d=i[10],g=i[11],p=i[12],m=i[13],w=i[14],v=i[15],_=n[0],x=n[1],y=n[2],k=n[3];return t[0]=_*e+x*h+y*l+k*p,t[1]=_*o+x*a+y*f+k*m,t[2]=_*r+x*u+y*d+k*w,t[3]=_*s+x*c+y*g+k*v,_=n[4],x=n[5],y=n[6],k=n[7],t[4]=_*e+x*h+y*l+k*p,t[5]=_*o+x*a+y*f+k*m,t[6]=_*r+x*u+y*d+k*w,t[7]=_*s+x*c+y*g+k*v,_=n[8],x=n[9],y=n[10],k=n[11],t[8]=_*e+x*h+y*l+k*p,t[9]=_*o+x*a+y*f+k*m,t[10]=_*r+x*u+y*d+k*w,t[11]=_*s+x*c+y*g+k*v,_=n[12],x=n[13],y=n[14],k=n[15],t[12]=_*e+x*h+y*l+k*p,t[13]=_*o+x*a+y*f+k*m,t[14]=_*r+x*u+y*d+k*w,t[15]=_*s+x*c+y*g+k*v,t}function e(t,i=[.9,.9,.9,1],n=16640){return(e,o)=>{e.i.o[o]|=1,e.i.h[o]={u:0,l:t,g:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],p:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],m:[0,0,0],v:i,_:t.k,M:i,T:n}}}function o(t,i,n,e){let o=Math.sin(n),r=Math.cos(n);return t[0]=r*e[0],t[1]=o*e[0],t[2]=-o*e[1],t[3]=r*e[1],t[4]=i[0],t[5]=i[1],t}function r(t,i){return t[0]=i[4],t[1]=i[5],t}function s(t,i){return t[0]=i[0],t[1]=i[1],t}function h(t,i,n){return t[0]=i[0]+n[0],t[1]=i[1]+n[1],t}function a(t,i,n){return t[0]=i[0]-n[0],t[1]=i[1]-n[1],t}function u(t,i,n){return t[0]=i[0]*n,t[1]=i[1]*n,t}function c(t,i){let n=i[0],e=i[1],o=n*n+e*e;return o>0&&(o=1/Math.sqrt(o)),t[0]=i[0]*o,t[1]=i[1]*o,t}function l(t,i){return Math.hypot(i[0]-t[0],i[1]-t[1])}function f(t,i){let n=t.i.F[i],e=t.i.C[i];n.I&&(e.I[0]=n.I[0],e.I[1]=n.I[1],t.i.o[i]|=32),n.P&&(e.P=n.P,t.i.o[i]|=32)}function d(t,i){let n=t.i.S[i];t.$.Mouse0>5&&(n.R[0]-=t.X.MouseX/t.Y,n.R[1]+=t.X.MouseY/t.Y,t.i.o[i]|=32)}function g(t,i,n){let e=t.i.S[i],o=t.i.C[i];if(o.I[0]||o.I[1]){N[0]=o.I[0],N[1]=o.I[1];let i=Math.min(1,Math.hypot((r=N)[0],r[1]));(function(t,i,n){let e=i[0],o=i[1];t[0]=n[0]*e+n[2]*o,t[1]=n[1]*e+n[3]*o})(N,N,void 0!==e.D?t.i.S[e.D].A:e.i),c(N,N),u(N,N,i*o.V*n),h(e.R,e.R,N),o.I[0]=0,o.I[1]=0}var r;o.P&&(e.P+=o.P*o.U*n,o.P=0)}function p(t=0,i=1){return((O=16807*O%2147483647)-1)/2147483646*(i-t)+t}function m(t,i){return(n,e)=>{n.i.o[e]|=512,n.i.W[e]={u:t,j:i,K:[0,0],N:[0,0],O:[0,0]}}}function w(t,i,n){let e=t.i.S[i],o=t.i.W[i];if(1===o.u){let i=-t.q/t.Y/2,n=-t.G/t.Y/2;e.R[1]<i&&(e.R[1]=i,o.O[0]=p(-3,3),o.O[1]*=p(-1.1,-1)),e.R[0]<n&&(e.R[0]=n,o.O[0]*=-1),e.R[0]>-n&&(e.R[0]=-n,o.O[0]*=-1)}}function v(t,i,n){let e=t.i.S[i],o=t.i.W[i];if(1===o.u){s(o.N,o.O),o.N[1]+=-9.81*n,u(o.K,o.K,n),h(o.N,o.N,o.K),u(o.N,o.N,o.j);let a=[0,0];u(a,o.N,n),h(e.R,e.R,a),t.i.o[i]|=32,(r=o.K)[0]=0,r[1]=0}var r}function _(t,i){let n=t.i.S[i],e=t.i.W[i],o=t.i.H[i];if(1===e.u&&o.L)if(null!==o.B&&512&t.i.o[o.B]){u(q,o.J,o.Z),h(n.R,n.R,q),t.i.o[i]|=32;let s=(r=e.N)[0]*(a=o.J)[0]+r[1]*a[1];u(G,o.J,-s*t.i.W[o.B].j),h(e.O,e.N,G)}else s(e.O,e.N);var r,a}function x(t,i){let n=t.tt,e=t.it["spritesheet.png"];t.nt.useProgram(n.et),t.nt.uniformMatrix4fv(n.ot.p,!1,i.p),t.nt.activeTexture(33984),t.nt.bindTexture(S,e.rt),t.nt.uniform1i(n.ot.st,0),t.nt.uniform2f(n.ot.ht,e.ut,e.ct),t.nt.bindBuffer(P,t.lt),t.nt.bufferData(P,t.ft,35040),t.nt.drawArraysInstanced(n.dt,0,4,t.i.o.length)}function y(t,i){for(let i=0;i<t.i.o.length;i++)1056==(1056&t.i.o[i])&&k(t.i,i,t.i.S[i])}function k(t,i,n){if(t.o[i]&=-33,o(n.i,n.R,n.P*H,n.gt),void 0!==n.D&&(function(t,i,n){let e=i[0],o=i[1],r=i[2],s=i[3],h=i[4],a=i[5],u=n[0],c=n[1],l=n[2],f=n[3],d=n[4],g=n[5];t[0]=e*u+r*c,t[1]=o*u+s*c,t[2]=e*l+r*f,t[3]=o*l+s*f,t[4]=e*d+r*g+h,t[5]=o*d+s*g+a}(n.i,t.S[n.D].i,n.i),n.Gyroscope&&(r(L,n.i),o(n.i,L,n.P*H,n.gt))),function(t,i){let n=i[0],e=i[1],o=i[2],r=i[3],s=i[4],h=i[5],a=n*r-e*o;a&&(a=1/a,t[0]=r*a,t[1]=-e*a,t[2]=-o*a,t[3]=n*a,t[4]=(o*h-r*s)*a,t[5]=(e*s-n*h)*a)}(n.A,n.i),16&t.o[i]){let n=t.wt[i];for(let e=0;e<n.wt.length;e++){let o=n.wt[e];if(1024&t.o[o]){let n=t.S[o];n.D=i,k(t,o,n)}}}}function M(t,i,n,e){let o=~~(6*t),r=6*t-o,s=n*(1-i),h=n*(1-r*i),a=n*(1-(1-r)*i);switch(o%6){case 0:return[n,a,s,e];case 1:return[h,n,s,e];case 2:return[s,n,a,e];case 3:return[s,h,n,e];case 4:return[a,s,n,e];default:return[n,s,h,e]}}function b(t){return(i,n)=>{i.i.o[n]|=2,i.i.H[n]={vt:n,L:!0,_t:t/2,xt:[0,0],B:null,J:[0,0],Z:0}}}function T(t){return(i,n)=>{i.i.o[n]|=2,i.i.H[n]={vt:n,L:!1,_t:t/2,xt:[0,0]}}}function z(t,i=[1,1,1,1]){return(n,e)=>{let o=e*B;n.ft[o+6]=0,n.ft[o+7]=1,n.ft[o+8]=i[0],n.ft[o+9]=i[1],n.ft[o+10]=i[2],n.ft[o+11]=i[3],n.ft[o+12]=dt[t+".png"].x,n.ft[o+13]=dt[t+".png"].y,n.ft[o+14]=dt[t+".png"].width,n.ft[o+15]=dt[t+".png"].height,n.i.o[e]|=256,n.i.yt[e]={kt:n.ft.subarray(o+6,o+8),Mt:n.ft.subarray(o+8,o+12),bt:n.ft.subarray(o+12,o+16)}}}function F(t){return(i,n)=>{i.ft[n*B+6]=t}}function C(t=[0,0],i=0,n=[1,1]){return(e,o)=>{e.i.o[o]|=1056,e.i.S[o]={i:e.ft.subarray(o*B,o*B+6),A:[1,0,0,1,0,0],R:t,P:i,gt:n,Gyroscope:!1}}}var I=Object.defineProperty,P=34962,S=3553,$=5126,R=document.getElementById("update"),X=document.getElementById("delta"),Y=document.getElementById("fps"),D=1/60,A=class extends class{constructor(t=1e4){this.o=[],this.Tt=[],this.zt=t}t(){return this.Tt.length>0?this.Tt.pop():this.o.push(0)-1}Ft(t){this.o[t]=0,this.Tt.push(t)}}{constructor(){super(...arguments),this.h=[],this.H=[],this.F=[],this.Ct=[],this.wt=[],this.C=[],this.yt=[],this.W=[],this.S=[]}},E=1026,V=0,U=[0,0],W=[0,0],j=[0,0],K=[0,0,0,0],N=[0,0],O=1,q=[0,0],G=[0,0],H=Math.PI/180,L=[0,0],B=16,J=4*B,Q=Float32Array.from([-.5,-.5,0,0,1,.5,-.5,0,1,1,-.5,.5,0,0,0,.5,.5,0,1,0]),Z={};((t,i)=>{for(var n in i)I(t,n,{get:i[n],enumerable:!0})})(Z,{default:()=>ft,"garnek11.png":()=>tt,"garnek12.png":()=>it,"garnek13.png":()=>nt,"garnek14.png":()=>et,"garnek21.png":()=>ot,"garnek22.png":()=>rt,"garnek23.png":()=>st,"garnek24.png":()=>ht,"sloik.png":()=>at,"ziemniak_gibs.png":()=>ut,"ziemniak_obrany.png":()=>ct,"ziemniak_surowy.png":()=>lt});var tt={x:0,y:0,width:128,height:96},it={x:128,y:0,width:128,height:96},nt={x:0,y:96,width:128,height:96},et={x:128,y:96,width:128,height:96},ot={x:256,y:0,width:128,height:96},rt={x:256,y:96,width:128,height:96},st={x:0,y:192,width:128,height:96},ht={x:128,y:192,width:128,height:96},at={x:256,y:192,width:64,height:64},ut={x:320,y:192,width:32,height:32},ct={x:352,y:192,width:32,height:32},lt={x:320,y:224,width:32,height:32},ft={"garnek11.png":tt,"garnek12.png":it,"garnek13.png":nt,"garnek14.png":et,"garnek21.png":ot,"garnek22.png":rt,"garnek23.png":st,"garnek24.png":ht,"sloik.png":at,"ziemniak_gibs.png":ut,"ziemniak_obrany.png":ct,"ziemniak_surowy.png":lt},dt=Z,gt=new class extends class extends class{constructor(){this.It=0,this.Pt=0,this.G=window.innerWidth,this.q=window.innerHeight,this.St=!0,this.$t={MouseX:0,MouseY:0},this.X={MouseX:0,MouseY:0,WheelY:0},this.$={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.Rt={},this.Xt=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.Yt():this.Dt())),this.Xt.addEventListener("contextmenu",(t=>t.preventDefault())),this.Xt.addEventListener("mousedown",(t=>{this.$t["Mouse"+t.button]=1,this.X["Mouse"+t.button]=1})),this.Xt.addEventListener("mouseup",(t=>{this.$t["Mouse"+t.button]=0,this.X["Mouse"+t.button]=-1})),this.Xt.addEventListener("mousemove",(t=>{this.X.MouseX=t.clientX-this.$t.MouseX,this.X.MouseY=t.clientY-this.$t.MouseY,this.$t.MouseX=t.clientX,this.$t.MouseY=t.clientY})),this.Xt.addEventListener("wheel",(t=>{t.preventDefault(),this.X.WheelY=t.deltaY})),this.Xt.addEventListener("touchstart",(t=>{t.target===this.Xt&&t.preventDefault(),1===t.touches.length&&(this.Rt={});for(let i=0;i<t.touches.length;i++)this.Rt[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.Rt[n.identifier];this.$t["Touch"+e]=1,this.$t[`Touch${e}X`]=n.clientX,this.$t[`Touch${e}Y`]=n.clientY,this.X["Touch"+e]=1,this.X[`Touch${e}X`]=0,this.X[`Touch${e}Y`]=0}})),this.Xt.addEventListener("touchmove",(t=>{t.target===this.Xt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=t.changedTouches[i],e=this.Rt[n.identifier];this.X[`Touch${e}X`]=n.clientX-this.$t[`Touch${e}X`],this.X[`Touch${e}Y`]=n.clientY-this.$t[`Touch${e}Y`],this.$t[`Touch${e}X`]=n.clientX,this.$t[`Touch${e}Y`]=n.clientY}})),this.Xt.addEventListener("touchend",(t=>{t.target===this.Xt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let n=this.Rt[t.changedTouches[i].identifier];this.$t["Touch"+n]=0,this.X["Touch"+n]=-1}})),this.Xt.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let n=this.Rt[t.changedTouches[i].identifier];this.$t["Touch"+n]=0,this.X["Touch"+n]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.$t[t.code]=1,this.X[t.code]=1)})),window.addEventListener("keyup",(t=>{this.$t[t.code]=0,this.X[t.code]=-1}))}Dt(){let t=0,i=performance.now(),n=e=>{let o=(e-i)/1e3;for(i=e,this.It=requestAnimationFrame(n),this.At(o),t+=o;t>=D;)t-=D,this.Et(D),this.Vt();this.Ut(o),this.Wt(o)};this.Yt(),n(i)}Yt(){cancelAnimationFrame(this.It),this.It=0}At(t){this.Pt=performance.now();let i=Math.abs(this.X.MouseX)+Math.abs(this.X.MouseY);this.$.Mouse+=i,1===this.$t.Mouse0&&(this.$.Mouse0+=i),1===this.$t.Mouse1&&(this.$.Mouse1+=i),1===this.$t.Mouse2&&(this.$.Mouse2+=i),1===this.$t.Touch0&&(this.$.Touch0+=Math.abs(this.X.Touch0X)+Math.abs(this.X.Touch0Y)),1===this.$t.Touch1&&(this.$.Touch1+=Math.abs(this.X.Touch1X)+Math.abs(this.X.Touch1Y))}Et(t){}Ut(t){}Vt(){-1===this.X.Mouse0&&(this.$.Mouse0=0),-1===this.X.Mouse1&&(this.$.Mouse1=0),-1===this.X.Mouse2&&(this.$.Mouse2=0),-1===this.X.Touch0&&(this.$.Touch0=0),-1===this.X.Touch1&&(this.$.Touch1=0);for(let t in this.X)this.X[t]=0}Wt(t){this.St=!1;let i=performance.now()-this.Pt;R&&(R.textContent=i.toFixed(1)),X&&(X.textContent=(1e3*t).toFixed(1)),Y&&(Y.textContent=(1/t).toFixed())}}{constructor(){super(),this.jt=document.querySelector("#billboard"),this.Kt=this.jt.getContext("2d"),this.Nt=document.querySelector("#scene"),this.nt=this.Nt.getContext("webgl2"),this.Audio=new AudioContext,this.Ot=[],this.qt={},this.nt.enable(2929),this.nt.enable(2884),this.nt.blendFunc(770,771)}}{constructor(){super(),this.i=new A(50100),this.tt=function(t){let n=function(t,n,e){let o=t.createProgram();return t.attachShader(o,i(t,35633,"#version 300 es\n\nuniform mat4 pv;\nuniform vec2 sheet_size;\n\n\nin vec4 attr_position;\nin vec2 attr_texcoord;\n\n\nin vec4 attr_rotation; \nin vec4 attr_translation; \nin vec4 attr_color;\nin vec4 attr_sprite;\n\nout vec2 vert_texcoord;\nout vec4 vert_color;\nout vec4 vert_sprite;\n\nvoid main() {\nmat4 world = mat4(\nattr_rotation.xy, 0, 0,\nattr_rotation.zw, 0, 0,\n0, 0, 1, 0,\nattr_translation.xyz, 1\n);\n\nvec4 world_position = world * attr_position;\ngl_Position = pv * world_position;\nif (attr_translation.w == 0.0) {\ngl_Position.z = 2.0;\n}\n\n\n\nvert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;\nvert_texcoord.y *= -1.0;\nvert_color = attr_color;\n}\n")),t.attachShader(o,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nuniform sampler2D sheet_texture;\n\nin vec2 vert_texcoord;\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color * texture(sheet_texture, vert_texcoord);\nif (frag_color.a == 0.0) {\ndiscard;\n}\n}\n")),t.linkProgram(o),o}(t);return{dt:5,et:n,ot:{p:t.getUniformLocation(n,"pv"),i:t.getUniformLocation(n,"world"),st:t.getUniformLocation(n,"sheet_texture"),ht:t.getUniformLocation(n,"sheet_size"),Gt:t.getAttribLocation(n,"attr_position"),Ht:t.getAttribLocation(n,"attr_texcoord"),Lt:t.getAttribLocation(n,"attr_rotation"),Bt:t.getAttribLocation(n,"attr_translation"),Jt:t.getAttribLocation(n,"attr_color"),Qt:t.getAttribLocation(n,"attr_sprite")}}}(this.nt),this.it={},this.Y=32,this.Zt=null,this.ft=new Float32Array(this.i.zt*B),this.lt=this.nt.createBuffer(),this.nt.pixelStorei(37440,!0);let t=this.tt,n=this.nt.createBuffer();this.nt.bindBuffer(P,n),this.nt.bufferData(P,Q,35044),this.nt.enableVertexAttribArray(t.ot.Gt),this.nt.vertexAttribPointer(t.ot.Gt,3,$,!1,20,0),this.nt.enableVertexAttribArray(t.ot.Ht),this.nt.vertexAttribPointer(t.ot.Ht,2,$,!1,20,12),this.nt.bindBuffer(P,this.lt),this.nt.bufferData(P,this.i.zt*J,35040),this.nt.enableVertexAttribArray(t.ot.Lt),this.nt.vertexAttribDivisor(t.ot.Lt,1),this.nt.vertexAttribPointer(t.ot.Lt,4,$,!1,J,0),this.nt.enableVertexAttribArray(t.ot.Bt),this.nt.vertexAttribDivisor(t.ot.Bt,1),this.nt.vertexAttribPointer(t.ot.Bt,4,$,!1,J,16),this.nt.enableVertexAttribArray(t.ot.Jt),this.nt.vertexAttribDivisor(t.ot.Jt,1),this.nt.vertexAttribPointer(t.ot.Jt,4,$,!1,J,32),this.nt.enableVertexAttribArray(t.ot.Qt),this.nt.vertexAttribDivisor(t.ot.Qt,1),this.nt.vertexAttribPointer(t.ot.Qt,4,$,!1,J,48)}Et(t){!function(t,i){let n=t.Ot[0];if(void 0===n)return;let e=t.i.h[n];if(2===e.u)throw Error("XR not implemented");let o=[t.$t.MouseX/t.G*2-1,-t.$t.MouseY/t.q*2+1,0];if(function(t,i,n){let e=i[0],o=i[1],r=i[2],s=n[3]*e+n[7]*o+n[11]*r+n[15]||1;t[0]=(n[0]*e+n[4]*o+n[8]*r+n[12])/s,t[1]=(n[1]*e+n[5]*o+n[9]*r+n[13])/s,t[2]=(n[2]*e+n[6]*o+n[10]*r+n[14])/s}(o,o,e.l.ti),function(t,i,n){let e=i[0],o=i[1];t[0]=n[0]*e+n[2]*o+n[4],t[1]=n[1]*e+n[3]*o+n[5]}(U,[o[0],o[1]],t.i.S[n].i),null!==t.Zt){if(-1===t.X.Mouse0)return document.body.classList.remove("grabbing"),void(t.Zt=null);let i=t.i.S[t.Zt];return s(i.R,U),a(i.R,i.R,W),void(t.i.o[t.Zt]|=32)}for(let i=0;i<t.i.o.length;i++)if(1088==(1088&t.i.o[i])&&(h=U,r(j,(u=t.i.S[i]).i),K[0]=j[0]-u.gt[0]/2,K[1]=j[0]+u.gt[0]/2,K[2]=j[1]-u.gt[1]/2,K[3]=j[1]+u.gt[1]/2,h[0]>K[0]&&h[0]<K[1]&&h[1]>K[2]&&h[1]<K[3]))return document.body.classList.add("grab"),void(1===t.X.Mouse0&&(document.body.classList.add("grabbing"),t.Zt=i,a(W,U,t.i.S[i].R)));var h,u;document.body.classList.remove("grab")}(this),function(t,i){if(t.X.WheelY){let i=4**((V=Math.max(-500,Math.min(500,V+t.X.WheelY)))/-500);.9<i&&i<1.1&&(i=1),t.Y=32*i,t.St=!0}if(null===t.Zt&&(1===t.X.Mouse0?document.body.classList.add("grabbing"):-1===t.X.Mouse0&&document.body.classList.remove("grabbing"),t.$.Mouse0>5))for(let i=0;i<t.i.o.length;i++)9==(9&t.i.o[i])&&d(t,i)}(this),function(t,i){for(let i=0;i<t.i.o.length;i++)1536==(1536&t.i.o[i])&&w(t,i)}(this),function(t,i){for(let n=0;n<t.i.o.length;n++)1536==(1536&t.i.o[n])&&v(t,n,i)}(this,t),y(this),function(t,i){for(let i=0;i<t.i.o.length;i++)if((t.i.o[i]&E)===E){let n=t.i.H[i];r(n.xt,t.i.S[i].i),n.L&&(n.B=null)}for(let i=0;i<t.i.o.length;i++)if((t.i.o[i]&E)===E){let o=t.i.H[i];if(!o.L)for(let r=0;r<t.i.o.length;r++)if((t.i.o[r]&E)===E){let s=t.i.H[r];s.L&&function(t,i){let n=i[0]-t[0],e=i[1]-t[1];return n*n+e*e}((n=o).xt,(e=s).xt)<(n._t+e._t)**2&&(s.B=i,a(s.J,s.xt,o.xt),c(s.J,s.J),s.Z=o._t+s._t-l(o.xt,s.xt))}}var n,e}(this),function(t,i){for(let i=0;i<t.i.o.length;i++)1538==(1538&t.i.o[i])&&_(t,i)}(this),y(this)}Ut(t){!function(t,i){for(let i=0;i<t.i.o.length;i++)132==(132&t.i.o[i])&&f(t,i)}(this),function(t,i){for(let n=0;n<t.i.o.length;n++)1184==(1184&t.i.o[n])&&g(t,n,i)}(this,t),function(t,i){if(t.G==window.innerWidth&&t.q==window.innerHeight||(t.St=!0),t.St){t.G=t.Nt.width=t.jt.width=window.innerWidth,t.q=t.Nt.height=t.jt.height=window.innerHeight;for(let i=0;i<t.i.o.length;i++)if(1==(1&t.i.o[i])){let o=t.i.h[i];if(0==o.u&&1==o.l.u){o.l._t=t.q/t.Y/2,function(t,i,n,e,o,r,s){let h=1/(o-n),a=1/(e-i),u=1/(r-s);t[0]=-2*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(o+n)*h,t[13]=(i+e)*a,t[14]=(s+r)*u,t[15]=1}((n=o.l).l,n._t,n._t*(e=t.G/t.q),-n._t,-n._t*e,n.ii,n.k),function(t,i){let n=i[0],e=i[1],o=i[2],r=i[3],s=i[4],h=i[5],a=i[6],u=i[7],c=i[8],l=i[9],f=i[10],d=i[11],g=i[12],p=i[13],m=i[14],w=i[15],v=n*h-e*s,_=n*a-o*s,x=n*u-r*s,y=e*a-o*h,k=e*u-r*h,M=o*u-r*a,b=c*p-l*g,T=c*m-f*g,z=c*w-d*g,F=l*m-f*p,C=l*w-d*p,I=f*w-d*m,P=v*I-_*C+x*F+y*z-k*T+M*b;P&&(P=1/P,t[0]=(h*I-a*C+u*F)*P,t[1]=(o*C-e*I-r*F)*P,t[2]=(p*M-m*k+w*y)*P,t[3]=(f*k-l*M-d*y)*P,t[4]=(a*z-s*I-u*T)*P,t[5]=(n*I-o*z+r*T)*P,t[6]=(m*x-g*M-w*_)*P,t[7]=(c*M-f*x+d*_)*P,t[8]=(s*C-h*z+u*b)*P,t[9]=(e*z-n*C-r*b)*P,t[10]=(g*k-p*x+w*v)*P,t[11]=(l*x-c*k-d*v)*P,t[12]=(h*T-s*F-a*b)*P,t[13]=(n*F-e*T+o*b)*P,t[14]=(p*_-g*y-m*v)*P,t[15]=(c*y-l*_+f*v)*P)}(n.ti,n.l);break}}}var n,e}(this),function(t,i){t.Ot=[];for(let i=0;i<t.i.o.length;i++)if(1025==(1025&t.i.o[i])){let e=t.i.h[i];if(0!==e.u)throw Error("Only canvas cameras are supported.");let o=e.l,r=t.i.S[i];e.g[0]=r.A[0],e.g[1]=r.A[1],e.g[4]=r.A[2],e.g[5]=r.A[3],e.g[12]=r.A[4],e.g[13]=r.A[5],e.g[14]=-2,n(e.p,o.l,e.g),e.m[0]=r.i[4],e.m[1]=r.i[5],e.m[2]=2,t.Ot.push(i)}}(this),function(t,i){for(let i=0;i<t.i.o.length;i++){let n=i*B+7;256&t.i.o[i]?0==t.ft[n]&&(t.ft[n]=1):1==t.ft[n]&&(t.ft[n]=0)}for(let i of t.Ot){let n=t.i.h[i];0===n.u&&(t.nt.bindFramebuffer(36160,null),t.nt.viewport(0,0,t.G,t.q),t.nt.clearColor(...n.M),t.nt.clear(n.T),x(t,n))}}(this)}};window.game=gt,Promise.all([async function(t,i){let n=await new Promise((t=>{let i=new Image;i.src="../textures/spritesheet.png.webp",i.onload=()=>t(i)}));t.it[i]=function(t,i){let n=t.createTexture();return t.bindTexture(S,n),t.texImage2D(S,0,6408,6408,5121,i),t.texParameteri(S,10241,9728),t.texParameteri(S,10240,9728),t.texParameteri(S,10242,10497),t.texParameteri(S,10243,10497),{rt:n,ut:i.width,ct:i.height}}(t.nt,n)}(gt,"spritesheet.png")]).then((()=>{!function(i){i.i=new A(50100),i.St=!0,t(i,[C([0,0]),e({u:1,_t:5,ii:1,k:3,l:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],ti:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}),(t,i)=>{t.i.o[i]|=8,t.i.Ct[i]={}}]),t(i,[C([-6,0],0,[4,3]),z("garnek11"),F(1),T(2),m(0,1.5),(t,i)=>{t.i.o[i]|=64}]),t(i,[C([0,-3],0,[4,3]),z("garnek21"),F(1),T(2),m(0,1.5),(t,i)=>{t.i.o[i]|=64}]);for(let n=0;n<5;n+=1)t(i,[C([n+4,n],0,[2,2]),z("sloik"),T(1.3),m(0,1.5),(t,i)=>{t.i.o[i]|=64}]);let n=5e3;for(let e=0;e<n;e++)t(i,[C([p(-8,-4),p(10,100)],0),z("ziemniak_surowy",M(p(.1,.2),.2,1,1)),F(1-e/n),b(1),m(1,p(.99,.999))]),t(i,[C([p(4,8),p(10,100)],0),z("ziemniak_obrany",M(p(.1,.2),.5,1,1)),F(1-e/n),b(1),m(1,p(.99,.999))])}(gt),gt.Dt()}))})();
