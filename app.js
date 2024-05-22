
document.addEventListener('DOMContentLoaded', () => {
    const initialPartition = document.getElementById('initial');
    initialPartition.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function splitPartition(id, direction) {
    const partition = document.getElementById(id);
    const newPartition = document.createElement('div');
    newPartition.className = 'partition';
    newPartition.style.backgroundColor = getRandomColor();
    
    const controls = document.createElement('div');
    controls.className = 'controls';
    const buttonV = document.createElement('button');
    buttonV.innerText = 'V';
    buttonV.onclick = () => splitPartition(newPartition.id, 'V');
    const buttonH = document.createElement('button');
    buttonH.innerText = 'H';
    buttonH.onclick = () => splitPartition(newPartition.id, 'H');
    const buttonRemove = document.createElement('button');
    buttonRemove.innerText = '-';
    buttonRemove.onclick = () => removePartition(newPartition.id);
    controls.append(buttonV, buttonH, buttonRemove);
    
    newPartition.append(controls);
    newPartition.id = `partition-${Math.random().toString(36).substr(2, 9)}`;
    
    partition.innerHTML = '';
    partition.style.flexDirection = direction === 'V' ? 'row' : 'column';
    partition.appendChild(newPartition);

    const oldPartition = document.createElement('div');
    oldPartition.className = 'partition';
    oldPartition.style.backgroundColor = partition.style.backgroundColor;
    partition.appendChild(oldPartition);
}

function removePartition(id) {
    const partition = document.getElementById(id);
    partition.parentElement.removeChild(partition);
}

function enableResizing(partition) {
    partition.classList.add('resizable');
}

document.addEventListener('mousedown', function(event) {
    const target = event.target;
    if (target.classList.contains('resizable')) {
        startResize(target, event);
    }
});

function startResize(partition, event) {
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(partition).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(partition).height, 10);

    function doDrag(event) {
        partition.style.width = (startWidth + event.clientX - startX) + 'px';
        partition.style.height = (startHeight + event.clientY - startY) + 'px';
    }

    function stopDrag() {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
}
