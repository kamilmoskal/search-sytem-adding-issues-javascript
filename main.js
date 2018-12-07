const myForm = document.forms["addform"];

///////////////////// Form eventlistener on click submit
myForm.addEventListener("submit",function(e){
    /// prevent refresh on click submit
    e.preventDefault();
    /// assign wrote value in form
    let title = e.target.firstElementChild.value;
    let description = e.target.firstElementChild.nextElementSibling.value;
    /// create new li, and add innerHTML to him
    const ul = e.target.nextElementSibling;
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="issue">
    <div class="issuetxt">issue:</div>
    <div class="title">${title}</div>
    </div>
    <div class="describe">
        <div class="describetxt" style="display:none">${description}</div>
        <div class="fas fa-chevron-down"></div>
        <div class="fas fa-chevron-up" style="display: none"></div>
        </div> 
    </div>`;
    /// if text inputs has any value, add created li to main ul and reset form
    if (title !== "" && description !== "") {
        myForm.reset();   // reset form
        ul.appendChild(li);
    } 
});

const search = document.querySelector(".fas.fa-search.fa-lg");
const searchbar = document.querySelector('input[name="search"]');

///////////////////// If i have clicked on lupe display search input
search.addEventListener("click",function(e){
    e.target.parentElement.style.display = "none";
    searchbar.removeAttribute("style");
});

///////////////////// BUBLING main ul checking clicks
const ulmain = document.querySelector("#ulmain");

ulmain.addEventListener("click",function(e){

    /// If i have clicked on arrow in li in main ul, display/hide discription div
    if (e.target.classList == "fas fa-chevron-down") {
        e.target.previousElementSibling.style.display = "block";
        e.target.nextElementSibling.style.display = "block";
        e.target.style.display = "none";
    } else if (e.target.classList == "fas fa-chevron-up") {
        e.target.previousElementSibling.style.display = "block";
        e.target.previousElementSibling.previousElementSibling.style.display = "none";
        e.target.style.display = "none";
    } 
});


///////////////////// SEARCH SYSTEM
/// each new letter in search input is checked
searchbar.addEventListener("keyup", function(e){
    const term = e.target.value.toLowerCase();
    const issues = ulmain.getElementsByTagName("li");
    Array.from(issues).forEach( issue => {
        
        function collapsedicribe(){
            issue.firstElementChild.nextElementSibling.firstElementChild.style.display = "none";
            issue.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.style.display = "block";
            issue.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
         };

        ///textContent of title li
        const title = issue.firstElementChild.firstElementChild.nextElementSibling.textContent;
        ///textContent of describe li
        const describe = issue.firstElementChild.nextElementSibling.firstElementChild.textContent;

        /// if textContent of title li contain your letters
        if (title.toLowerCase().indexOf(term) !== -1) {
    //  or  if (title.toLowerCase().includes(term)) {
        /// show li with this title
            issue.style.display = "block"

             /////collapse expanded discription in li if title has your letters
             collapsedicribe();

            //////////////////////// dynamic hover system
            issue.firstElementChild.nextElementSibling.firstElementChild.textContent = describe;/// if title has your letters, reset added hover in discription

            let hovertitlestart = title.toLowerCase().indexOf(term); // number // starting index your chars in title
            let hovertitleend = e.target.value.length; // length your numbers
            let araytitle = title.split('');// new array each char from title
            araytitle.splice(hovertitlestart, 0, '<span style="background-color: rgba(255, 0, 0, 0.226);">'); // add to array in specific position <span> with color
            araytitle.splice(hovertitlestart+hovertitleend+1, 0, '</span>'); // // add to array in specific position </span>
            
            ////// convert array to string and replace title innerhtml with it to get hover
            let hovertitle = araytitle.join("");
            issue.firstElementChild.firstElementChild.nextElementSibling.innerHTML = hovertitle;

        /// if textContent of describe li contain your letters    
        } else if (describe.toLowerCase().indexOf(term) !== -1) {
        /// show li with this discription
            issue.style.display = "block"

            //// if discribe contains your letter open desribe div, and replace displace in arrow underneath
            issue.firstElementChild.nextElementSibling.firstElementChild.style.display = "block";
            issue.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.style.display = "none";
            issue.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.style.display = "block";

            //////////////////////// dynamic hover system
            issue.firstElementChild.firstElementChild.nextElementSibling.textContent = title;/// if discription has your letters, reset added hover in titles

            let hovertitlestart = describe.toLowerCase().indexOf(term); 
            let hovertitleend = e.target.value.length;
            let araytitle = describe.split('');
            araytitle.splice(hovertitlestart, 0, '<span style="background-color: rgba(255, 0, 0, 0.226);">');
            araytitle.splice(hovertitlestart+hovertitleend+1, 0, '</span>'); 
            
            let hoverdisc = araytitle.join("");
            issue.firstElementChild.nextElementSibling.firstElementChild.innerHTML = hoverdisc;
        } else {
            ///if li no contains your letter, hide all
            issue.style.display = "none"
            /////collapse maybe expanded discription in li
            collapsedicribe();
        }
    })
 
});