(()=>{function t(t,i){let e=t.i.t();for(let n of i)n(t,e);return e}function i(t,i,e){let n=t.createShader(i);return t.shaderSource(n,e),t.compileShader(n),n}function e(t,i,e){let n=i[0],s=i[1],o=i[2],r=i[3],h=i[4],c=i[5],a=i[6],u=i[7],l=i[8],f=i[9],d=i[10],v=i[11],m=i[12],p=i[13],w=i[14],_=i[15],M=e[0],x=e[1],T=e[2],g=e[3];return t[0]=M*n+x*h+T*l+g*m,t[1]=M*s+x*c+T*f+g*p,t[2]=M*o+x*a+T*d+g*w,t[3]=M*r+x*u+T*v+g*_,M=e[4],x=e[5],T=e[6],g=e[7],t[4]=M*n+x*h+T*l+g*m,t[5]=M*s+x*c+T*f+g*p,t[6]=M*o+x*a+T*d+g*w,t[7]=M*r+x*u+T*v+g*_,M=e[8],x=e[9],T=e[10],g=e[11],t[8]=M*n+x*h+T*l+g*m,t[9]=M*s+x*c+T*f+g*p,t[10]=M*o+x*a+T*d+g*w,t[11]=M*r+x*u+T*v+g*_,M=e[12],x=e[13],T=e[14],g=e[15],t[12]=M*n+x*h+T*l+g*m,t[13]=M*s+x*c+T*f+g*p,t[14]=M*o+x*a+T*d+g*w,t[15]=M*r+x*u+T*v+g*_,t}function n(t,i=[.9,.9,.9,1],e=16640){return(n,s)=>{n.i.o[s]|=1,n.i.h[s]={u:0,l:t,v:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],m:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],p:[0,0,0],_:i,M:t.T,g:i,F:e}}}function s(t,i){let e=t.i.P[i],n=t.i.$[i];e.S&&(n.S[0]=e.S[0],n.S[1]=e.S[1],t.i.o[i]|=16),e.C&&(n.C=e.C,t.i.o[i]|=16)}function o(t,i){let e=t.i.I[i];t.Y.Mouse0>5&&(e.X[0]-=t.A.MouseX/t.k,e.X[1]+=t.A.MouseY/t.k,t.i.o[i]|=16)}function r(t,i,e){return t[0]=i[0]+e[0],t[1]=i[1]+e[1],t}function h(t,i,e){return t[0]=i[0]*e,t[1]=i[1]*e,t}function c(t,i,e){let n=t.i.I[i],s=t.i.$[i];if(s.S[0]||s.S[1]){I[0]=s.S[0],I[1]=s.S[1];let i=Math.min(1,Math.hypot((o=I)[0],o[1]));(function(t,i,e){let n=i[0],s=i[1];t[0]=e[0]*n+e[2]*s,t[1]=e[1]*n+e[3]*s})(I,I,void 0!==n.R?t.i.I[n.R].D:n.i),function(t,i){let e=i[0],n=i[1],s=e*e+n*n;s>0&&(s=1/Math.sqrt(s)),t[0]=i[0]*s,t[1]=i[1]*s}(I,I),h(I,I,i*s.U*e),r(n.X,n.X,I),s.S[0]=0,s.S[1]=0}var o;s.C&&(n.C+=s.C*s.V*e,s.C=0)}function a(t=0,i=1){return((Y=16807*Y%2147483647)-1)/2147483646*(i-t)+t}function u(t,i){return(e,n)=>{e.i.o[n]|=128,e.i.K[n]={u:t,W:i,j:[0,0],q:[0,0]}}}function l(t,i,e){let n=t.i.I[i],s=t.i.K[i];if(1===s.u){let i=-t.G/t.k/2,e=-t.L/t.k/2;n.X[1]<i&&(n.X[1]=i,s.q[0]=a(-3,3),s.q[1]*=a(-1.1,-1)),n.X[0]<e&&(n.X[0]=e,s.q[0]*=-1),n.X[0]>-e&&(n.X[0]=-e,s.q[0]*=-1)}}function f(t,i,e){let n=t.i.I[i],s=t.i.K[i];if(1===s.u){s.q[1]+=-9.81*e,h(s.j,s.j,e),r(s.q,s.q,s.j),h(s.q,s.q,s.W);let c=[0,0];h(c,s.q,e),r(n.X,n.X,c),t.i.o[i]|=16,(o=s.j)[0]=0,o[1]=0}var o}function d(t,i){let e=t.N;t.O.useProgram(e.B),t.O.uniformMatrix4fv(e.H.m,!1,i.m),t.O.activeTexture(33984),t.O.bindTexture(g,t.J["spritesheet.png"]),t.O.uniform1i(e.H.Z,0),t.O.bindBuffer(T,t.tt),t.O.bufferData(T,t.it,35040),t.O.drawArraysInstanced(e.et,0,4,t.i.o.length)}function v(t,i,e,n){let s=Math.sin(e),o=Math.cos(e);return t[0]=o*n[0],t[1]=s*n[0],t[2]=-s*n[1],t[3]=o*n[1],t[4]=i[0],t[5]=i[1],t}function m(t,i,e){var n,s;if(t.o[i]&=-17,v(e.i,e.X,e.C*X,e.nt),void 0!==e.R&&(function(t,i,e){let n=i[0],s=i[1],o=i[2],r=i[3],h=i[4],c=i[5],a=e[0],u=e[1],l=e[2],f=e[3],d=e[4],v=e[5];t[0]=n*a+o*u,t[1]=s*a+r*u,t[2]=n*l+o*f,t[3]=s*l+r*f,t[4]=n*d+o*v+h,t[5]=s*d+r*v+c}(e.i,t.I[e.R].i,e.i),e.Gyroscope&&((n=A)[0]=(s=e.i)[4],n[1]=s[5],v(e.i,A,e.C*X,e.nt))),function(t,i){let e=i[0],n=i[1],s=i[2],o=i[3],r=i[4],h=i[5],c=e*o-n*s;c&&(c=1/c,t[0]=o*c,t[1]=-n*c,t[2]=-s*c,t[3]=e*c,t[4]=(s*h-o*r)*c,t[5]=(n*r-e*h)*c)}(e.D,e.i),8&t.o[i]){let e=t.st[i];for(let n=0;n<e.st.length;n++){let s=e.st[n];if(256&t.o[s]){let e=t.I[s];e.R=i,m(t,s,e)}}}}function p(t,i,e,n){let s=~~(6*t),o=6*t-s,r=e*(1-i),h=e*(1-o*i),c=e*(1-(1-o)*i);switch(s%6){case 0:return[e,c,r,n];case 1:return[h,e,r,n];case 2:return[r,e,c,n];case 3:return[r,h,e,n];case 4:return[c,r,e,n];default:return[e,r,h,n]}}function w(t,i,e=[1,1,1,1]){return(n,s)=>{let o=s*k;n.it[o+6]=0,n.it[o+7]=1,n.it[o+8]=e[0],n.it[o+9]=e[1],n.it[o+10]=e[2],n.it[o+11]=e[3],n.it[o+12]=i[0],n.it[o+13]=t[1]-i[1]-1,n.it[o+14]=t[0],n.it[o+15]=t[1],n.i.o[s]|=64,n.i.ot[s]={rt:n.it.subarray(o+6,o+8),ht:n.it.subarray(o+8,o+12),ct:n.it.subarray(o+12,o+16)}}}function _(t){return(i,e)=>{i.it[e*k+6]=t}}function M(t=[0,0],i=0,e=[1,1]){return(n,s)=>{n.i.o[s]|=272,n.i.I[s]={i:n.it.subarray(s*k,s*k+6),D:[1,0,0,1,0,0],X:t,C:i,nt:e,Gyroscope:!1}}}async function x(t,i){let e=await(n="../textures/"+i+".webp",new Promise((t=>{let i=new Image;i.src=n,i.onload=()=>t(i)})));var n;t.J[i]=function(t,i){let e=t.createTexture();return t.bindTexture(g,e),t.texImage2D(g,0,6408,6408,5121,i),t.texParameteri(g,10241,9728),t.texParameteri(g,10240,9728),t.texParameteri(g,10242,10497),t.texParameteri(g,10243,10497),e}(t.O,e)}var T=34962,g=3553,y=5126,F=document.getElementById("update"),P=document.getElementById("delta"),b=document.getElementById("fps"),$=1/60,S=class extends class{constructor(t=1e4){this.o=[],this.ut=[],this.lt=t}t(){return this.ut.length>0?this.ut.pop():this.o.push(0)-1}ft(t){this.o[t]=0,this.ut.push(t)}}{constructor(){super(...arguments),this.h=[],this.P=[],this.dt=[],this.st=[],this.$=[],this.ot=[],this.K=[],this.I=[]}},C=0,I=[0,0],Y=1,X=Math.PI/180,A=[0,0],k=16,R=4*k,z=Float32Array.from([-.5,-.5,0,0,0,.5,-.5,0,1,0,-.5,.5,0,0,1,.5,.5,0,1,1]),D=new class extends class extends class{constructor(){this.vt=0,this.wt=0,this.L=window.innerWidth,this.G=window.innerHeight,this._t=!0,this.Mt={MouseX:0,MouseY:0},this.A={MouseX:0,MouseY:0,WheelY:0},this.Y={Mouse:0,Mouse0:0,Mouse1:0,Mouse2:0,Touch0:0,Touch1:0},this.xt={},this.Tt=document.querySelector("main"),document.addEventListener("visibilitychange",(()=>document.hidden?this.gt():this.yt())),this.Tt.addEventListener("contextmenu",(t=>t.preventDefault())),this.Tt.addEventListener("mousedown",(t=>{this.Mt["Mouse"+t.button]=1,this.A["Mouse"+t.button]=1})),this.Tt.addEventListener("mouseup",(t=>{this.Mt["Mouse"+t.button]=0,this.A["Mouse"+t.button]=-1})),this.Tt.addEventListener("mousemove",(t=>{this.A.MouseX=t.clientX-this.Mt.MouseX,this.A.MouseY=t.clientY-this.Mt.MouseY,this.Mt.MouseX=t.clientX,this.Mt.MouseY=t.clientY})),this.Tt.addEventListener("wheel",(t=>{t.preventDefault(),this.A.WheelY=t.deltaY})),this.Tt.addEventListener("touchstart",(t=>{t.target===this.Tt&&t.preventDefault(),1===t.touches.length&&(this.xt={});for(let i=0;i<t.touches.length;i++)this.xt[t.touches[i].identifier]=i;for(let i=0;i<t.changedTouches.length;i++){let e=t.changedTouches[i],n=this.xt[e.identifier];this.Mt["Touch"+n]=1,this.Mt[`Touch${n}X`]=e.clientX,this.Mt[`Touch${n}Y`]=e.clientY,this.A["Touch"+n]=1,this.A[`Touch${n}X`]=0,this.A[`Touch${n}Y`]=0}})),this.Tt.addEventListener("touchmove",(t=>{t.target===this.Tt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let e=t.changedTouches[i],n=this.xt[e.identifier];this.A[`Touch${n}X`]=e.clientX-this.Mt[`Touch${n}X`],this.A[`Touch${n}Y`]=e.clientY-this.Mt[`Touch${n}Y`],this.Mt[`Touch${n}X`]=e.clientX,this.Mt[`Touch${n}Y`]=e.clientY}})),this.Tt.addEventListener("touchend",(t=>{t.target===this.Tt&&t.preventDefault();for(let i=0;i<t.changedTouches.length;i++){let e=this.xt[t.changedTouches[i].identifier];this.Mt["Touch"+e]=0,this.A["Touch"+e]=-1}})),this.Tt.addEventListener("touchcancel",(t=>{for(let i=0;i<t.changedTouches.length;i++){let e=this.xt[t.changedTouches[i].identifier];this.Mt["Touch"+e]=0,this.A["Touch"+e]=-1}})),window.addEventListener("keydown",(t=>{t.repeat||(this.Mt[t.code]=1,this.A[t.code]=1)})),window.addEventListener("keyup",(t=>{this.Mt[t.code]=0,this.A[t.code]=-1}))}yt(){let t=0,i=performance.now(),e=n=>{let s=(n-i)/1e3;for(i=n,this.vt=requestAnimationFrame(e),this.Ft(s),t+=s;t>=$;)t-=$,this.Pt($),this.bt();this.$t(s),this.St(s)};this.gt(),e(i)}gt(){cancelAnimationFrame(this.vt),this.vt=0}Ft(t){this.wt=performance.now();let i=Math.abs(this.A.MouseX)+Math.abs(this.A.MouseY);this.Y.Mouse+=i,1===this.Mt.Mouse0&&(this.Y.Mouse0+=i),1===this.Mt.Mouse1&&(this.Y.Mouse1+=i),1===this.Mt.Mouse2&&(this.Y.Mouse2+=i),1===this.Mt.Touch0&&(this.Y.Touch0+=Math.abs(this.A.Touch0X)+Math.abs(this.A.Touch0Y)),1===this.Mt.Touch1&&(this.Y.Touch1+=Math.abs(this.A.Touch1X)+Math.abs(this.A.Touch1Y))}Pt(t){}$t(t){}bt(){-1===this.A.Mouse0&&(this.Y.Mouse0=0),-1===this.A.Mouse1&&(this.Y.Mouse1=0),-1===this.A.Mouse2&&(this.Y.Mouse2=0),-1===this.A.Touch0&&(this.Y.Touch0=0),-1===this.A.Touch1&&(this.Y.Touch1=0);for(let t in this.A)this.A[t]=0}St(t){this._t=!1;let i=performance.now()-this.wt;F&&(F.textContent=i.toFixed(1)),P&&(P.textContent=(1e3*t).toFixed(1)),b&&(b.textContent=(1/t).toFixed())}}{constructor(){super(),this.Ct=document.querySelector("#billboard"),this.It=this.Ct.getContext("2d"),this.Yt=document.querySelector("#scene"),this.O=this.Yt.getContext("webgl2"),this.Audio=new AudioContext,this.Xt=[],this.At={},this.O.enable(2929),this.O.enable(2884),this.O.blendFunc(770,771)}}{constructor(){super(),this.i=new S(50001),this.N=function(t){let e=function(t,e,n){let s=t.createProgram();return t.attachShader(s,i(t,35633,"#version 300 es\n\nuniform mat4 pv;\n\n\nin vec4 attr_position;\nin vec2 attr_texcoord;\n\n\nin vec4 attr_rotation; \nin vec4 attr_translation; \nin vec4 attr_color;\nin vec4 attr_sprite;\n\nout vec2 vert_texcoord;\nout vec4 vert_color;\nout vec4 vert_sprite;\n\nvoid main() {\nmat4 world = mat4(\nattr_rotation.xy, 0, 0,\nattr_rotation.zw, 0, 0,\n0, 0, 1, 0,\nattr_translation.xyz, 1\n);\n\nvec4 world_position = world * attr_position;\ngl_Position = pv * world_position;\nif (attr_translation.w == 0.0) {\ngl_Position.z = 2.0;\n}\n\nvert_texcoord = (attr_sprite.xy + attr_texcoord) / attr_sprite.zw;\nvert_color = attr_color;\n}\n")),t.attachShader(s,i(t,35632,"#version 300 es\n\nprecision mediump float;\n\nuniform sampler2D sheet;\n\nin vec2 vert_texcoord;\nin vec4 vert_color;\n\nout vec4 frag_color;\n\nvoid main() {\nfrag_color = vert_color * texture(sheet, vert_texcoord);\nif (frag_color.a == 0.0) {\ndiscard;\n}\n}\n")),t.linkProgram(s),s}(t);return{et:5,B:e,H:{m:t.getUniformLocation(e,"pv"),i:t.getUniformLocation(e,"world"),Z:t.getUniformLocation(e,"sheet"),kt:t.getAttribLocation(e,"attr_position"),Rt:t.getAttribLocation(e,"attr_texcoord"),zt:t.getAttribLocation(e,"attr_rotation"),Dt:t.getAttribLocation(e,"attr_translation"),Ut:t.getAttribLocation(e,"attr_color"),Vt:t.getAttribLocation(e,"attr_sprite")}}}(this.O),this.J={},this.k=32,this.it=new Float32Array(this.i.lt*k),this.tt=this.O.createBuffer(),this.O.pixelStorei(37440,!0);let t=this.N,e=this.O.createBuffer();this.O.bindBuffer(T,e),this.O.bufferData(T,z,35044),this.O.enableVertexAttribArray(t.H.kt),this.O.vertexAttribPointer(t.H.kt,3,y,!1,20,0),this.O.enableVertexAttribArray(t.H.Rt),this.O.vertexAttribPointer(t.H.Rt,2,y,!1,20,12),this.O.bindBuffer(T,this.tt),this.O.bufferData(T,this.i.lt*R,35040),this.O.enableVertexAttribArray(t.H.zt),this.O.vertexAttribDivisor(t.H.zt,1),this.O.vertexAttribPointer(t.H.zt,4,y,!1,R,0),this.O.enableVertexAttribArray(t.H.Dt),this.O.vertexAttribDivisor(t.H.Dt,1),this.O.vertexAttribPointer(t.H.Dt,4,y,!1,R,16),this.O.enableVertexAttribArray(t.H.Ut),this.O.vertexAttribDivisor(t.H.Ut,1),this.O.vertexAttribPointer(t.H.Ut,4,y,!1,R,32),this.O.enableVertexAttribArray(t.H.Vt),this.O.vertexAttribDivisor(t.H.Vt,1),this.O.vertexAttribPointer(t.H.Vt,4,y,!1,R,48)}Pt(t){(function(t,i){if(1===t.A.Mouse0?document.body.classList.add("grabbing"):-1===t.A.Mouse0&&document.body.classList.remove("grabbing"),t.A.WheelY){let i=4**((C=Math.max(-500,Math.min(500,C+t.A.WheelY)))/-500);.9<i&&i<1.1&&(i=1),t.k=32*i,t._t=!0}if(t.Y.Mouse0>5)for(let i=0;i<t.i.o.length;i++)4==(4&t.i.o[i])&&o(t,i)})(this),function(t,i){for(let i=0;i<t.i.o.length;i++)384==(384&t.i.o[i])&&l(t,i)}(this),function(t,i){for(let e=0;e<t.i.o.length;e++)384==(384&t.i.o[e])&&f(t,e,i)}(this,t),function(t,i){for(let i=0;i<t.i.o.length;i++)272==(272&t.i.o[i])&&m(t.i,i,t.i.I[i])}(this)}$t(t){!function(t,i){for(let i=0;i<t.i.o.length;i++)34==(34&t.i.o[i])&&s(t,i)}(this),function(t,i){for(let e=0;e<t.i.o.length;e++)304==(304&t.i.o[e])&&c(t,e,i)}(this,t),function(t,i){if(t.L==window.innerWidth&&t.G==window.innerHeight||(t._t=!0),t._t){t.L=t.Yt.width=t.Ct.width=window.innerWidth,t.G=t.Yt.height=t.Ct.height=window.innerHeight;for(let i=0;i<t.i.o.length;i++)if(1==(1&t.i.o[i])){let s=t.i.h[i];if(0==s.u&&1==s.l.u){s.l.Et=t.G/t.k/2,function(t,i,e,n,s,o,r){let h=1/(s-e),c=1/(n-i),a=1/(o-r);t[0]=-2*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*a,t[11]=0,t[12]=(s+e)*h,t[13]=(i+n)*c,t[14]=(r+o)*a,t[15]=1}((e=s.l).l,e.Et,e.Et*(n=t.L/t.G),-e.Et,-e.Et*n,e.Kt,e.T),function(t,i){let e=i[0],n=i[1],s=i[2],o=i[3],r=i[4],h=i[5],c=i[6],a=i[7],u=i[8],l=i[9],f=i[10],d=i[11],v=i[12],m=i[13],p=i[14],w=i[15],_=e*h-n*r,M=e*c-s*r,x=e*a-o*r,T=n*c-s*h,g=n*a-o*h,y=s*a-o*c,F=u*m-l*v,P=u*p-f*v,b=u*w-d*v,$=l*p-f*m,S=l*w-d*m,C=f*w-d*p,I=_*C-M*S+x*$+T*b-g*P+y*F;I&&(I=1/I,t[0]=(h*C-c*S+a*$)*I,t[1]=(s*S-n*C-o*$)*I,t[2]=(m*y-p*g+w*T)*I,t[3]=(f*g-l*y-d*T)*I,t[4]=(c*b-r*C-a*P)*I,t[5]=(e*C-s*b+o*P)*I,t[6]=(p*x-v*y-w*M)*I,t[7]=(u*y-f*x+d*M)*I,t[8]=(r*S-h*b+a*F)*I,t[9]=(n*b-e*S-o*F)*I,t[10]=(v*g-m*x+w*_)*I,t[11]=(l*x-u*g-d*_)*I,t[12]=(h*P-r*$-c*F)*I,t[13]=(e*$-n*P+s*F)*I,t[14]=(m*M-v*T-p*_)*I,t[15]=(u*T-l*M+f*_)*I)}(e.Wt,e.l);break}}}var e,n}(this),function(t,i){t.Xt=[];for(let i=0;i<t.i.o.length;i++)if(257==(257&t.i.o[i])){let n=t.i.h[i];if(0!==n.u)throw Error("Only canvas cameras are supported.");let s=n.l,o=t.i.I[i];n.v[0]=o.D[0],n.v[1]=o.D[1],n.v[4]=o.D[2],n.v[5]=o.D[3],n.v[12]=o.D[4],n.v[13]=o.D[5],n.v[14]=-2,e(n.m,s.l,n.v),n.p[0]=o.i[4],n.p[1]=o.i[5],n.p[2]=2,t.Xt.push(i)}}(this),function(t,i){for(let i=0;i<t.i.o.length;i++){let e=i*k+7;64&t.i.o[i]?0==t.it[e]&&(t.it[e]=1):1==t.it[e]&&(t.it[e]=0)}for(let i of t.Xt){let e=t.i.h[i];0===e.u&&(t.O.bindFramebuffer(36160,null),t.O.viewport(0,0,t.L,t.G),t.O.clearColor(...e.g),t.O.clear(e.F),d(t,e))}}(this)}};window.game=D,Promise.all([x(D,"checker1.png"),x(D,"spritesheet.png")]).then((()=>{!function(i){i.i=new S(50001),i._t=!0,t(i,[M([0,0]),n({u:1,Et:5,Kt:1,T:3,l:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],Wt:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}),(t,i)=>{t.i.o[i]|=4,t.i.dt[i]={}}]);let e=5e3;for(let n=0;n<e;n++)t(i,[M([a(-10,-3),a(10,100)],0),w([8,8],[0,0],p(a(.1,.2),.5,1,1)),_(1-n/e),u(1,a(.99,.999))]),t(i,[M([a(3,10),a(10,100)],0),w([8,8],[1,0],p(a(.1,.2),.5,1,1)),_(1-n/e),u(1,a(.99,.999))])}(D),D.yt()}))})();
