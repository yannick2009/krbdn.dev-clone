// ========== ELEMENTS ========== //
const containerHead = document.querySelector(".container-head");
const displayPath = document.querySelector(".container-input p");
const formEl = document.querySelector("form");
const inputEl = document.querySelector(".container-input input");
const output = document.querySelector(".container-output");
const pathSpan = document.querySelector(".container-input span");

// ========== CONSTANTS ========== //
const HOMEPATH = "/home/esblog";
let currentPath = HOMEPATH;
const dirList = ["skills", "projects", "studies", "contact", "scripts"];
const LINKEDIN_URL = "https://www.linkedin.com/in/yannick-k-946970200/";
const GITHUB_URL = "https://github.com/yannick2009";
const helpMsg = `Available commands:
  ls - List directory contents
  cd [dir] - Change directory
  pwd - Print working directory
  clear - Clear terminal
  @linkedin - Open LinkedIn profile
  @github - Open Github profile
  help - Show this help message
  
Use ↑/↓ arrow keys to navigate command history`;

const dirContent = {
  skills: `Frontend Development
├── React
├── SolidJS
├── VueJs
Backend Development
├── NodeJs
├── Golang
Databases
├── PostgreSQL
├── SurrealDB
├── MongoDB
DevOps
├── Github actions
Project Management
├── Trello
├── Linear`,
  projects: `Frontend Development
├── Bné
├── Zeynab
├── Yasmeen`,
};

// ========== FUNCTIONS ========== //
const clear = () => {
  containerHead.textContent = "";
  output.textContent = "";
  inputEl.value = "";
};

const printHelp = () => {
  output.insertAdjacentHTML("beforeend", `<p>${helpMsg}</p>`);
  inputEl.value = "";
};

const printCurrPath = () => {
  output.insertAdjacentHTML("beforeend", `<p>${currentPath}</p>`);
  inputEl.value = "";
};

const switchToLinkedin = () => {
  output.insertAdjacentHTML(
    "beforeend",
    "<p>Opening LinkedIn profile in a new tab...</p>"
  );
  inputEl.value = "";
  window.open(LINKEDIN_URL);
};

const switchToGithub = () => {
  output.insertAdjacentHTML(
    "beforeend",
    "<p>Opening Github profile in a new tab...</p>"
  );
  inputEl.value = "";
  window.open(GITHUB_URL);
};

const printCmdNotFound = (cmd) => {
  output.insertAdjacentHTML("beforeend", `<p>Command not found: ${cmd}</p>`);
  inputEl.value = "";
};

const list = () => {
  if (currentPath === HOMEPATH) {
    const cmd = dirList.join("    ");
    output.insertAdjacentHTML("beforeend", `<p>${cmd}</p>`);
    inputEl.value = "";
    return;
  }
  const arr = currentPath.split("/");
  const currDir = arr[arr.length - 1];
  const content = dirContent[currDir];
  output.insertAdjacentHTML("beforeend", `<p>${content}</p>`);
  inputEl.value = "";
};

const changeDir = (dir) => {
  if (dir === "..") {
    currentPath = HOMEPATH;
    pathSpan.textContent = "~";
    inputEl.value = "";
  } else if (currentPath === HOMEPATH && dirList.includes(dir)) {
    pathSpan.textContent = dir;
    currentPath = currentPath + "/" + dir;
    inputEl.value = "";
  } else {
    output.insertAdjacentHTML("beforeend", `Directory not found`);
    inputEl.value = "";
  }
};

// ========== EVENTS ========== //
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = `${e.currentTarget.elements[0].value}`.trim();

  output.insertAdjacentHTML(
    "beforeend",
    `<p>${displayPath.textContent} ${value}</p>`
  );

  if (value === "clear") {
    clear();
    return;
  } else if (value === "help") {
    printHelp();
    return;
  } else if (value === "pwd") {
    printCurrPath();
    return;
  } else if (value === "@linkedin") {
    switchToLinkedin();
    return;
  } else if (value === "@github") {
    switchToGithub();
    return;
  } else if (value === "ls") {
    list();
  } else if (value.startsWith("cd ")) {
    const arr = value.split(" ");
    const dir = arr[1].trim();
    changeDir(dir);
    return;
  } else {
    printCmdNotFound(value);
  }
});
