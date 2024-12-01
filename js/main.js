
// document.location.href = ////



document.addEventListener("DOMContentLoaded", () => {
  let mainInfo = document.getElementById("mainInfo")

  var key = `s0QHMqPFAn4PC2psqGPY4ippfo9yETZHLMcuPWo7`

  let cardContFav = document.getElementById("cardContFav")
  console.log(cardContFav);
  
  let FavMainCont = document.getElementById("FavMainCont")

  let popup = document.getElementById("popup")
  let popupinfo = document.getElementById("popupinfo")
  let exitPopupBtn = document.getElementById("exitPopupBtn")



  let favouritesBtn = document.getElementById("favouritesBtn")
  let favouritesCont = document.getElementById("favouritesCont")



  let redactComCont = document.getElementById("redactComCont")
  // let redactCominfo = document.getElementById("redactCominfo")
  let redactComment = document.getElementById("redactComment")
  let redactComBtn = document.getElementById("redactComBtn")
  let exitRedactBtn = document.getElementById("exitRedactBtn")



  let btnDelAllCard = document.getElementById("btnDelAllCard")




  


  // function hideLoader(){
  //   loader.style.display = "none"
  // }
  // function showLoader(){
  //   loader.style.display = "block"
  // }


  // Новости

  // localStorage.clear()


  function createNewFavotir(){
    
    console.log("show fav");
    let userInden = JSON.parse(localStorage.getItem("userId"));
    let userCurrent = JSON.parse(localStorage.getItem("currentUSer"));
    let localStor = JSON.parse(localStorage.getItem(userCurrent));
    cardContFav.innerHTML = "";
    
    let headFavCont = document.createElement("div");


    headFavCont.innerHTML = ""
    

    btnDelAllCard.addEventListener("click", (event) => {

      deleteAllcard();
    });
    
    favouritesCont.appendChild(headFavCont);
    headFavCont.appendChild(btnDelAllCard);
    
    for (let i = 0; i < localStor.length; i++) {
      let item = localStor[i];
      let title = item.titileInfo;
      let description = item.descriptionInfo;
      let date = item.dateInfo;
      let mediaLink = item.mediaLinkInfo;
  
      if (item.userID == userInden && title !== undefined) {
        let divSpawnNews = document.createElement("div");
        let divCardAndCom = document.createElement("div");
        divCardAndCom.classList.add("cardAndCom");
        let spawnLocalNewsCard = document.createElement("div");
        spawnLocalNewsCard.classList.add("cardNews")
        let divCommCont = document.createElement("div");
  

        let comments = localStor.filter(comment => comment.idCard === item.idCardNews);
        comments.forEach(comment => {
          let divCom = document.createElement("div");
          divCom.classList.add("divCom")
          let infoCom = document.createElement("h3");
          infoCom.classList.add("infoCom")
          infoCom.innerText = "Comment";
          let comtext = document.createElement("p");
          comtext.classList.add("comtext")
          comtext.innerHTML = `${comment.textCom}`;
          

          let divBtnRedactDel = document.createElement("div");
          divBtnRedactDel.classList.add("divBtnRedactDel")
          let btnRedactCom = document.createElement("button");
          btnRedactCom.classList.add("btnRedactCom")
          btnRedactCom.innerText = "Redact";
          let btnDelCom = document.createElement("button");
          btnDelCom.classList.add("btnDelCom")
          btnDelCom.innerText = "Delete";
  

          btnRedactCom.addEventListener("click", () => {
            redactingComment(comment.idCommment);
          });
  
          btnDelCom.addEventListener("click", () => {
            deleteCommentById(comment.idCommment);
          });
  
          divBtnRedactDel.appendChild(btnRedactCom);
          divBtnRedactDel.appendChild(btnDelCom);
          divCom.appendChild(infoCom);
          divCom.appendChild(comtext);
          divCom.appendChild(divBtnRedactDel);
          divCommCont.appendChild(divCom);
        });
  

        let titleCont = document.createElement("p");
        titleCont.innerText = `${title.split(' ')[0] + title.split(' ')[1] + title.split(' ')[2]}`;
        titleCont.classList.add("titleCardNews")
        let moreInfoBtn = document.createElement("button");
        moreInfoBtn.innerText = "More Info";
        moreInfoBtn.classList.add("moreInfoBtn")
        let dateCont = document.createElement("p");
        dateCont.innerText = `${date}`;
        dateCont.classList.add("dataCardNews")
        let mediaLinkCont = document.createElement("a");
        mediaLinkCont.href = `${mediaLink}`;
        mediaLinkCont.innerText = `${mediaLink}`;
        mediaLinkCont.classList.add("linkCardNews")
        let contBtnCard = document.createElement("div");
        contBtnCard.classList.add("divBtnFav")
        let delCardNews = document.createElement("button");
        delCardNews.classList.add("delCardBtn")
        delCardNews.innerText = "Delete";
        let addComCard = document.createElement("button");
        addComCard.classList.add("addComBtn")
        addComCard.innerText = "AddCom";
  
        moreInfoBtn.addEventListener("click", (event) => {
          event.preventDefault();
          popup.style.display = 'flex';
          moreInfoPopup(description);
        });
  
        delCardNews.addEventListener("click", (event) => {
          event.preventDefault();
          deleteCardFromLocal(item.idCardNews);
        });
  
        addComCard.addEventListener("click", (event) => {
          if(clickSend == true){
            clickSend = false
            createComent(divCommCont, item.idCardNews);
          }
          event.preventDefault();
          
        });
  
       
        divSpawnNews.appendChild(divCardAndCom);
        divCardAndCom.appendChild(spawnLocalNewsCard);
        divCardAndCom.appendChild(divCommCont);
        spawnLocalNewsCard.appendChild(titleCont);
        spawnLocalNewsCard.appendChild(moreInfoBtn);
        spawnLocalNewsCard.appendChild(dateCont);
        spawnLocalNewsCard.appendChild(mediaLinkCont);
        spawnLocalNewsCard.appendChild(contBtnCard);
        contBtnCard.appendChild(delCardNews);
        contBtnCard.appendChild(addComCard);

        cardContFav.appendChild(divSpawnNews);
      }
    }
  }
  

  



  function moreInfoPopup(description){
    popupinfo.innerHTML = ""
    let textpopupCont = document.createElement("div")

    let textpopup = document.createElement("p")
    textpopup.classList.add("textpopup")
    textpopup.innerText = `
          ${description}
    `
    popupinfo.appendChild(textpopupCont)
    textpopupCont.appendChild(textpopup)
    popupinfo.appendChild(exitPopupBtn)
    popupinfo.appendChild(textpopup)

  }

  exitPopupBtn.addEventListener("click", () => {
    popup.style.display = 'none'
  })

  // localStorage.clear()

function deleteCommentById(idToDelete) {
  console.log("Удаление");
    let userCurrent = localStorage.getItem("currentUSer");
    userCurrent = JSON.parse(userCurrent);

    let localStor = localStorage.getItem(userCurrent);
    localStor = JSON.parse(localStor);
  
    let updatedComments = localStor.filter(comment => comment.idCommment !== parseInt(idToDelete));
    
    localStorage.setItem(userCurrent, JSON.stringify(updatedComments));

    createNewFavotir();
}






  function redactingComment(commentId) {
    redactComCont.style.display = "flex"

    let currentUserID = localStorage.getItem("currentUSer");
    let comments = JSON.parse(localStorage.getItem(currentUserID));
    let commentToEdit = comments.find(comment => comment.idCommment === commentId);

    redactComment.value = commentToEdit.textCom;

    redactComBtn.addEventListener("click", () => {
        if (redactComment.value.length !== 0) { 
            commentToEdit.textCom = redactComment.value;

            localStorage.setItem(currentUserID, JSON.stringify(comments));

            createNewFavotir();

            redactComCont.style.display = 'none';
        } else {
            alert("Пусто")
            
        }
    });

    exitRedactBtn.addEventListener("click", () => {
        redactComCont.style.display = 'none';
    });

}


  exitRedactBtn.addEventListener("click", () => {
    redactComCont.style.display = 'none'
  })




  let bebe= false

  favouritesBtn.addEventListener("click", (event) => {
    console.log("Clicked Fav");
    event.preventDefault()
    
    
    if(!bebe){
      bebe = true
      mainInfo.style.display = "none"
      favouritesCont.style.display = "flex"
      favouritesBtn.innerText = "Back"
      createNewFavotir()
      console.log("1");
      
    }else if(bebe){
      bebe = false
      backBtn()
      console.log("2");
      
    }
})

// localStorage.clear()

  function backBtn(){
    favouritesBtn.innerText = "Favourites"
    mainInfo.style.display = "flex"
    favouritesCont.style.display = "none"
  }




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function deleteAllcard(){

    
    let currentUserID = localStorage.getItem("currentUSer");
    
    if (currentUserID) {
      localStorage.removeItem(currentUserID);

    }

    createNewFavotir();
  }


  function deleteCardFromLocal(idToDelete) {
    let currentUserID = localStorage.getItem("currentUSer");
    let cards = localStorage.getItem(currentUserID);

    if (cards) {
        cards = JSON.parse(cards)

        let updatedCards = cards.filter(card => card.idCardNews !== parseInt(idToDelete));
        
        localStorage.setItem(currentUserID, JSON.stringify(updatedCards));
        
        createNewFavotir();
    }
}

let clickSend = true
  
  function createComent( divCommCont, cardId){

    let currentUserID = localStorage.getItem("currentUSer");
    let cardIndex = localStorage.getItem(currentUserID);
    cardIndex = JSON.parse(cardIndex)

    

    let divAddCom = document.createElement("div")


    divAddCom.classList.add("divAddCom")
    let text = document.createElement("h1")
    text.classList.add("textComAdd")
    text.innerText = "Comm"

    let textCom = document.createElement("textarea")
    textCom.classList.add("textAreaCom")
    console.log("createCom");
    
    let sendComBtn = document.createElement("button")
    sendComBtn.classList.add("sendComBtn")
    sendComBtn.innerText = "Send"

    

    divCommCont.appendChild(divAddCom)
    divAddCom.appendChild(text)
    divAddCom.appendChild(textCom)
    divAddCom.appendChild(sendComBtn)



    sendComBtn.addEventListener("click", () => {
      clickSend = true
      // Получаем последний ID комментария из localStorage
      let idCom = localStorage.getItem("idCom");
      if (idCom === null) {
        idCom = 0; // если idCom нет в localStorage, инициализируем с 0
      } else {
        idCom = parseInt(idCom); // если есть, парсим его как число
      }
    
      // Инкрементируем idCom для нового комментария
      idCom += 1;
    
      // Сохраняем новое значение idCom обратно в localStorage
      localStorage.setItem("idCom", idCom);
    

      let currentUSerID = localStorage.getItem("currentUSer");
      currentUSerID = JSON.parse(currentUSerID);
    
      if (textCom.value.length !== 0) {
    
        let comments = localStorage.getItem(currentUSerID);
        
        if (comments === null) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }
    
        let objCom = {
          textCom: textCom.value,
          userID: currentUSerID,
          idCommment: idCom,
          idCard: cardId
        };
    
        comments.push(objCom);
    
        localStorage.setItem(currentUSerID, JSON.stringify(comments));
    
        sendTocard(textCom, divCommCont);
        
        divAddCom.innerText = "";
      }else{
        alert("Пусто")
      }
    });
  }


    
    
    

    // localStorage.clear()




  function sendTocard(textCom, divCommCont){
    // let infoCom = document.createElement("h3")
    // infoCom.innerText = "Comment"

    // let textUser = textCom.value
    // let comtext = document.createElement("p")
    // comtext.innerHTML = `${textUser}`

    // let divBtnRedactDel = document.createElement("div")

    // let btnRedactCom = document.createElement("button")
    // btnRedactCom.innerText = "Redact"
    // let btnDelCom = document.createElement("button")
    // btnDelCom.innerText = "Delete"

    // divBtnRedactDel.appendChild(btnRedactCom)
    // divBtnRedactDel.appendChild(btnDelCom)

    // divCommCont.append(divBtnRedactDel)

    // divCommCont.appendChild(infoCom)
    // divCommCont.appendChild(comtext)
    createNewFavotir();
    
  }

  
})



  // ФОто земли

  
// localStorage.clear()





































