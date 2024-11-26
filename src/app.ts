

(()=>{
    const createElement = ():void => {
        const myDiv = document.getElementById('add-here') as HTMLDivElement;
        myDiv.innerHTML = '<h1>This is a Heading</h1>'
    }
    createElement();
})()