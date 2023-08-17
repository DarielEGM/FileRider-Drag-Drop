"use strict";

const zone = document.querySelector(".drop-zone");

zone.addEventListener("dragover", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#444");
});

zone.addEventListener("dragleave", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
});

zone.addEventListener("drop", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
    chargeFile(e.dataTransfer.files[0]);
    zone.style.border = "4px solid #888";
});

const changeStyle = (obj, color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color};`
};


const chargeFile = fi=>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(fi);
    reader.addEventListener("progress", e=>{
        let charge = Math.round(e.loaded / fi.size*100);
        zone.textContent = `${charge}%`;
        document.querySelector(".loading-bar").style.padding = "75px 20px";
        document.querySelector(".loading-bar").style.width = `${charge}%`;

    })
    reader.addEventListener("loadend", e=>{
        changeStyle(zone, "#4f9");
        zone.style.borderStyle = "solid";
        document.querySelector(".loading-bar").style.background = "#4f9";
        setTimeout(()=>{
            zone.style.color = "#fff";
            zone.style.animation = "appear 1s fordwards";
            zone.textContent = "Completed Charge!";
        }, 500);
    });

    reader.addEventListener("load", e=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src", url)
        document.querySelector(".result").appendChild(img);
        img.play();
    });
}
