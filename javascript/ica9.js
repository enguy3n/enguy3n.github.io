const btn = document.querySelector('button');
btn.addEventListener('click', ()=>displayMessage('i\'m actually pretty scared of snakes', 'warning'));
// btn.addEventListener('click', ()=>displayMessage('snakes like to talk about food sometimes', 'chat'));

function displayMessage(msgText, msgType){
    const body = document.body;
    const panel = document.createElement('div');
    const msg = document.createElement('p');
    const closeBtn = document.createElement('button');

    panel.setAttribute('class', 'msgBox');
    body.appendChild(panel);

    msg.textContent = msgText;
    panel.appendChild(msg);

    closeBtn.textContent = 'x';
    panel.appendChild(closeBtn);

    closeBtn.addEventListener('click',()=>panel.parentNode.removeChild(panel));

    if(msgType==='warning'){
        msg.style.backgroundImage = 'url(../img/ica9/warning.png)';
        panel.style.backgroundColor = 'firebrick';
    }else if(msgType === 'chat'){
        msg.style.backgroundImage = 'url(../img/ica9/chat.png)';
        panel.style.backgroundColor = 'lightsteelblue';
    }else{
        msg.style.paddingLeft = '20px';
    }
}
