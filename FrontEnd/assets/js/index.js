function changeColors(id) {
  const buttons = document.getElementsByTagName("button");
  Array.from(buttons).forEach(element => {
    if (element.id==id) {
      element.style.backgroundColor = "#1d6154";
      element.style.color = "white";
    } else {
      element.style.backgroundColor = "white";
      element.style.color = "#1d6154";
    }    
  });
}

function setPictures(isSorted, id) {

  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('http://localhost:5678/api/works',myInit);

  fetch(myRequest,myInit).then(function(response) {
      if(response.ok) {
          response.json().then(function(myJson) {  
              const galleryDiv = document.querySelector('.gallery');  
              galleryDiv.innerHTML = '';        
              myJson.forEach(picture => {
                  if (isSorted==null || picture.category.id==id) {
                    const figureElement = document.createElement('figure');

                    const imgElement = document.createElement('img');
                    imgElement.setAttribute('src', picture.imageUrl);
                    imgElement.setAttribute('alt', picture.title);

                    const figcaptionElement = document.createElement('figcaption');
                    figcaptionElement.textContent = picture.title;

                    figureElement.appendChild(imgElement);
                    figureElement.appendChild(figcaptionElement);

                    galleryDiv.appendChild(figureElement);
                  } else {
                    
                  }
              });              
              console.log('Récupération des images effectuée.');
            });
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });
}



function activateModal() {
  var modal = document.getElementById("myModal");

  var btn = document.getElementById("myBtn");

  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    modal.style.display = "block";
    fetchWorks();
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }



}

function openAddView() {

  const modalContent = document.getElementById('modal-content');
  var backSvg_ = document.getElementById('back');
  const backSvg = backSvg_.cloneNode(true);
  backSvg.style.display = 'block';
  modalContent.innerHTML = '';
  const closeButton = document.createElement('span');  
  const backButton = document.createElement('span');  
  const form_ = document.getElementById("addphoto");
  var form = form_.cloneNode(true);
  form.style.display = "block";
  closeButton.setAttribute('class', 'close');
  backButton.setAttribute('class', 'back');
  closeButton.innerHTML = '&times;';
  backButton.appendChild(backSvg)
  modalContent.appendChild(closeButton);
  modalContent.appendChild(backButton);
  modalContent.appendChild(form);
  activateModal();
  console.log("nouvelle vue");
}

function fetchWorks() {
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('http://localhost:5678/api/works',myInit);

  fetch(myRequest,myInit).then(function(response) {
      if(response.ok) {
          response.json().then(function(myJson) {  
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = '';
           
            const closeButton = document.createElement('span');
            const photoGalleryTitle = document.createElement('p');
            const photoGalleryWrapper = document.createElement('p');
            const hr = document.createElement('hr');
            const br = document.createElement('br');
            const addButton = document.createElement('input');
            const deleteButton = document.createElement('div');

            
            closeButton.setAttribute('class', 'close');
            closeButton.innerHTML = '&times;';

            photoGalleryTitle.innerHTML = 'Galerie photo';

            photoGalleryWrapper.setAttribute('class', 'wrapper');
            photoGalleryWrapper.setAttribute('id', 'images');
            photoGalleryWrapper.setAttribute('style', 'width: 80%; margin:auto;');

            hr.setAttribute('width', '80%');

            addButton.setAttribute('type', 'submit');
            addButton.setAttribute('value', 'Ajouter une photo');
            addButton.setAttribute('id', 'login-button');
            addButton.setAttribute('style', 'padding:15px; border-style:none; cursor:pointer;');
            addButton.onclick = openAddView;

            deleteButton.setAttribute('class', 'delete-all');
            deleteButton.innerHTML = 'Supprimer la galerie';

            


            close = document.createElement("span");
            close
            myJson.forEach(work => {   
              trash_ = document.getElementById('trash');
              arrow_ = document.getElementById('arrow');
              trash = trash_.cloneNode(true);
              arrow = arrow_.cloneNode(true);
              trash.onclick = function () {
                deleteWork(work.id)
              }
              span = document.createElement('span');
              img = document.createElement('img');
              span.style = "max-width:fit-content;position: static;";
              img.src = work.imageUrl;
              img.classList.add("gallery-item");
              span.appendChild(img);
              span.appendChild(trash);
              span.appendChild(arrow);
              photoGalleryWrapper.appendChild(span);
            })
            
            modalContent.appendChild(closeButton);
            modalContent.appendChild(photoGalleryTitle);
            modalContent.appendChild(br);
            modalContent.appendChild(photoGalleryWrapper);
            modalContent.appendChild(hr);
            modalContent.appendChild(addButton);
            modalContent.appendChild(deleteButton);
            activateModal();
            
              console.log('Récupération des travaux effectuée.');
            });
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });
}

function deleteWork(id) {
  token = localStorage['token'];
  var myHeaders = new Headers();

  var myInit = { method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'accept': '*/*'
                },
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('http://localhost:5678/api/works/'+id,myInit);

  fetch(myRequest,myInit).then(function(response) {
      if(response.ok) {
              console.log('Tâche supprimée');
              fetchWorks();              
              setPictures();
              
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération delete : ' + error.message);
    });
}
function setCategories() {
  const categories = new Set();
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('http://localhost:5678/api/categories',myInit);

  fetch(myRequest,myInit).then(function(response) {
      if(response.ok) {
          response.json().then(function(myJson) {  
              const categoriesDiv = document.querySelector('.categories'); 
              categoriesDiv.innerHTML = '';   
              const buttonAll = document.createElement('button');
              buttonAll.innerHTML = "Tout";
              buttonAll.id = 0;
              buttonAll.style.backgroundColor = "#1d6154";
              buttonAll.style.color = "white";
              buttonAll.onclick = function () {
                setPictures();
                changeColors(0);
              }

              categoriesDiv.appendChild(buttonAll);     

              myJson.forEach(category => {                  
                const buttonElement = document.createElement('button');
                buttonElement.innerHTML = category.name;
                buttonElement.id = category.id
                buttonElement.onclick = function () {
                  setPictures(true, category.id);
                  changeColors(category.id)
                }

                categoriesDiv.appendChild(buttonElement);
              });
              console.log('Récupération des catégories effectuée.');
            });
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    });
}

function openFiles() {
  openFiles = document.getElementById('upload-background');
  openFiles.innerHTML = "";
}

function login() {
  document.getElementById('connection').style.cursor = "pointer";
  console.log(localStorage['token']);

  if (localStorage['token']!="null") {
    Array.from(document.getElementsByClassName('buttonEdition')).forEach(element => {
      element.style.display = "block";
    });
    Array.from(document.getElementsByClassName('wrap-categories')).forEach(element => {
      element.style.display = "none";
    });
    document.getElementById('black-band').style.display = "block";
    document.getElementById('connection').innerHTML = "logout";
    document.getElementById('connection').onclick = function () {
      localStorage['token']=null;
      location.reload(true);
    }
  }
  else{
    document.getElementById('connection').onclick = function () {
      window.location.href = "login.html";
    }
  }

}

function checkSelect() {
  if (document.getElementById("category").value==0) {
    document.getElementById("validate").style.backgroundColor = "#a7a7a7";
  } else {
    document.getElementById("validate").style.backgroundColor = "#1D6154";
  }
  
}
function clearBackground() {
  background = document.getElementById('upload-background');
  background.style.padding = "0px";
  background.innerHTML = "";
}

const previewImage = (event) => {
  const imageFiles = event.target.files;
  const imageFilesLength = imageFiles.length;
  if (imageFilesLength > 0) {
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      localStorage['imageSrc'] = imageSrc;
      localStorage['imageFilesLength'] = imageFilesLength;
      const imagePreviewElement = document.querySelector("#preview-selected-image");
      imagePreviewElement.src = imageSrc;
      imagePreviewElement.style.display = "block";
      clearBackground();
  }
};

function sendWork() {
  var form = document.forms.namedItem("fileinfo");
  if (document.getElementById("category").value!=0 && document.getElementById("title").value!="" && localStorage['imageFilesLength']>0) {
    console.log("Tous les champs sont bons");
    
    token = localStorage['token'];


    console.log("About to send");
    var oOutput = document.getElementById("send-error"),
    oData = new FormData(form);

    var oReq = new XMLHttpRequest();

    oReq.open("POST", "http://localhost:5678/api/works", true);
    oReq.setRequestHeader("Authorization", `Bearer ${token}`);
    oReq.setRequestHeader("accept", `*/*`);
    oReq.onload = function(oEvent) {
      if (oReq.status == 201) {
        oOutput.innerHTML = "Envoyé&nbsp;!";
        oOutput.style.color = "green";
        setPictures();
        } else {
          oOutput.style.color = "red";
        oOutput.innerHTML = "Erreur " + oReq.status + " lors de la tentative d’envoi du fichier.<br \/>";
      }
    };

    oReq.send(oData);
  }
  else{    
    console.log("Missing fields");
    var my_error = document.getElementById("error");
    my_error.style.display = "block";
    setTimeout(() => {  my_error.style.display = "none";}, 2000);
  }
}
function lol() {
  console.log("addworks started");
  token = localStorage['token'];
  let work = {    
    image: localStorage['imageSrc'],
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
  };

  console.log("---------------------------")
  console.log(work)
  console.log("---------------------------")
  var myInit = { method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'accept': '*/*'
                },
                body: JSON.stringify(work),
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('http://localhost:5678/api/works',myInit);

  fetch(myRequest,myInit).then(function(response) {
      if(response.ok) {
              console.log('Tâche ajoutée');
              fetchWorks();
              
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération ajout : ' + error.message);
    });
}
function sendWorke() {
  
}
localStorage['imageFilesLength'] = 0;
setPictures();
setCategories();
activateModal();
login();

