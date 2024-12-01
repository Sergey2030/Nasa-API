
// // let regUser = {
// //     id: indexUser,
// //     name: naveUser,
// //     email: emailUser
// // }

let curUser = localStorage.getItem("currentUSer")




const wrappper = document.querySelector(".wrappper")
const window = document.getElementById("window")


const signBtnSwap = document.getElementById("signBtnSwap")
const regBtnSwap = document.getElementById("regBtnSwap")
const formBox = document.getElementById("formBox")



const avtLoginInp = document.getElementById("avtLoginInp")
const avtEmailInp = document.getElementById("avtEmailInp")
const avtUserBtn = document.getElementById("avtUserBtn")

const regLoginInp = document.getElementById("regLoginInp")
const regEmailInp = document.getElementById("regEmailInp")
const regNewUserBtn = document.getElementById("regNewUserBtn")

const exitAccaunt = document.getElementById("exitAccaunt")

exitAccaunt.addEventListener("click", () => {
    console.log(222);
    
    localStorage.removeItem("currentUSer")
    wrappper.style.display = "none"
    window.style.display = "flex"
})


if(curUser){
    wrappper.style.display = "flex"
    window.style.display = "none"
}else{

}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let validatedLogin = false
let validatedEmail = false



regBtnSwap.addEventListener("click", () => {
    formBox.classList.add("active")
    window.classList.add("active")
    formBox.classList.remove("invalid")
})

signBtnSwap.addEventListener("click", () => {
    formBox.classList.remove("active")
    window.classList.remove("active")
    formBox.classList.remove("invalid")
})


regNewUserBtn.addEventListener("click", (e) => {

    let regUsLog = regLoginInp.value
    let regUsEmail = regEmailInp.value

    let loginError = document.getElementById("loginError")
    loginError.textContent = "Login Error";
    loginError.style.display = "none"

    let emailError = document.getElementById("emailError")
    emailError.textContent = "Enter the correct email address.";
    emailError.style.display = "none"


    e.preventDefault()
    validUser()
    if(validatedLogin == true && validatedEmail == true){
        alert("Молоток");
        console.log("Нормуль");
        window.style.display = "none"
        wrappper.style.display = "block"
        formBox.classList.remove("invalid")
        newUser(regUsLog, regUsEmail)
        
        
    }else{
        formBox.classList.add("invalid")
        console.log("не нормуль");
    }
})


let newUserReg = false

// localStorage.clear()

function newUser(regUsLog, regUsEmail){
    
    let idUser = 0
    
    let getUserLocal = localStorage.getItem("user")
    
    getUserLocal = JSON.parse(getUserLocal)

    console.log(getUserLocal);
    

    if(getUserLocal){
        
        console.log(getUserLocal.length);
        
        let bebeby = getUserLocal.length -1
        console.log(bebeby);
        
        console.log("1");
        bebeby++
        idUser = bebeby
        
        let objUserVal = {
            id: idUser,
            login: regUsLog,
            email: regUsEmail
    
        }
        getUserLocal.push(objUserVal)
        localStorage.setItem("user",JSON.stringify(getUserLocal))
        localStorage.setItem("userId",JSON.stringify(idUser))

        let bbb = objUserVal.id
        localStorage.setItem("userId", bbb)
        localStorage.setItem("currentUSer", JSON.stringify(bbb))

    }else{
        console.log("2");
        
        let objUserVal = {
            id: idUser,
            login: regUsLog,
            email: regUsEmail
        }
        
        let users = []
        users.push(objUserVal)
        localStorage.setItem("user",JSON.stringify(users))
        localStorage.setItem("userId",JSON.stringify(idUser))

        let bbb = objUserVal.id
        localStorage.setItem("userId", bbb)
        localStorage.setItem("currentUSer", JSON.stringify(bbb))
    }

    

    

}

// localStorage.clear()

function validUser(){

    if(regLoginInp.value.length >= 2 && regLoginInp.value.length <= 15){
        console.log("Молоток");
        validatedLogin = true
        loginError.style.display = "none"
    }else{
        console.log("Имя не очень");
        validatedLogin = false
        loginError.style.display = "block"
    }

    if(emailPattern.test(regEmailInp.value)){
        validatedEmail = true
        emailError.style.display = "none"
        
    }else{
        validatedEmail = false
        emailError.style.display = "block"
    }

}



let avtUserDa = false


let usLogEst = false
let usMailEst = false



function avtUser(){

    let getUserLocal = localStorage.getItem("user")
    
    getUserLocal = JSON.parse(getUserLocal)
    console.log(getUserLocal);

    let usersProverka = localStorage.getItem("user")

    if(usersProverka){
    getUserLocal.forEach(objUser => {
        
        if(avtLoginInp.value == objUser.login){
            usLogEst = true
        }else{
            usLogEst = false
        }
    
        if(avtEmailInp.value == objUser.email){
            usMailEst = true
        }else{
            usMailEst = false
        }


        if(usLogEst == true && usMailEst == true){
            avtUserDa = true
            let bbb = objUser.id
            localStorage.setItem("userId", bbb)
            console.log(objUser);
            localStorage.setItem("currentUSer", JSON.stringify(bbb))
        }
       

    });
}else{
    formBox.classList.add("invalid")
}

    


}

// localStorage.clear()

let idCom = localStorage.getItem("idCom");
console.log(`Last id ${idCom}`);

avtUserBtn.addEventListener("click", (event) => {
    event.preventDefault()
    avtUser()
    
    let usersProverka = localStorage.getItem("user")

    if(usersProverka){
        if(avtUserDa == true){
            alert("Молоток");
            console.log("Нормуль avt");
            window.style.display = "none"
            wrappper.style.display = "block"
            formBox.classList.remove("invalid")
        }else{
            formBox.classList.add("invalid")
    
            console.log("не нормуль avt");
        }
    }else{
        formBox.classList.add("invalid")
    }
    
    
})


