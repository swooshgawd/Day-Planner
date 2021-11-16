const today = moment().format("dddd, MMMM Do");
let hour = moment().hour(); // Number
let allEntries = []
document.querySelector("#currentDay").textContent=today

if (localStorage.getItem("entries")) {
    allEntries = JSON.parse(localStorage.getItem("entries"))
    for (let i = 0; i < allEntries.length; i++) {
        const element = allEntries[i];
        const textEl = document.querySelector(`#t${element.time}`)
        textEl.textContent = element.content
    }
}

var allText = document.querySelectorAll("textarea")
for (let i = 0; i < allText.length; i++) {
    const element = allText[i];
    const id = element.getAttribute("id")
    let timeId = parseInt(id.split("t")[1])

    if(timeId<9){
        timeId+=12
    }
console.log(hour, timeId)
    if(timeId<hour){
        element.classList.add("past")
    } else if (timeId>hour) {
        element.classList.add("future")
    }
    else {
        element.classList.add("present")
    }
}

document.querySelector(".container").addEventListener("click", function(event){
if (event.target.matches("button")) {
    var content = event.target.previousElementSibling.value
    var time = event.target.dataset.time
    var entry = {time,content}
    console.log(entry)
    allEntries.push(entry)

    localStorage.setItem("entries", JSON.stringify(allEntries))
}
})

// Put allEntries array into Local Storage
// If we refresh page, check local storage to see if all Entries is there
// If it is there, we need to loop through that array (for)
// Populate our Html based on those entries
// Color code the text areas based on what time it is (use moment to get current hour)