const nameInput = document.getElementById("nameInput");
const upImage = document.getElementById("upImage");
const imageInput = document.getElementById("imageInput");
let uploadedImage = "";
const fromInput = document.getElementById("fromInput");
const likeInput = document.getElementById("likeInput");
const aboutInput = document.getElementById("aboutInput");

const overlay = document.getElementById("overlay");
const editWindow = document.getElementById("editWindow");

const nameEdit = document.getElementById("nameEdit");
const imageEdit = document.getElementById("imageEdit");
const fromEdit = document.getElementById("fromEdit");
const likeEdit = document.getElementById("likeEdit");
const aboutEdit= document.getElementById("aboutEdit");

class Character{
    constructor(id, name, image, from, like, about){
        this.image = image;
        this.id = id;
        this.name = name;
        this.from = from;
        this.like = like;
        this.about = about;
    }
}

let characters = [];
let i = 1;

imageInput.addEventListener("input", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
})

function createCharacter(){

    if(nameInput.value == "" || uploadedImage == "" || fromInput.value == "" || likeInput.value == "" || aboutInput.value == ""){
        alert("Some information is empty!");
    }

    else if(nameInput.value.length > 30  || fromInput.value.length > 30  || likeInput.value.length > 30){
        alert("30 character limit!");
    }

    else if(aboutInput.value.length > 300 ){
        alert("about: 300 character limit!");
    }

    else{

        // object //

        characters.push(new Character(`${i}`,
                                      nameInput.value, 
                                      uploadedImage,
                                      fromInput.value, 
                                      likeInput.value, 
                                      aboutInput.value));

        // div //
        
        let idIndex = searchIndex(`${i}`);

        const newCharacter = document.createElement("div");
        newCharacter.id = `character-${i}`;
        newCharacter.className = "character";

        document.getElementById("characters").append(newCharacter);
        const divCharacter = document.getElementById(`character-${i}`);

        // name //

        const newNameH3 = document.createElement("h3");
        newNameH3.textContent = characters[idIndex].name;
        newNameH3.classList.add("info");
        newNameH3.id = `name-${i}`;
        
        divCharacter.append(newNameH3);

        // image //

        const newImage = document.createElement("img");
        newImage.src = uploadedImage;
        newImage.classList.add("characterImg");
        newImage.id = `image-${i}`;
        divCharacter.append(newImage);

        // from //

        const newFromH3 = document.createElement("h3");
        const newSpanFrom = document.createElement("span");
        newSpanFrom.textContent = characters[idIndex].from;
        newSpanFrom.classList.add("info");
        newSpanFrom.id = `from-${i}`;

        newFromH3.textContent = "From: "
        newFromH3.append(newSpanFrom);
        divCharacter.append(newFromH3);

        // like //

        const newLikeH3 = document.createElement("h3");
        const newSpanLike = document.createElement("span");
        newSpanLike.textContent = characters[idIndex].like;
        newSpanLike.classList.add("info");
        newSpanLike.id = `like-${i}`;

        newLikeH3.textContent = "Like: ";
        newLikeH3.append(newSpanLike)
        divCharacter.append(newLikeH3);

        // about //

        const newAboutH3 = document.createElement("h3");
        const newSpanAbout = document.createElement("span");
        newSpanAbout.textContent = characters[idIndex].about;
        newSpanAbout.classList.add("info");
        newSpanAbout.id = `about-${i}`;

        newAboutH3.textContent = "About: "
        newAboutH3.append(newSpanAbout);
        divCharacter.append(newAboutH3);
        
        // delete button //

        const newDeleteBtn = document.createElement("button");
        let characterId = i;
        newDeleteBtn.onclick = () => {divCharacter.style.scale = "0.7";
                                    setTimeout(() => {deleteCharacter(`${characterId}`)}, 300)};
        newDeleteBtn.textContent = "🗑️";
        newDeleteBtn.id = "characterBtn";
        divCharacter.append(newDeleteBtn);

        // edit button //

        const newEditBtn = document.createElement("button");
        newEditBtn.textContent = "✏️";
        newEditBtn.id = "characterBtn";
        newEditBtn.onclick = () => {editCharacter(characterId)};
        divCharacter.append(newEditBtn)


        // clean inputs //

        nameInput.value = "";
        fromInput.value = "";
        likeInput.value = "";
        aboutInput.value = "";
        uploadedImage = "";

        i++;

    }
}

function searchIndex(someId){
    for(let i=0; i<characters.length; i++){
        if(characters[i].id == someId){
            return i;
        }
    }
}

function saveCharacter(someId){

    if(nameEdit.value == "" || fromEdit.value == "" || likeEdit.value == "" || aboutEdit.value == ""){
        alert("Some information is empty!");
    }

    else if(nameEdit.value.length > 30  || fromEdit.value.length > 30  || likeEdit.value.length > 30){
        alert("30 character limit!");
    }

    else if(aboutEdit.value.length > 300 ){
        alert("about: 300 character limit!");
    }

    else{
        console.log(someId);
        let index = searchIndex(someId);

        document.getElementById("name-" + someId).textContent = nameEdit.value;
        document.getElementById("from-" + someId).textContent = fromEdit.value;
        document.getElementById("like-" + someId).textContent = likeEdit.value;
        document.getElementById("about-" + someId).textContent = aboutEdit.value;

        characters[index].name = nameEdit.value;
        characters[index].from = fromEdit.value;
        characters[index].like = likeEdit.value;
        characters[index].about = aboutEdit.value;

        if(uploadedImage != ""){
            document.getElementById("image-" + someId).src = uploadedImage;
            characters[index].image = uploadedImage;
        }

        popupOut();
    }
}

function deleteCharacter(someId){
    const divToDelete = document.getElementById(`character-${someId}`);
    let index = searchIndex(someId);
    divToDelete.remove();
    characters.splice(index, 1);
}

function editCharacter(someId){
    
    let index = searchIndex(someId);

    overlay.classList.add("active");
    editWindow.classList.add("active");

    nameEdit.value = characters[index].name;
    fromEdit.value = characters[index].from;
    likeEdit.value = characters[index].like;
    aboutEdit.value = characters[index].about;

    const newSaveButton = document.createElement("button");
    newSaveButton.textContent = "Save";
    newSaveButton.classList.add("createEditCharacter");
    newSaveButton.id = "saveButton";

    newSaveButton.onclick = () => {saveCharacter(someId)};
    editWindow.append(newSaveButton);

}

function popupOut(){
    uploadedImage = "";
    overlay.classList.remove("active");
    editWindow.classList.remove("active");
    document.getElementById("saveButton").remove();
}