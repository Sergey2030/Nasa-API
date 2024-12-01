var key = `s0QHMqPFAn4PC2psqGPY4ippfo9yETZHLMcuPWo7`



 let imgMars = document.getElementById("imgMars")
 let moreMarsFotoBtn = document.getElementById("moreMarsFotoBtn")



async function getMarsImage() {
    // showLoader()
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`)
      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      createMarsCont(data)
    } catch (error) {
      console.error("Error", error);
    }finally{
    //   hideLoader()
    }
  }
  getMarsImage()

  // стилизовать
  function createMarsCont(data){
    imgMars.setAttribute("src", `${data.photos[2].img_src}`)
  
  }

 async function getMoreFotoMars() {
//   showLoader()
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`)
      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      createMoreMarsImages(data)
    } catch (error) {
      console.error("Error", error);
    }finally{
    //   hideLoader()
    }
 }



  let clickindex = 2

  let url3 = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`

  moreMarsFotoBtn.addEventListener("click", (e) =>{
    clickindex++
    e.preventDefault()
    
      fetch(url3)
        .then(response => response.json())
        .then(data => {
          getMoreFotoMars(data)
    })
    
  })
  // стилизовать
  function createMoreMarsImages(data){
    imgMars.innerHTML = ""
    imgMars.setAttribute("src", `${data.photos[clickindex].img_src}`)

  }