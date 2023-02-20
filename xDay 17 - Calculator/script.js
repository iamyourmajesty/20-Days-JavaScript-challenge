const Body = document.querySelector('body');
const Buttons = document.querySelectorAll('.exreq');
const InputContainer = document.querySelector('input');

let k = true;
let expression ='';

// to deal with multiple decimal in expression 
function addDecimal() {
    if(!expression.includes('.'))
    {
        // to handel 12 + 1
        expression += '.';
        InputContainer.value = expression;
    }
    else {
        // it includes decimal , 
        let n = expression.length;
        for(let i = n-1;i >=0 ;i--)
        {
            if(expression[i] === '.')
            {
                // break and not include decimal
                // to handel 12 + 1.2.
                break;
            }
            if(expression[i] === '+' || expression[i] === '-' || expression[i] === '*' || expression[i] === '/')
            {
                // include decimal and break  
                // to handel 1.2 + 1.5
                expression += '.';
                break;
            }
        }
    }
}

Buttons.forEach((btn) =>{
    btn.addEventListener('click',()=>{
        let temp = btn.innerHTML;
        if(expression.length > 0 &&  (temp === '+' || temp === '-' || temp === '*' || temp === '/' ) && (expression[expression.length - 1] === '+' || expression[expression.length - 1] ==='*' || expression[expression.length - 1] ==='-' || expression[expression.length - 1] ==='/' )  )
        {
            // these will lead to remove the last operator and in further step we will add new clicked operator
            expression = expression.slice(0, -1);
        }
        
        expression += temp;        
        
        // console.log(temp,expression);
        InputContainer.value = expression;

});
});

// to evaluate expression
function Evaluate() {
    if(expression != '')
    {
        let ans = eval(expression);
        InputContainer.value = ans;
        expression = ans;

    }
}

// to remove last character from expression and update input container
function clearOne() {
    if(expression != '')
    {
        // remove last char
        expression = InputContainer.value; 
        expression = expression.slice(0, -1);
        InputContainer.value = expression;
    }
    
}

function clearAll() {
    if(expression != '')
    {
        expression = '';
        InputContainer.value = '0';
    }
    
}


// on load
InputContainer.value = '0';