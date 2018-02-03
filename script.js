document.getElementById("button").onclick = function(){
    const get = new XMLHttpRequest();
    get.open('get', 'https://www.eliftech.com/school-task', false);
    get.send();
    
    const getResponse = JSON.parse(get.response);
    const result = calculateAll(getResponse.expressions);
    
    var post = new XMLHttpRequest();
    post.open('post', 'https://www.eliftech.com/school-task', false);
    post.setRequestHeader("content-type", "application/json");
    post.send(JSON.stringify({
        id: getResponse.id,
        results: result
    }));
     
    document.getElementById("result").innerHTML = '';
    
    result.map((elem, index) => {
        const node = document.createElement('div');
        node.textContent = `${getResponse.expressions[index]}  ==>> ${elem}`;
        node.classList.add("expression");
        return node;
    }).forEach(elem => document.getElementById("result").appendChild(elem));
    
    const isCorrect = document.createElement('div');
    isCorrect.classList.add("expression");
    isCorrect.textContent = `Is correct? : ${JSON.parse(post.response).passed}`;

    document.getElementById("result").appendChild(isCorrect);
}

function calculate(str){
    const expression = str.split(" ");
    const res = [];
    expression.forEach(element => {
        if(Number.isInteger(+element)){
            res.push(+element);
        }
        else{
            switch(element){
                case '+':
                res.push(-(res.pop()-res.pop()));
                break;

                case '-':
                res.push(res.pop() + res.pop() + 8);
                break;

                case '*':
                a = res.pop();
                b = res.pop();
                res.push(a === 0 ? 42 : b % a);
                break;

                case '/':
                a = res.pop();
                b = res.pop();
                res.push(a === 0 ? 42 : Math.floor(b / a));
                break;
            }
        }
    });
    return res[0];
}

function calculateAll(array){
    return array.map(calculate);
}