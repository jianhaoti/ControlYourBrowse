(()=>{var e=document.getElementById("addButton");e.hasClickListener||(e.addEventListener("click",(function(){var e=document.getElementById("websiteInput"),t=e.value.trim();t&&function(e){try{return new URL(e),!0}catch(e){return!1}}(t)?chrome.runtime.sendMessage({type:"updateBlocklist",action:"add",url:t},c):(alert("Please enter a valid URL."),e.focus())})),e.hasClickListener=!0);var t=document.getElementById("removeButton");t.hasClickListener||(t.addEventListener("click",(function(){var e=document.querySelector("#blocklistDisplay .selected");e&&chrome.runtime.sendMessage({type:"updateBlocklist",action:"remove",url:e.textContent},c)})),t.hasClickListener=!0);var n=document.getElementById("clearAllButton");function c(e){var n=document.getElementById("blocklistDisplay");n.innerHTML="",e.blocklist.forEach((function(e){var c=document.createElement("li");c.textContent=e,c.addEventListener("click",(function(e){e.stopPropagation(),l();var n=document.querySelector("#blocklistDisplay .selected");n&&n.classList.remove("selected"),c.classList.add("selected"),t.disabled=!1})),n.appendChild(c)}))}function l(){var e=document.querySelector("#blocklistDisplay .selected");e&&e.classList.remove("selected"),t.disabled=!0}n.hasClickListener||(n.addEventListener("click",(function(){confirm("Are you sure you want to clear all settings and data? This action cannot be undone.")&&(document.getElementById("blocklistDisplay").innerHTML="",chrome.runtime.sendMessage({type:"updateBlocklist",action:"clear"},(function(){console.log("Blocklist cleared in storage and rules reset.")})))})),n.hasClickListener=!0),document.addEventListener("DOMContentLoaded",(function(){chrome.runtime.sendMessage({type:"updateBlocklist",action:"fetch"},(function(e){e&&e.blocklist?c(e):console.error("Failed to fetch blocklist",e)}))})),document.addEventListener("click",(function(e){e.target.closest("#blocklistDisplay li")||e.target.closest("#websiteInput")||l()}))})();