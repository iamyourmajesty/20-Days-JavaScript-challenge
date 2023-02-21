const { body } = document;

function changeBg(n)
{
    //check if background is already showing
    let prevBg;
    if(body.className)
    {
        prevBg= body.className;
    }
    // reset bodyclass 
    body.className = '';
    switch(n){
        case 1:
            return (prevBg == 'background-1' ? false : body.classList.add('background-1'));
            break;
        case 2:
            return (prevBg == 'background-2' ? false : body.classList.add('background-2'));
            break;
        case 3:
            return (prevBg == 'background-3' ? false : body.classList.add('background-3'));
            break;
        default:
            break;
    }
}