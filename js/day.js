  // Астронамическая карта дня



var key = `s0QHMqPFAn4PC2psqGPY4ippfo9yETZHLMcuPWo7`

let imgday = document.getElementById("imgday")
let titleInfoDay = document.getElementById("titleInfoDay")
let textInfoDay = document.getElementById("textInfoDay")





// let dayCont = document.getElementById("dayCont")


async function getDayImage() {
    // showLoader()
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)

      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      console.log(data);
      createDayCont(data)
    } catch (error) {
      console.error("Error", error);
    }finally{
    //   hideLoader()
    }
  }
  getDayImage()
  // стилизовать
  function createDayCont(data){
    
    titleInfoDay.innerText = data.title
    textInfoDay.innerText = data.explanation
    imgday.setAttribute('src', `${data.hdurl}`)

  }



//   Еще дни по запросу

let moreImageDay = document.getElementById("moreImageDay")

let dataIpi = `2012-01-03`


let imgMoreDay = document.getElementById("imgMoreDay")
let titleMoreDay = document.getElementById("titleMoreDay")
let textMoreDay = document.getElementById("textMoreDay")

// стилизовать
function createMoreDayCont(data){
  // moreImageDay.innerHTML = "";
    // let moreDayInfo = document.createElement("div")
    // moreDayInfo.classList.add("infoDayCont")
    // let imgMoreDay = document.createElement("img")
    // let textMoreDay = document.createElement("div")
    
    // textMoreDay.classList.add("textDay")
    // textMoreDay.innerHTML = `
    //                   <h2>${data.title}</h2>
    //                   <p>${data.explanation}</p>    
    // `
    imgMoreDay.setAttribute('src', `${data.hdurl}`)
    titleMoreDay.innerText = data.title
    textMoreDay.innerText = data.explanation

    // moreDayCont.appendChild(moreDayInfo)
    // moreDayInfo.appendChild(imgMoreDay)
    // moreDayInfo.appendChild(textMoreDay)
  }

  const dateValue = document.getElementById("dateValue")
  const sendDateBtn = document.getElementById("sendDateBtn")

  sendDateBtn.addEventListener("click", (e) => {
    e.preventDefault()
    dataIpi = dateValue.value
    let urlDate = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dataIpi}`
    fetch(urlDate)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createMoreDayCont(data)
      
    })
  })