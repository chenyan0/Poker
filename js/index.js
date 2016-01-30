window.onload=function() {
    var body=document.getElementById('body'),
        da=document.createElement('div'),
        poker, k=true,
        pokerLeft=document.createElement('div'),
        pokerRight=document.createElement('div'),
        guize=document.getElementById('guize'),
        xiangqing=document.getElementById('xiangqing'),
        ok=document.getElementById('ok'),
    //生成数组，存放四个花色和牌上的数字
        huase=['ht','bk','fk','mh'],
        shuzi={A:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',J:'11',Q:'12'};
    number={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
//------------查看规则
    ok.onclick=function(){
        xiangqing.style.display='none';
    };
    guize.onclick=function(){
        if(k==true){
            xiangqing.style.display='block';
            k=false;
        }else{
            xiangqing.style.display='none';
            k=true;
        }

    };
// ----------上方28张纸牌错排位置
    fn3=function(){
        for(var i=0;i<7;i++){
            for(var j=0;j<i+1;j++){
                poker=document.createElement('div');
                poker.setAttribute('id',i+'_'+j);
                poker.setAttribute('class','poker flip');
                poker.style.top=30*i+'px';
                poker.style.left=(6-i)*65+130*j+'px';
                da.appendChild(poker);
            }
        }

    };
    da.setAttribute('id','da');
    body.appendChild(da);
    pokerLeft.setAttribute('class','pokerLeft');
    da.appendChild(pokerLeft);
    pokerRight.setAttribute('class','pokerRight');
    da.appendChild(pokerRight);
    fn3();
// -------生成左边24张纸牌
    for(var i=0;i<24;i++){
        var poker1=document.createElement('div');
        poker1.setAttribute('class','poker1');
        pokerLeft.appendChild(poker1);

    }
// ----------next again 按钮翻牌----------
    var next=document.createElement('div');
    var again=document.createElement('div');
    next.setAttribute('class','button');
    again.setAttribute('class','button');

    next.style.top='450px';
    again.style.top='500px'
    next.innerHTML='next';
    again.innerHTML='Try again'
    da.appendChild(again);
    da.appendChild(next);

    var previous=null,index=0;
// -------------------游戏过程
    da.onclick=function(e){
        var el=e.target;
        el.style.cursor='pointer';
        if(el.getAttribute('id')){
            var x=Number(el.getAttribute('id').split('_')[0]),
                y=Number(el.getAttribute('id').split('_')[1]);
        }
        join=function(x,y){
            return x+'_'+y;
        }
        $=function(id){
            return document.getElementById(id);
        };
        if($(join(x+1,y))||$(join(x+1,y+1))){
            return;
        }
        if(el==this)return;    //必须是两张牌的数字相加
        if(previous!=null){
            previous.style.boxShadow='2px 4px 6px black';
            if(Number(shuzi[el.innerHTML])+Number(shuzi[previous.innerHTML])==13){
                el.parentElement.removeChild(el);
                previous.parentElement.removeChild(previous);
                previous=null;
                return;
            }
        }
        el.style.boxShadow='-2px -2px 20px #7A4648 inset,2px 2px 20px #7A4648 inset';
        if(el.innerHTML=='K'){
            el.parentElement.removeChild(el);
        }
        previous=el;
        if(el.innerHTML=='next'){
            pokerRight.style.display='block';
            el.style.boxShadow='-1px -1px 10px #D0D0D0 inset,1px 1px 10px #D0D0D0 inset';
            pokerRight.appendChild(pokerLeft.removeChild(pokerLeft.lastElementChild));
        }
        if(!pokerLeft.lastElementChild){
            pokerLeft.style.display='none';
        }
        if(el.innerHTML=='重来'){
            location.reload();
        }
        if(el.innerHTML=='退出'){
            window.close();
        }
        if(el.innerHTML=='Try again'){
            if(!pokerRight.lastElementChild){
                pokerRight.style.display='none';
            }
            el.style.boxShadow='-1px -1px 10px #D0D0D0 inset,1px 1px 10px #D0D0D0 inset';
            pokerLeft.style.display='block';
            pokerRight.style.display='none';
            while(pokerRight.lastElementChild){
                pokerLeft.appendChild(pokerRight.removeChild(pokerRight.lastElementChild));
            }
            index++;
        }
        if(index>3){
            tip('游戏失败');
        }
        if(!poker&&!pokerLeft&&!pokerRight){
            tip('游戏成功');
        }
    };

    var tip=function(s){
        var tip=document.createElement('div');
        next.innerHTML='重来';
        again.innerHTML='退出';
        tip.style.height='300px';
        tip.style.width='400px';
        tip.style.position='relative';
        tip.style.left='387.5px';
        tip.style.top='250px';
        tip.style.backgroundSize='cover';
        tip.style.borderRadius='10px';
        if(s=='游戏失败'){
            tip.style.backgroundImage='url(./imgs/kuang140.png)';
        }else{
            tip.style.backgroundImage='url(./imgs/kuang141.png)';
        }
        da.appendChild(tip);

    };
//----------生成一副乱序的扑克牌
    // var poker=[
    // {huase:'ht',number:8},
    // {huase:'bk',number:7},
    // {huase:'fk',number:9},
    // {huase:'mh',number:J}] ;

    var fn5=function(){
        var pokers=[],pai,num1,huase1;
        var zidian={};
        while(pokers.length!=52){
            num1=number[Math.floor(Math.random()*13+1)],
                huase1=huase[Math.floor(Math.random()*4)];
            pai={huase:huase1,number:num1};
            if(!zidian[huase1+num1]){
                pokers.push(pai);
                zidian[huase1+num1]=true;
            }
            console.log(num1);
        }
        return pokers;
    };
    var pokersUp=fn5(),
        els=document.getElementsByClassName('poker');
    els1=document.getElementsByClassName('poker1');
    pokersDown=pokersUp.slice(-24);
    pokersUp.length=28;
    //上方纸牌
    for(var i=0;i<els.length;i++){
        els[i].innerHTML=pokersUp[i].number;
        if(pokersUp[i].huase=='ht'){
            els[i].style.backgroundImage='url(./imgs/hongtao.png)';
            els[i].style.color='red';
        }
        if(pokersUp[i].huase=='bk'){
            els[i].style.backgroundImage='url(./imgs/heitao.png)';
            els[i].style.color='black';
        }
        if(pokersUp[i].huase=='fk'){
            els[i].style.backgroundImage='url(./imgs/fangpian.png)';
            els[i].style.color='red';
        }
        if(pokersUp[i].huase=='mh'){
            els[i].style.backgroundImage='url(./imgs/meihua.png)';
            els[i].style.color='black';
        }

    }
    // 下方纸牌
    for(var j=0;j<els1.length;j++){
        els1[j].innerHTML=pokersDown[j].number;
        if(pokersDown[j].huase=='ht'){
            els1[j].style.backgroundImage='url(./imgs/hongtao.png)';
            els1[j].style.color='red';
        }
        if(pokersDown[j].huase=='bk'){
            els1[j].style.backgroundImage='url(./imgs/heitao.png)';
            els1[j].style.color='black';
        }
        if(pokersDown[j].huase=='fk'){
            els1[j].style.backgroundImage='url(./imgs/fangpian.png)';
            els1[j].style.color='red';
        }
        if(pokersDown[j].huase=='mh'){
            els1[j].style.backgroundImage='url(./imgs/meihua.png)';
            els1[j].style.color='black';
        }

    }
    document.onmousedown=function(e){
        e.preventDefault();
    };


};