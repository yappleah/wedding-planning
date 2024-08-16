
'use strict';
let list = [];
let selectedList = ""
const options = document.querySelectorAll('#services option');
options.forEach(option => {
    option.addEventListener('click', function handleClick() {
        if (!list.includes(option.innerHTML)) {
            option.setAttribute('style', 'background-color: #f0d3d8;');
            list.push(option.innerHTML);
            selectedList = ""
            for (let item of list) {
                selectedList += item + '<br>';
            }
            document.getElementById('serviceInput').innerHTML = selectedList;
        } else {
            option.removeAttribute("style");
            list = list.filter(e => e !== option.innerHTML);
            selectedList = ""
            for (let item of list) {
                selectedList += item + '<br>';
            }
            document.getElementById('serviceInput').innerHTML = selectedList;
        }
    });
});