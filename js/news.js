    var key = `s0QHMqPFAn4PC2psqGPY4ippfo9yETZHLMcuPWo7`



  let newsCardCont = document.getElementById("newsCardCont")
  let queryNews = document.getElementById("queryNews")
  let queryNewsBtn = document.getElementById("queryNewsBtn")

  let cardContFav = document.querySelector("#cardContFav")

  let paggNewsCont = document.getElementById("paggNewsCont")


  let glavNewsSec = document.getElementById("glavNewsSec")

  let popup = document.getElementById("popup")
  let popupinfo = document.getElementById("popupinfo")
  let exitPopupBtn = document.getElementById("exitPopupBtn")



  function hideLoader(){
    loader.style.display = "none"
  }
  function showLoader(){
    loader.style.display = "block"
  }



  let arrQuery = [
    "mars",
    "jupiter",
    "moon",
    "black hole",
    "apollo 11",
    "voyager",
    "curiosity",
    "space shuttle",
    "iss",
    "solar eclipse",
    "aurora",
    "hurricane",
    "neil armstrong",
    "buzz aldrin",
    "hubble",
    "james webb"
  ]


// localStorage.clear()

  let startCreateNewsFor = 0;
  let endCreateNewsFor = 5;

  let arr = []
  // localStorage.clear() 
  function setLocal(localSetObj){
    


      // ДОСТАЕМ ЛОКАЛ СТОР 
      let getLocalNews = localStorage.getItem("news")
      // ДОБАВЛЯЕМ ОБЬЕКТ В МАССИВ
      arr.push(localSetObj)
      
      // ЕСЛИ ЛОКАЛ СТОР НЕ ПУСТОЙ
      if(getLocalNews){
          // ПАРСИМ ЛОКАЛ СТОР И ПЕРЕВОДИМ ЕГО В МАССИВ С ОБЬЕКТАМИ
          getLocalNews = JSON.parse(getLocalNews)
          // ДОБАВЛЯЕМ В МАССИВ С ЛОКАЛ СТОРА НОВЫЙ ОБЬЕКТ
          getLocalNews.push(localSetObj)
          // ОТПРАВЛЯЕМ В ЛОКАЛ СТОР ИЗМЕННЕНЫЙ СПИСОК С НОВЫМ ЭЛЕМЕНТОМ
          localStorage.setItem("news",JSON.stringify(getLocalNews))
          // createNewFavotir()
     //ЕСЛИ ЛОКАЛ СТОР ПУСТОЙ ТО МЫ ОТПРАВЯЛЕМ МАССИВ С ОДНИМ ОБЬЕКТОМ 
      }else{
          localStorage.setItem("news",JSON.stringify(arr))
      }
  }



function createNewsInfo(items){
    glavNewsSec.style.display = "flex"
    newsCardCont.innerHTML = ""
    for (let i = startCreateNewsFor; i < endCreateNewsFor; i++) {
      let item = items[i]

      let title = item.data[0].title
      let description = item.data[0].description
      let date = item.data[0].date_created
      let mediaLink = item.links[0].href

      let spawnDivEl = document.createElement("div")
      spawnDivEl.classList.add("cardNews")

      let titleCont = document.createElement("h3")
      titleCont.innerText = `${title.split(' ')[0] + title.split(' ')[1] + title.split(' ')[2]}`
      titleCont.classList.add("titleCardNews")
      console.log(title.split(' '));

      let moreInfoBtn = document.createElement("button")
      moreInfoBtn.innerText = "More Info"
      moreInfoBtn.classList.add("moreInfoBtn")

      moreInfoBtn.addEventListener("click", (event) => {
        event.preventDefault()
        popup.style.display = 'flex'
        moreInfoPopup(description)
      })



      let dateCont = document.createElement("p")
      dateCont.innerText = `${date}`
      dateCont.classList.add("dataCardNews")

      let mediaLinkCont = document.createElement("a")
      mediaLinkCont.href = `${mediaLink}`
      mediaLinkCont.innerText = `${mediaLink}`
      mediaLinkCont.classList.add("linkCardNews")

      let buttonAdd = document.createElement("button")
      buttonAdd.innerText = `Add`
      buttonAdd.classList.add("addBtnCard")

      

      
     

    buttonAdd.addEventListener("click", (event) =>  {

      let idCard = localStorage.getItem("idCard");
      if (idCard === null) {
        idCard = 0; // если idCard нет в localStorage, инициализируем с 0
      } else {
        idCard = parseInt(idCard); // если есть, парсим его как число
      }
    
      // Инкрементируем idCard для нового комментария
      idCard += 1;
    
      // Сохраняем новое значение idCard обратно в localStorage
      localStorage.setItem("idCard", idCard);


      let currentUSerID = localStorage.getItem("currentUSer")
      currentUSerID = JSON.parse(currentUSerID);


      let card = localStorage.getItem(currentUSerID);
        
      if (card === null) {
        card = [];
        
      } else {
        card = JSON.parse(card);
      }


      let localSetObj = {
        titileInfo: title,
        descriptionInfo: description,
        dateInfo: date,
        mediaLinkInfo : mediaLink,
        userID: currentUSerID,
        idCardNews: idCard
    }

    card.push(localSetObj);

    localStorage.setItem(currentUSerID, JSON.stringify(card));



    })
      

      newsCardCont.appendChild(spawnDivEl)
      spawnDivEl.appendChild(titleCont)
      spawnDivEl.appendChild(moreInfoBtn)
      spawnDivEl.appendChild(dateCont)
      spawnDivEl.appendChild(mediaLinkCont)
      spawnDivEl.appendChild(buttonAdd)
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


  function spawnBtnPagg(items){
    paggNewsCont.innerHTML = ""
    let totalPages = Math.ceil(items.length / 5)

    for (let i = 1; i <= totalPages; i++) {
      let buttPagg = document.createElement("button")
      buttPagg.classList.add("paggBtn")
      buttPagg.innerText = `${i}`
      paggNewsCont.appendChild(buttPagg)

      buttPagg.addEventListener("click", (event) => {
        event.preventDefault();

        startCreateNewsFor = (i - 1) * 5
        endCreateNewsFor = i * 5
        createNewsInfo(items)
      });
    }
  }


  function getNewsQuery(){
    let userQuery = queryNews.value
    if (!arrQuery.includes(userQuery.toLowerCase())) {
      console.log("babah");
    } else {
      async function getNews(){
        showLoader();
        try{
          const response = await fetch(`https://images-api.nasa.gov/search?q=${userQuery}&media_type=image,video`);
          if(!response.ok){
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json()
          createNewsInfo(data.collection.items.slice(0, 5))
          spawnBtnPagg(data.collection.items)
        }catch (error){
          console.error("Error", error);
        }finally {
          hideLoader()
        }
      }
      getNews()
    }
    userQuery = ""
  }


  queryNewsBtn.addEventListener("click", (event) => {
    event.preventDefault()
    getNewsQuery()
  });


